/* eslint-disable func-style */

const {
  getQuestions,
  getSessionToken,
} = require("../client/src/api/opentdb");

const {
  POINTS_SYSTEM,
  POINT_PENALTY
} = require('./constants');

async function gatherAndSetGameInfo(room, params) {

  if (!room.token) {
    console.log('starting getting session Token');
    const tokenRes = await getSessionToken();
    room.token = tokenRes.token;
  }
  room.params = params;
  console.log('starting getting questions');
  /* request questions with token and params and add to room */
  const questionsRes = await getQuestions(params, room.token);
  room.questions = questionsRes.results;

  /* start the game status */
  room.status.started = true;
  room.status.currentQ = 0;

  return { questions: room.questions, params };

}

function checkEnoughCorrect(room) {
  /* be sure that the right answers being counted are for this question */
  const rightAnswers = room.status.answers.filter((a) => {
    return a.correctAnswer && a.qIndex === room.status.currentQ;
  });
  const param = room.params.numCorrect;

  /* handle percentage string */
  const isNumber = typeof param === "number";
  const numCorrect = isNumber ? param : Number(param.slice(0, -1)) / 100;

  if (numCorrect >= 1) {
    return rightAnswers.length >= numCorrect;
  } else {
    const maxNumCorrect = Math.ceil(numCorrect * room.users.length);
    return rightAnswers.length >= maxNumCorrect;
  }
}

function recordAndAward(user, room, {correct, difficulty, questionIndex}) {

  const enoughCorrect = room.params.numCorrect && checkEnoughCorrect(room);

  console.log(enoughCorrect);
  /* award points */
  const points = POINTS_SYSTEM[difficulty.toLowerCase()];
  const pointsEarned = correct && !enoughCorrect ? points : POINT_PENALTY;
  user.score += pointsEarned;

  /* create and save record */
  const answer = {
    userId: user.id,
    qIndex: questionIndex - 1,
    name: user.name,
    score: user.score,
    pointsEarned,
    correctAnswer: correct,
  };
  room.status.answers.push(answer);
}

function weShouldMoveOn(room) {
  /* if the numCorrect param has been set, do the check */
  const enoughCorrectNow = room.params.numCorrect && checkEnoughCorrect(room);

  /* determine if everyone has answered and we should move on */
  const allAnswered = room.status.answers.length === room.users.length;

  // console.log(room.params, checkEnoughCorrect(room));
  // console.log(room.status.answers.length, room.users.length);

  if (allAnswered || enoughCorrectNow) {
    const reason = enoughCorrectNow
    ? "enough got it right"
    : allAnswered
    ? "everybody answered"
    : "time ran out";
    console.log(`Moving on for ${room.roomId} because ${reason}`);
  }

  return allAnswered || enoughCorrectNow;
}



module.exports = { gatherAndSetGameInfo, checkEnoughCorrect, recordAndAward, weShouldMoveOn };
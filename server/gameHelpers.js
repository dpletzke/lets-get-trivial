/* eslint-disable func-style */

const { getQuestions, getSessionToken } = require("./api/opentdb");

const { POINTS_SYSTEM, POINT_PENALTY } = require("./constants");

async function gatherAndSetGameInfo(room, params) {
  if (!room.token) {
    const tokenRes = await getSessionToken();
    room.token = tokenRes.token;
  }
  room.params = params;
  /* request questions with token and params and add to room */
  const questionsRes = await getQuestions(params, room.token);
  room.questions = questionsRes.results;

  /* start the game status */
  room.status.started = true;
  room.status.currentQ = 0;

  return { questions: room.questions, params };
}

function recordAndAward(user, room, { correct, difficulty, questionIndex }) {

  /* if question answered is for the current question */
  if (questionIndex - 1 === room.status.currentQ) {

    const points = POINTS_SYSTEM[difficulty.toLowerCase()];
    // TODO: should not be penalizing late correct
    // const pointsEarned = correct && !enoughCorrect ? points : POINT_PENALTY;
    const pointsEarned = correct ? points : POINT_PENALTY;
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

    console.log(
      ` ${user.name} picked ${correct ? "right" : "wrong"} for ${
        room.status.currentQ
      } / ${answer.questionIndex - 1}`
    );
  } else {
    console.log(`${user.name} was too late, they would've been ${correct ? "right" : "wrong"}.`);
  }
}

function weShouldMoveOn(room) {

  /* determine if everyone has answered and we should move on */
  const allAnswered = room.status.answers.length === room.users.length;

  if (allAnswered) {
    console.log(`Moving on for ${room.roomId} because everybody answered`);
  }
  return allAnswered;
}

module.exports = { gatherAndSetGameInfo, recordAndAward, weShouldMoveOn };

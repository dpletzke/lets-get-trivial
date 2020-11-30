import { useContext, useEffect } from "react";
import PanelList from "./PanelList";
import GameplayHeader from "./GameplayHeader";
import ConnectionContext from "../../ConnectionContext";
import "./Question.scss";

const shuffle = function (array) {
  let i = array.length,
    j,
    temp;
  if (i === 0) return;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const digestQuestionObj = (questionObject) => {
  const question = {
    question: [{ questionString: questionObject.question }],

    answers: [
      ...questionObject.incorrect_answers.map((incorrectAnswer) => ({
        answerString: incorrectAnswer,
        correct: false,
        selected: false,
      })),
      {
        answerString: questionObject.correct_answer,
        correct: true,
        selected: false,
      },
    ],
  };
  shuffle(question.answers);
  return question;
};

function ActiveQuestion({ questionObj, questionIndex, timeLimit, audioOn }) {
  const { question, answers } = digestQuestionObj(questionObj);
  console.log({ questionObj });

  const connection = useContext(ConnectionContext);

  const pickAnswer = (correct) => {
    connection.current.emit("picked_answer", {
      correct,
      ...questionObj,
      questionIndex,
    });
  };

  // let winnerSong = new Audio("/sounds/timeUp.mp3");
  // winnerSong.volume = 0.4;
  // const victorySong = () => {
  //   winnerSong.play();
  // };

  useEffect(() => {
    let beep = new Audio("/sounds/timeUp.mp3");
    beep.volume = 0.4;

    const victorySong = () => {
      beep.play().catch((err) => console.log(err));
    };
    if (audioOn) {
      const timer = setTimeout(() => {
        victorySong();
      }, timeLimit * 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="box-question">
      <GameplayHeader
        questionIndex={questionIndex}
        view="question"
        time={timeLimit}
      >
        <PanelList infoArray={question} />
      </GameplayHeader>
      <div className="question-container">
        <PanelList infoArray={question} />
        <PanelList
          infoArray={answers}
          pickAnswer={pickAnswer}
          audioOn={audioOn}
        />
      </div>
    </div>
  );
}

export default ActiveQuestion;

import { useContext } from "react";

import PanelList from "./PanelList";
import GameplayHeader from "./GameplayHeader";
import "./Question.scss";

import ConnectionContext from "../../ConnectionContext";

const shuffle = function (array){
  let i = array.length, j, temp;
  if ( i === 0 ) return;
  while ( --i ) {
      j = Math.floor( Math.random() * ( i + 1 ) );
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
};

// move this into a helper file at some point? It's just changing the data structure to fit better with our component architecture
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
  return question
};

function ActiveQuestion({ questionObj, questionIndex, timeLimit, audioOn }) {
  const { question, answers } = digestQuestionObj(questionObj);
  console.log(questionObj);

  const connection = useContext(ConnectionContext);

  const pickAnswer = (correct) => {
    connection.current.emit("picked_answer", {
      correct,
      ...questionObj,
      questionIndex,
    });
  };

  //GameplayHeader needs to take the following props: {questionIndex, view, time (question/score)-hardCoded} - optional boolean (isPlaying -> This turns timer on or off)
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
        {/* the two panels in this view can be targeted individually due to their conditional css, see PanelList component */}
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

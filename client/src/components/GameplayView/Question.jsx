import { useContext } from "react";

import PanelList from "./PanelList";
import GameplayHeader from "./GameplayHeader";
import "./Question.scss";

import ConnectionContext from "../../ConnectionContext";

// move this into a helper file at some point? It's just changing the data structure to fit better with our component architecture
const digestQuestionObj = (questionObject) => {
  return {
    // questionIndex: questionObject.questionIndex,
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
    ].sort(() => Math.random() - 0.5)
  };
};

function ActiveQuestion({ questionObj, questionIndex, timeLimit }) {
  const { question, answers } = digestQuestionObj(questionObj);
  console.log(questionObj)

  const connection = useContext(ConnectionContext);

  const pickAnswer = (correct) => {
    connection.current.emit("picked_answer", { correct, ...questionObj });
  };

  //GameplayHeader needs to take the following props: {questionIndex, view, time (question/score)-hardCoded} - optional boolean (isPlaying -> This turns timer on or off)
  return (
    <div>
      <GameplayHeader questionIndex={questionIndex} view="question" time={timeLimit}>
        <PanelList infoArray={question} />
      </GameplayHeader>
      <div className="question-container">
        {/* the two panels in this view can be targeted individually due to their conditional css, see PanelList component */}
        <PanelList infoArray={question} />
        <PanelList infoArray={answers} pickAnswer={pickAnswer} />
      </div>
    </div>
  );
}

//https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
// for(let i = array.length — 1; i > 0; i--){
//   const j = Math.floor(Math.random() * i)
//   const temp = array[i]
//   array[i] = array[j]
//   array[j] = temp
// }

export default ActiveQuestion;

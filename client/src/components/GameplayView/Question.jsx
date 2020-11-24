import { useContext } from 'react';

import PanelList from "./PanelList";
import GameplayHeader from "./GameplayHeader";
import "./Question.scss";

import ConnectionContext from "../../ConnectionContext";

//here is the structure of the data coming from the api. Added is the questionIndex which is based on how many questions the user selects
// const questionObj = {
//   "question": "Who wrote the novel &quot;Moby-Dick&quot;?",
//   "correct_answer": "Herman Melville",
//   "incorrect_answers": [
//   "William Golding",
//   "William Shakespeare",
//   "J. R. R. Tolkien"
//   ]
//   }

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
    ],
  };
};

function ActiveQuestion({ questionObj, questionIndex }) {
  const { question, answers } = digestQuestionObj(questionObj);

  const connection = useContext(ConnectionContext);

  const pickAnswer = (questionObj) => {
    return (correct) => {
      connection.current.emit('picked_answer', { correct, ...questionObj });
    }
  }

  return (
    <div>
      <GameplayHeader questionIndex={questionIndex} />
      <div className="question-container">
        {/* the two panels in this view can be targeted individually due to their conditional css, see PanelList component */}
        <PanelList infoArray={question} />
        <PanelList infoArray={answers} pickAnswer={pickAnswer(questionObj)}/>
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

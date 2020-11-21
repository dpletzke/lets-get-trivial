import PanelList from './PanelList'
import GameplayHeader from './GameplayHeader'


//here is the structure of the data coming from the api. Added is the questionIndex which is based on how many questions the user selects
// const questionObj = {
//   "questionIndex": 3,
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
    questionIndex: questionObject.questionIndex,
    question: [{questionString: questionObject.question}],
    
    answers: [
    ...questionObject.incorrect_answers.map((incorrectAnswer) => ({answerString: incorrectAnswer, correct: false, selected: false})),
    {answerString: questionObject.correct_answer, correct: true, selected: false}
    ]
    
    
  };
}

function ActiveQuestion({questionObj}) {
  
  const {question, answers, questionIndex} = digestQuestionObj(questionObj)

  return (
    <div>
      <GameplayHeader questionIndex={questionIndex}/>
      <div>
        {/* the two panels in this view can be targeted individually due to their condition css, see PanelList component */}
    <PanelList infoArray = {question} />
     <PanelList 
       infoArray = {answers}
       />
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
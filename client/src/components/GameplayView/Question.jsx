import AnswerList from './AnswerList'

const questionObj = {
  "question": "Who wrote the novel &quot;Moby-Dick&quot;?",
  "correct_answer": "Herman Melville",
  "incorrect_answers": [
  "William Golding",
  "William Shakespeare",
  "J. R. R. Tolkien"
  ]
  }

function ActiveQuestion() {
  const {question, correct_answer, incorrect_answers} = questionObj;
  return (
    <div>
      <h1>ActiveQuestion Component</h1>
     <p>{question}</p>
     <AnswerList 
       answers = {[...incorrect_answers, correct_answer]}
       />
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
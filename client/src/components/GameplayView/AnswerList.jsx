import AnswerItem from "./AnswerItem";

// for prototyping purposes
const answersObj = {
  answers : [
  "Herman Melville",
  "William Golding",
  "William Shakespeare",
  "J. R. R. Tolkien"
  ]
}


function AnswerList(props) {
  // replace answersObj with props
  const {answers} = answersObj

  const list = answers.map(answer => <AnswerItem answer />)

  return (
    <div>
      <h1>AnswerList Component</h1>
     {list}
    </div>
   
  );
}

export default AnswerList
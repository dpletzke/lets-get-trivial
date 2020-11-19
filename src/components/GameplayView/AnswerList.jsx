import AnswerItem from "./AnswerItem";



function AnswerList(props) {
  const {answers} = props

  const list = answers.map(answer => <AnswerItem answer />)

  return (
    <div>
      <h1>AnswerList Component</h1>
     {list}
    </div>
   
  );
}

export default AnswerList
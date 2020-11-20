import AnswerItem from "./AnswerItem";
import './AnswerList.scss'



function AnswerList(props) {
  // replace answersObj with props
  const {answers} = props
  
  const list = answers.map(answer => {
    const {answerString, selected, correct} = answer
    return (<AnswerItem answer={answerString} selected={selected} correct={correct} />)
  });

  return (
    <div className="box box__answers">
     {list}
    </div>
   
  );
}

export default AnswerList
import './AnswerItem.scss';

function AnswerItem(props) {
  // replace answerObj with props
  const {answer} = props

  return (
    <div className="panel panel__answer">
      <p>{answer}</p>
    </div>
  );
}

export default AnswerItem
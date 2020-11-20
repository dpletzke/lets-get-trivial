import './AnswerItem.scss';
import classNames from 'classnames';

function AnswerItem(props) {
  // replace answerObj with props
  const {answer, selected, correct, setSelected} = props
  const className = classNames("panel panel__answer", {
    "panel__answer--selected": selected,
  });

  return (
    <div className={className} onClick={setSelected}>
      <p>{answer}</p>
    </div>
  );
}

export default AnswerItem
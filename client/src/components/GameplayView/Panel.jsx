import './Panel.scss';
import classNames from 'classnames';

function Panel(props) {
  // replace answerObj with props
  const {info, setSelected} = props
  const {questionString, answerString, correct, selected} = info;

  const className = classNames("panel", {
    "panel__answer--selected": selected,
  }, {"panel__answer": answerString}, {"panel__question": questionString});

  return (
    <div className={className} onClick={setSelected}>
      <p>{answerString || questionString}</p>
    </div>
  );
}

export default Panel
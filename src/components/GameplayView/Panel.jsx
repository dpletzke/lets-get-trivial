import './Panel.scss';
import classNames from 'classnames';

function Panel(props) {
  // replace answerObj with props
  const {info, setSelected, selected} = props

  const className = classNames("panel", {
    "panel__answer--selected": selected,
  }, {"panel__answer": info.answerString}, {"panel__question": info.questionString});

  return (
    <div className={className} onClick={setSelected}>
      <p>{info.answerString || info.questionString}</p>
    </div>
  );
}

export default Panel
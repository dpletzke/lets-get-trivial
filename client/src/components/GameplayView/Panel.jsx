import "./Panel.scss";
import classNames from "classnames";

import { FaCheck, FaRegSadTear } from "react-icons/fa";

import { decodeEntity } from "html-entities";

function Panel(props) {
  const { id, info, selected, setSelected, somethingSelected, audioOn } = props;

  let successSound = new Audio("/sounds/success.mp3");
  let failureSound = new Audio("/sounds/wrong-8bit.mp3");
  failureSound.volume = 0.3;
  successSound.volume = 0.2;

  const success = () => {
    if (audioOn) successSound.play();
  };
  const failure = () => {
    if (audioOn) failureSound.play();
  };

  const { questionString, answerString, correct } = info;

  const className = classNames(
    "panel",
    {
      "panel__answer--selectedTrue": selected && correct === true,
    },
    {
      "panel__answer--selectedTrue": somethingSelected && correct === true,
    },
    {
      "panel__answer--selectedFalse": selected && correct === false,
    },
    { panel__answer: answerString },
    { panel__question: questionString }
  );

  return (
    <>
      {answerString && (
        <div
          className={className}
          onClick={() => setSelected(id)}
          onMouseDown={correct ? success : failure}
        >
          <FaRegSadTear className="icon__incorrect" />
          <p>{decodeEntity(answerString)}</p>
          <FaCheck className="icon__correct" />
        </div>
      )}
      {questionString && (
        <div className={className}>
          <p>{decodeEntity(questionString)}</p>
        </div>
      )}
    </>
  );
}

export default Panel;

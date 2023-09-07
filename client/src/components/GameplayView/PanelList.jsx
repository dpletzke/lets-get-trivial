import { useState, useContext, useEffect } from "react";
import Panel from "./Panel";
import "./PanelList.scss";
import classNames from "classnames";
import ConnectionContext from "../../ConnectionContext";
import { LAG_BEFORE_SCORE_VIEW } from "../../constants";

//mapping an array into a list of panels and rendering them within a div
function PanelList({ infoArray, pickAnswer, audioOn }) {
  const [selected, setSelected] = useState("");

  // determines if this is a question panel or an answer panel based on the keys the object
  const questionPanel = infoArray[0].questionString ? true : false;
  const answerPanel = infoArray[0].answerString ? true : false;

  const className = classNames(
    "box",
    { box__answer: answerPanel },
    { box__question: questionPanel }
  );

  const connection = useContext(ConnectionContext);

  useEffect(() => {
    let timer;
    connection.current.on("next_question", () => {
      timer = setTimeout(() => {
        setSelected("");
        clearTimeout(timer);
      }, LAG_BEFORE_SCORE_VIEW);
    });

    return () => {
      clearTimeout(timer);
    };
  }, [connection]);

  const clickHandler = (id) => {
    if (!selected) {
      pickAnswer(infoArray[id - 1].correct);
      setSelected(id);
    }
  };

  const list = infoArray.map((info, index) => {
    return (
      <Panel
        key={index + 1}
        id={index + 1}
        info={info}
        selected={index + 1 === selected}
        somethingSelected={selected ? true : false}
        setSelected={clickHandler}
        audioOn={audioOn}
      />
    );
  });

  return <div className={className}>{list}</div>;
}

export default PanelList;

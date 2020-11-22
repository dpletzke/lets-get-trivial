import "./Button.scss";
import { useContext } from "react";
import ConnectionContext from '../ConnectionContext'

const classNames = require("classnames");



function Button(props) {

  console.log(ConnectionContext)

  const connectionId = useContext(ConnectionContext);
  const btnClass = classNames("btn", {
    "btn--home": props.home,
    "btn--game-room": props.gameRoom,
  });

  return (
    <>
      <p>{connectionId}</p>
      <button onClick={props.onClick} className={btnClass}>
        {props.children}
      </button>
    </>
  );
}

export default Button;

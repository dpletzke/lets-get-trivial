import "./Button.scss";
import { useContext } from "react";
import ConnectionContext from "../ConnectionContext";

const classNames = require("classnames");

function Button(props) {
  const connection = useContext(ConnectionContext);
  const btnClass = classNames("btn", {
    "btn--home": props.home,
    "btn--game-room": props.gameRoom,
    "btn--publicGames": props.publicGames,
  });

  const askForCategories = () => {
    connection.current.emit("get_roomIds");
  };

  return (
    <>
      <button onClick={props.onClick} className={btnClass}>
        {props.children}
      </button>
    </>
  );
}

export default Button;

import "./Button.scss";

import classNames from "classnames";

function Button(props) {
  const btnClass = classNames("btn", {
    "btn--home": props.home,
    "btn--game-room": props.gameRoom,
    "btn--publicGames": props.publicGames,
  });

  return (
    <button onClick={props.onClick} className={btnClass}>
      {props.children}
    </button>
  );
}

export default Button;

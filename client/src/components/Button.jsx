import "./Button.scss";

const classNames = require("classnames");

function Button(props) {
  const btnClass = classNames("btn", {
    //prettier-ignore
    "start": props.start,
    "day-list__item--full": props.spots === 0,
  });

  return <button onClick={props.onClick} className={btnClass}>{props.children}</button>;
}

export default Button;

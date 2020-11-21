import "./Button.scss";

const classNames = require("classnames");

function Button(props) {
  const btnClass = classNames("btn", {
    "btn--home": props.home,
  });

  return <button className={btnClass}>{props.children}</button>;
}

export default Button;

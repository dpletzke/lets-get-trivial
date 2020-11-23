//Params for each option
import "./OptionItem.scss";

function OptionItem({ children, clickHandler, gameSetting }) {
  return (
    <div onClick={clickHandler} className="option-item">
      <span>{children}</span>
    </div>
  );
}

export default OptionItem;

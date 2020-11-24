//Params for each option
import "./OptionItem.scss";

function OptionItem({ children, clickHandler, label }) {
  return (
    <div onClick={() => clickHandler(children)} className="option-item">
      <span>{children}</span>
    </div>
  );
}

export default OptionItem;

import OptionItem from "./OptionItem";
import "./OptionItemList.scss";

const options = [];

//Category, Difficulty
function OptionItemList({ optionsList, clickHandler, label }) {
  const list = optionsList.map((item) => (
    <OptionItem label={label} clickHandler={clickHandler}>
      {item}
    </OptionItem>
  ));
  return (
    <div className="category-heading">
      <h3>{label}</h3>
      <div className="settings-group">{list}</div>
    </div>
  );
}

export default OptionItemList;

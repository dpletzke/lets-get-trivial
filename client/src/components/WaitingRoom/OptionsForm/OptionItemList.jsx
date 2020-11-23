import OptionItem from "./OptionItem";

const options = [];

//Category, Difficulty
function OptionItemList({ optionsList, gameSetting, clickHandler }) {
  const list = optionsList.map((item) => (
    <OptionItem gameSetting={gameSetting} clickHandler={clickHandler}>
      {item}
    </OptionItem>
  ));
  return (
    <div>
      <h3>{gameSetting}</h3>
      {list}
    </div>
  );
}

export default OptionItemList;

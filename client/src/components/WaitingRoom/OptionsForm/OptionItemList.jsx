import OptionItem from "./OptionItem";
import "./OptionItemList.scss";


function OptionItemList({ optionsList, clickHandler, label, selected }) {
  
  const list = optionsList.map((item , index) => {
   
    return (<OptionItem key={index+1} selected={selected} clickHandler={clickHandler}>
      {item}
    </OptionItem>
  )
});
  return (
    <div className="category-heading">
      <h3>{label}</h3>
      <div className="settings-group">{list}</div>
    </div>
  );
}

export default OptionItemList;

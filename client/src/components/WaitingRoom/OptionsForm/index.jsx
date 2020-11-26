import OptionItemList from "./OptionItemList";
import Dropdown from "../../Dropdown";
import categories from "./categoriesData";
import { FaCog } from "react-icons/fa";
import "./index.scss";
import digestSettings from './optionsHelpers';

const {settings} = require('../../../config/settings');
 
function OptionsForm({ setters, params }) {
  //setters is coming from hooks/useGameData
  const {setCategory} = setters;
  



  const optionGroups = digestSettings(settings, setters).map((elm) => {
    const { label, optionsList, clickHandler, paramsKey } = elm;

    return (
      <OptionItemList
        selected={params[paramsKey]}
        label={label}
        optionsList={optionsList}
        clickHandler={clickHandler}
      />
    );
  });

  return (
    <div className="settings-container">
      <h1>
        <FaCog className="settings-cog" />
        Game Settings
      </h1>
      <Dropdown
        label="Categories"
        optionsArray={categories}
        displayKey="name"
        idKey="id"
        clickHandler={setCategory}
        selected={params.categoryId}
      />
      {optionGroups}
    </div>
  );
}

export default OptionsForm;

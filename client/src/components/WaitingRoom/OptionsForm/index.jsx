import OptionItemList from "./OptionItemList";
import Dropdown from "../../Dropdown";
import categories from "./categoriesData";
import { FaCog, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import "./index.scss";
import digestSettings from "./optionsHelpers";

import { settings } from "../../../config/settings";

function OptionsForm({ setters, params, setVolume, audioOn }) {
  const { setCategory } = setters;

  const optionGroups = digestSettings(settings, setters).map((elm) => {
    const { label, optionsList, clickHandler, paramsKey } = elm;

    return (
      <OptionItemList
        key={label}
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
      <div className="audio-toggle">
        {!audioOn && <FaVolumeMute onClick={setVolume} />}
        {audioOn && <FaVolumeUp onClick={setVolume} />}
      </div>
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

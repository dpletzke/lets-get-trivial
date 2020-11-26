import OptionItemList from "./OptionItemList";
import Dropdown from "../../Dropdown";
import categories from "./categoriesData";
import { FaCog } from "react-icons/fa";
import "./index.scss";



function OptionsForm({ setters, params }) {
  //setters is coming from hooks/useGameData
  const {setNumber, setDifficulty, setQuestionTimeLimit, setNumberCorrect, setCategory} = setters;

  const settings = [
    {
      label: "Number of Questions",
      paramsKey: "numQuestions",
      optionsList: [5, 10, 15, 20],
      clickHandler: setNumber,
    },
    {
      label: "Difficulty",
      paramsKey: "difficulty",
      optionsList: ["Easy", "Medium", "Hard", "Mixed"],
      clickHandler: setDifficulty,
    },
    {
      label: "Question Time",
      paramsKey: "timeLimit",
      optionsList: [10, 20, 30, 40],
      clickHandler: setQuestionTimeLimit,
    },
    {
      label: "Correct Per Round",
      paramsKey: "numCorrect",
      optionsList: [1, 2, "25%", "50%"],
      clickHandler: setNumberCorrect,
    },
  ];

  const optionGroups = settings.map((elm) => {
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

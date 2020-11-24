import { useState } from "react";
import OptionItemList from "./OptionItemList";
import Dropdown from "../../Dropdown";
import categories from "./categoriesData";
import { FaCog } from "react-icons/fa";
import "./index.scss";

//trying to return an object formatted thusly:
// params = {
//   numQuestions, categoryId, difficulty, type, timeLimit, numCorrect
// }

// this should eventually be dealt with
// as global state:

function OptionsForm() {
  const [options, setOptions] = useState({});
  

  function setNumber(num) {
    setOptions({ ...options, numQuestions: num });
  }
  function setCategory(catId) {
    console.log({ catId });
    setOptions({ ...options, categoryId: catId });
  }

  // checks if the difficulty is easy, medium, or hard
  // and doesn't change the state if not
  function setDifficulty(difficulty) {
    let setDiff = difficulty.toLowerCase();
    const validOptions = ["easy", "medium", "hard"];
    if (validOptions.find((el) => el === setDiff)) {
      setOptions({ ...options, difficulty: difficulty });
    }
  }

  function setQuestionTimeLimit(time) {
    setOptions({ ...options, timeLimit: time });
  }
  function setNumberCorrect(num) {
    setOptions({ ...options, numCorrect: num });
  }

  const settings = [
    {
      label: "Number of Questions",
      paramsKey: 'numQuestions',
      optionsList: [5, 10, 15, 20],
      clickHandler: setNumber,
    },
    {
      label: "Difficulty",
      paramsKey: 'difficulty',
      optionsList: ["Easy", "Medium", "Hard", "Mixed"],
      clickHandler: setDifficulty,
    },
    {
      label: "Question Time",
      paramsKey: 'timeLimit',
      optionsList: [10, 20, 30, 40],
      clickHandler: setQuestionTimeLimit,
    },
    {
      label: "Correct Per Round",
      paramsKey: 'numCorrect',
      optionsList: [1, 2, "50%", "100%"],
      clickHandler: setNumberCorrect,
    },
  ];

  const optionGroups = settings.map((elm) => {
    const { label, optionsList, clickHandler, paramsKey } = elm;
    console.log({ elm });

    return (
      <OptionItemList
        selected={options[paramsKey]}
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
      />
      {optionGroups}
    </div>
  );
}

export default OptionsForm;

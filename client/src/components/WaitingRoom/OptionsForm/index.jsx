import { useState } from "react";
import OptionItemList from "./OptionItemList";
import Option from "./Option";
import OptionItem from "./OptionItem";

//trying to return an object formatted thusly:
// params = {
//   numQuestions, categoryId, difficulty, type, timeLimit, numCorrect
// }

function OptionsForm() {
  const [options, setOptions] = useState({});

  function setNumber(num) {
    setOptions({ ...options, numQuestions: num });
  }
  function setCategory(catId) {
    setOptions({ ...options, categoryId: catId });
  }
  function setDifficulty(difficulty) {
    setOptions({ ...options, difficulty: difficulty });
  }
  function setQuestionTimeLimit(time) {
    setOptions({ ...options, timeLimit: time });
  }
  function setNumberCorrect(num) {
    setOptions({ ...options, numCorrect: num });
  }
  const numberList = [10, 20, 35, 55];
  const difficultyList = ["Easy", "Medium", "Hard", "Mixed"];
  const timeList = [10, 20, 30, 40];
  const numberCorrectList = [1, "50%", 2, "25%number"];
  return (
    <div>
      <h1>OptionsForm</h1>
      <OptionItemList
        gameSetting="numQuestions"
        clickHandler={setNumber}
        optionsList={numberList}
      />
      <OptionItemList
        gameSetting="difficulty"
        clickHandler={setDifficulty}
        optionsList={difficultyList}
      />
      <OptionItemList
        gameSetting="timeLimit"
        clickHandler={setQuestionTimeLimit}
        optionsList={timeList}
      />
      <OptionItemList
        gameSetting="numCorrect"
        clickHandler={setNumberCorrect}
        optionsList={numberCorrectList}
      />
    </div>
  );
}

export default OptionsForm;

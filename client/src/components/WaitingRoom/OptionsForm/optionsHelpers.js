export default function digestSettings(settings, setters) {
  const {
    setNumber,
    setDifficulty,
    setQuestionTimeLimit,
    setNumberCorrect,
  } = setters;

  const digestedSettings = settings.map((settingObj) => {
    const { paramsKey } = settingObj;
    if (paramsKey === "numQuestions") {
      return { ...settingObj, clickHandler: setNumber };
    }
    if (paramsKey === "difficulty") {
      return { ...settingObj, clickHandler: setDifficulty };
    }
    if (paramsKey === "numCorrect") {
      return { ...settingObj, clickHandler: setNumberCorrect };
    }
    if (paramsKey === "timeLimit") {
      return { ...settingObj, clickHandler: setQuestionTimeLimit };
    }
    return { ...settingObj };
  });

  return digestedSettings;
}

const settings = [
  {
    label: "Number of Questions",
    paramsKey: "numQuestions",
    optionsList: [5, 10, 15, 20],
    defaultTo: 5,
  },
  {
    label: "Difficulty",
    paramsKey: "difficulty",
    optionsList: ["Easy", "Medium", "Hard", "Mixed"],
    defaultTo: "Mixed",
  },
  {
    label: "Question Time",
    paramsKey: "timeLimit",
    optionsList: [15, 20, 30, 40],
    defaultTo: 15,
  },

];

function generateDefaults(settings) {
  const defaults = {};
  settings.forEach((settingObj) => {
    const { paramsKey, defaultTo } = settingObj;
    defaults[paramsKey] = defaultTo;
  });
  return defaults;
}

const defaults = generateDefaults(settings);

export { settings, defaults };

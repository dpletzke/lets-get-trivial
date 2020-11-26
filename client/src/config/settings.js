const settings = [
  {
    label: "Number of Questions",
    paramsKey: "numQuestions",
    optionsList: [5, 10, 15, 20],
  },
  {
    label: "Difficulty",
    paramsKey: "difficulty",
    optionsList: ["Easy", "Medium", "Hard", "Mixed"],
  },
  {
    label: "Question Time",
    paramsKey: "timeLimit",
    optionsList: [15, 20, 30, 40],
  },
  {
    label: "Correct Per Round",
    paramsKey: "numCorrect",
    optionsList: [1, 2, "25%", "50%"],
  },
];

module.exports = { settings };

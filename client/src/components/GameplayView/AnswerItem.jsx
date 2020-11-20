//fixture for development
const answerObj = {
  answer: "Herman Melville"
}

function AnswerItem(props) {
  // replace answerObj with props
  const {answer} = answerObj

  return (
  <h1>{answer}</h1>
  );
}

export default AnswerItem
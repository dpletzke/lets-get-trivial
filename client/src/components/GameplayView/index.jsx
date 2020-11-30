import ActiveQuestion from "./Question";
import Scoreboard from "./Scoreboard";
import StartGame from "./StartGame";
import { SCOREBOARD_LAG, STARTPAGE_LAG, FINISHED_LAG } from "../../constants";

function GameplayView(props) {
  const { questions, params, currentQ, players, view, audioOn } = props;

  const { timeLimit } = params;

  console.log("Current Q: ", currentQ);

  const SCORE = "SCORE";
  const QUESTION = "QUESTION";
  const STARTING = "STARTING";
  const FINISHED = "FINISHED";

  const passProps = {
    questionObj: questions[currentQ],
    questionIndex: currentQ + 1,
    timeLimit,
  };

  if (view === STARTING) {
    return <StartGame time={STARTPAGE_LAG * 0.001} audioOn={audioOn} />;
  }

  if (view === QUESTION) {
    return <ActiveQuestion {...passProps} audioOn={audioOn} />;
  }

  if (view === SCORE) {
    return (
      <Scoreboard
        time={SCOREBOARD_LAG * 0.001}
        view={view}
        players={players}
        audioOn={audioOn}
      />
    );
  }

  if (view === FINISHED) {
    return (
      <Scoreboard
        time={FINISHED_LAG * 0.001}
        view={view}
        players={players}
        audioOn={audioOn}
      />
    );
  }
  return <h1>None of the above</h1>;
}

export default GameplayView;

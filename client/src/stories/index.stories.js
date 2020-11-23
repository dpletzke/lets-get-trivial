import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

// import Loader from "react-loader-spinner";

import Button from "../components/Button";
import Loading from "../components/Loading";
import Timer from "../components/GameplayView/Timer";
import Panel from "../components/GameplayView/Panel";
import PanelList from "../components/GameplayView/PanelList";
import GameplayHeader from "../components/GameplayView/GameplayHeader";
import ActiveQuestion from "../components/GameplayView/Question";
import Home from "../components/Home";
import WaitingRoom from "../components/WaitingRoom/index";
import PlayerListItem from "../components/WaitingRoom/PlayerListItem";
import PlayerList from "../components/WaitingRoom/PlayerList";
import DialogueBox from "../components/Modal";
import Dropdown from "../components/Dropdown";

storiesOf("Button", module).add("Submit", () => <Button>Submit</Button>);
storiesOf("Loading", module).add("Dots", () => (
  <Loading type="ThreeDots" color="#e9c46a" />
));

storiesOf("Timer", module)
  .add("20 second Timer - Big", () => <Timer duration={20} />)
  .add("10 second Timer - Small", () => (
    <Timer duration={10} size={50} strokeWidth={4} />
  ))
  .add("5 second timer - Small", () => (
    <Timer duration={5} size={50} strokeWidth={4} />
  ));
// ));
storiesOf("Timer", module)
  .add("10 second Timer - Small", () => (
    <Timer duration={10} size={50} strokeWidth={4} />
  ))
  .add("5 second timer - Small", () => (
    <Timer duration={5} size={50} strokeWidth={4} />
  ));

storiesOf("Panel", module)
  .add("Panel", () => (
    <Panel
      info={{ answerString: "Charles Dickens" }}
      setSelected={action("selected")}
    />
  ))
  .add("Selected Panel", () => (
    <Panel info={{ answerString: "Jodie Foster" }} selected />
  ));

const answersArray = [
  { answerString: "Herman Melville", selected: false, correct: false },
  { answerString: "William Golding", selected: false, correct: false },
  { answerString: "William Shakespeare", selected: false, correct: false },
  { answerString: "J.R.R. Tolkein", selected: true, correct: false },
];

const questionArray = [{ questionString: "Is this going to work?" }];

storiesOf("PanelList", module)
  .add("PanelList of answers", () => <PanelList infoArray={answersArray} />)
  .add("PanelList of Question", () => <PanelList infoArray={questionArray} />);

storiesOf("GameplayHeader", module).add("Gameplay Header", () => (
  <GameplayHeader questionId="3" />
));

const questionObj = {
  questionIndex: 3,
  question: "Who wrote the novel &quot;Moby-Dick&quot;?",
  correct_answer: "Herman Melville",
  incorrect_answers: [
    "William Golding",
    "William Shakespeare",
    "J. R. R. Tolkien",
  ],
};

storiesOf("Question View", module).add("Active Question View", () => (
  <ActiveQuestion questionObj={questionObj} />
));

storiesOf("Home View", module).add("Landing Page", () => <Home />);

const playersObj = {
  players: [
    { name: "Player_1", score: 0 },
    { name: "Player_2", score: 0 },
    { name: "Player_3", score: 0 },
  ],
};

const gameId = "FBDEGF";

storiesOf("Waiting Room", module).add("Basic Waiting Room", () => (
  <WaitingRoom players={playersObj.players} gameId={gameId} />
));
storiesOf("Waiting Room", module).add("Player List Item", () => (
  <PlayerListItem name={"Sam"} playerItem />
));
storiesOf("Waiting Room", module).add("Game Id Item", () => (
  <PlayerListItem name={"BEIYCD"} gameIdItem />
));
storiesOf("Waiting Room", module).add("Player List", () => (
  <PlayerList players={playersObj.players} />
));

storiesOf("Dropdown", module).add("Dropdown Menu", () => <Dropdown />);

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

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
import OptionItem from "../components/WaitingRoom/OptionsForm/OptionItem";
import OptionItemList from "../components/WaitingRoom/OptionsForm/OptionItemList";
import OptionsForm from "../components/WaitingRoom/OptionsForm/index";
import Option from "../components/WaitingRoom/OptionsForm/OptionItemList";
import DialogueBox from "../components/Modal";
import Dropdown from "../components/Dropdown";
import ScoreListItem from "../components/GameplayView/ScoreListItem";
import ScoreList from "../components/GameplayView/ScoreList";
import Scoreboard from "../components/GameplayView/Scoreboard";
import StartGame from "../components/GameplayView/StartGame";

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

storiesOf("Panel", module).add("Panel", () => (
  <Panel
    info={{ answerString: "Charles Dickens" }}
    setSelected={action("selected")}
  />
));
storiesOf("Panel", module).add("Panel", () => (
  <Panel
    info={{ answerString: "Charles Dickens" }}
    setSelected={action("selected")}
  />
));
storiesOf("Panel", module)
  .add("Panel", () => (
    <Panel
      info={{ answerString: "Charles Dickens" }}
      setSelected={action("selected")}
    />
  ))
  .add("Selected True Panel", () => (
    <Panel
      setSelected={action("selected")}
      info={{ answerString: "Jodie Foster", selected: true, correct: true }}
    />
  ))
  .add("Selected False Panel", () => (
    <Panel
      setSelected={action("selected")}
      info={{ answerString: "Jodie Foster", selected: true, correct: false }}
    />
  ));

const answersArray = [
  { answerString: "Herman Melville", selected: false, correct: false },
  { answerString: "William Golding", selected: false, correct: false },
  { answerString: "William Shakespeare", selected: false, correct: false },
  { answerString: "J.R.R. Tolkein", selected: false, correct: true },
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
  question:
    "Who wrote the novel &quot;Moby-Dick&quot;? Its a really important question because Western culture is good for getting jobs duhhhh bro",
  correct_answer: "Herman Melville",
  incorrect_answers: [
    " It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "Will",
    "J. R. R. Tolkien",
  ],
};

storiesOf("Question View", module).add("Active Question View", () => (
  <ActiveQuestion
    questionObj={questionObj}
    questionIndex={3}
    timeLimit={30}
    audioOn={true}
  />
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

storiesOf("Dropdown", module).add("Dropdown Menu", () => <Dropdown />);

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
storiesOf("Options Menu", module).add("Option Item list 1", () => (
  <OptionItemList
    clickHandler={action("clicked!")}
    optionsList={[15, 20, 35, 40]}
    gameSetting="How many questions?"
  />
));
storiesOf("Options Menu", module).add("Option Item list 2", () => (
  <OptionItemList
    clickHandler={action("clicked!")}
    optionsList={[15, 20, 35, 40]}
    gameSetting="How many questions?"
  />
));
storiesOf("Options Menu", module).add("Option Item 3", () => (
  <OptionItem gameSetting="Category" clickHandler={action("clicked!")}>
    Horses
  </OptionItem>
));
storiesOf("Options Menu", module).add("The entire option form", () => (
  <OptionsForm />
));

storiesOf("ScoreBoard", module).add("Score List Item", () => <ScoreListItem />);
storiesOf("ScoreBoard", module).add("Score List", () => <ScoreList />);
storiesOf("ScoreBoard", module).add("Score Board", () => <Scoreboard />);

storiesOf("Start Game View", module).add("StartGame", () => <StartGame />);

const victoryPlayers = [
  { name: "player_1", score: 65, pointsEarned: 3, correctAnswer: true },
  { name: "player_1", score: 65, pointsEarned: 3, correctAnswer: true },
  { name: "player_6", score: 65, pointsEarned: 3, correctAnswer: false },
  { name: "player_2", score: 65, pointsEarned: -2, correctAnswer: true },
  { name: "player_3", score: 29, pointsEarned: 1, correctAnswer: false },
  { name: "player_3", score: 29, pointsEarned: 1, correctAnswer: false },
  { name: "player_3", score: 29, pointsEarned: 1, correctAnswer: false },
];

const scoresArray = [65, 45, 29];

// storiesOf("Victory Score Board", module).add("Victory", () => (
//   <Scoreboard players={victoryPlayers} time={5} view={"FINISHED"} />
// ));

storiesOf("Score Board", module).add("Victory", () => (
  <ScoreList orderedArray={victoryPlayers} scoresArray={scoresArray} />
));

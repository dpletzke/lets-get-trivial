import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

// import Loader from "react-loader-spinner";

import Button from "../components/Button";
import Loading from "../components/Loading";
import Timer from "../components/GameplayView/Timer";
import AnswerItem from "../components/GameplayView/AnswerItem";
import AnswerList from "../components/GameplayView/AnswerList";

storiesOf("Button", module).add("Submit", () => <Button>Submit</Button>);
storiesOf("Loading", module).add("Dots", () => (
  <Loading type="ThreeDots" color="#e9c46a" />
));

storiesOf("Timer", module).add("20 second Timer - Big", () => (
  <Timer duration={20} />
));
storiesOf("Timer", module)
  .add("10 second Timer - Small", () => (
    <Timer duration={10} size={50} strokeWidth={4} />
  ))
  .add("5 second timer - Small", () => (
    <Timer duration={5} size={50} strokeWidth={4} />
  ));

storiesOf("AnswerItem", module)
  .add("AnswerItem", () => (
    <AnswerItem answer="Charles Dickens" setSelected={action("selected")} />
  ))
  .add("Selected AnswerItem", () => (
    <AnswerItem answer="Jodie Foster" selected />
  ));

const answersArray = [
  { answerString: "Herman Melville", selected: false, correct: false },
  { answerString: "William Golding", selected: false, correct: false },
  { answerString: "William Shakespeare", selected: false, correct: false },
  { answerString: "J.R.R. Tolkein", selected: true, correct: false },
];

storiesOf("AnswerList", module).add("AnswerList", () => (
  <AnswerList answers={answersArray} />
));

import { storiesOf } from "@storybook/react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import Timer from "../components/GameplayView/Timer";
import AnswerItem from "../components/GameplayView/AnswerItem";

storiesOf("Timer", module).add("Timer", () => <Timer />);

storiesOf("AnswerItem", module).add("AnswerItem", () => <AnswerItem />);

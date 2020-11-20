import { storiesOf } from "@storybook/react";
// import Loader from "react-loader-spinner";


import Button from "../components/Button";
import Loading from "../components/Loading";
import Timer from "../components/GameplayView/Timer";


storiesOf("Button", module).add("Submit", () => <Button>Submit</Button>);
storiesOf("Loading", module).add("Dots", () => (
  <Loading type="ThreeDots" color="#e9c46a" />
))


storiesOf("Timer", module).add("20 second Timer - Big", () => (
  <Timer duration={20} />
))
storiesOf("Timer", module).add("10 second Timer - Small", () => (
  <Timer duration={10} size={50} strokeWidth={4} />
))
.add("5 second timer - Small", () => (
  <Timer duration={5} size={50} strokeWidth={4}/>
))


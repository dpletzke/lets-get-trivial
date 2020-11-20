import { storiesOf } from "@storybook/react";
import Loader from "react-loader-spinner";

import Button from "../components/Button";
import Loading from "../components/Loading";
import Title from "../components/Title";

storiesOf("Button", module).add("Submit", () => <Button>Submit</Button>);
storiesOf("Loading", module).add("Dots", () => (
  <Loader type="ThreeDots" color="#e9c46a" />
));

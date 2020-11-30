import Loader from "react-loader-spinner";
import variables from "../styles/variables.scss";

import classNames from "classnames";

function Loading() {
  return <Loader type="ThreeDots" color="#2a9d8f" secondaryColor="#2a9d8f" />;
}

export default Loading;

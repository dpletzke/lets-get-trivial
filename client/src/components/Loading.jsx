import Loader from "react-loader-spinner";
import variables from "../styles/variables.scss";

import classNames from "classnames";

function Loading() {
  return <Loader type="ThreeDots" color="#1f203e" secondaryColor="#2a9d8f" />;
}

export default Loading;

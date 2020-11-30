import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Timer.scss";
import "./Timer";

// Timer from CountdownCircleTimer npm package

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer-message">Time Up</div>;
  }

  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

function Timer({ duration }) {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={duration}
      size={75}
      strokeWidth={3}
      ariaLabel={"Time Remaining"}
      colors={[
        ["#86d5bd", 0.33],
        ["#e9c46a", 0.33],
        ["#d98781", 0.33],
      ]}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
}

export default Timer;

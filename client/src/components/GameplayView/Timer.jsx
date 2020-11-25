import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Timer.scss";
import "./Timer";

// Timer Reference Sandbox - CountdownCircleTimer npm package - See Doc for props that it can take
//https://codesandbox.io/s/silly-night-d3s70?fontsize=14&hidenavigation=1&theme=dark&file=/src/styles.css:79-642

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer-message">Time Up</div>;
  }

  return (
    <div className="timer">
      <div className="timer-text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="timer-text">seconds</div>
    </div>
  );
};

function Timer({ duration, size, strokeWidth }) {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={duration}
      size={68}
      strokeWidth={strokeWidth}
      ariaLabel={"Time Remaining"}
      colors={[
        ["#2a9d8f", 0.33],
        ["#e9c46a", 0.33],
        ["#e76f51", 0.33],
      ]}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
}

export default Timer;

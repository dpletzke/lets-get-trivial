import { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Loading from "../Loading";

import "./StartGame.scss";

function StartGame({ time, audioOn }) {
  let gameThemeSong = new Audio("/sounds/gameTheme.mp3");
  gameThemeSong.volume = 0.08;

  const themeSong = () => {
    gameThemeSong.play().catch((err) => console.log(err));
  };

  useEffect(() => {
    if (audioOn) {
      themeSong();
    }
  }, []);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer-message">Go</div>;
    }

    return (
      <div className="timer">
        <div className="timer-text">Game</div>
        <div className="value">{remainingTime}</div>
        <div className="timer-text">Starting</div>
      </div>
    );
  };
  return (
    <div className="start-page-container">
      <div className="flex-box">
        <h1>Let's Get Trivial</h1>

        <CountdownCircleTimer
          isPlaying
          duration={time}
          size={250}
          colors={[
            ["#f4a261", 0.33],
            ["#e9c46a", 0.33],
            ["#2a9d8f", 0.33],
          ]}
        >
          {renderTime}
        </CountdownCircleTimer>

        {/* <CountdownCircleTimer
          isPlaying
          duration={50000}
          size={400}
          strokeWidth={10}
          ariaLabel={"Time Remaining"}
          colors={[
            ["#f4a261", 0.33],
            ["#e9c46a", 0.33],
            ["#2a9d8f", 0.33],
          ]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer> */}
      </div>
    </div>
  );
}

export default StartGame;

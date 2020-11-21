import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './Timer'


// Timer Reference Sandbox - CountdownCircleTimer npm package - See Doc for props that it can take
//https://codesandbox.io/s/silly-night-d3s70?fontsize=14&hidenavigation=1&theme=dark&file=/src/styles.css:79-642

function Timer({duration, size, strokeWidth}) {
  return (
    
  <CountdownCircleTimer
    
    isPlaying
    duration={duration}
    size={size}
    strokeWidth={strokeWidth}
    ariaLabel={"Time Remaining"}
    
    colors={[
      ['#2a9d8f', 0.33],
      ['#e9c46a', 0.33],
      ['#e76f51', 0.33],
    ]}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>

)
  }

export default Timer;
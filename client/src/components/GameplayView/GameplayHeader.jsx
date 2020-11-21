import Timer from './Timer';
import './GameplayHeader.scss';

function GameplayHeader({questionIndex}) {
  return (
    <div className="header header__gameplay">
      <p>Question {questionIndex}</p>
       <Timer duration={10} size={50} strokeWidth={4} />
    </div>
  );
}

export default GameplayHeader
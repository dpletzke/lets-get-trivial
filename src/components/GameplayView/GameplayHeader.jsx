import Timer from './Timer';
import './GameplayHeader.scss';

function GameplayHeader({questionId}) {
  return (
    <div className="header header__gameplay">
      <p>Question {questionId}</p>
       <Timer duration={10} size={50} strokeWidth={4} />
    </div>
  );
}

export default GameplayHeader
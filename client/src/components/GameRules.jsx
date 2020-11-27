import "./GameRules.scss";

function GameRules() {
  return (
    <div className="info-modal">
      <div className="info-heading">
        <h2 className="text-bright"><em> Let's Get Trivial</em> brings the fun back to trivia!</h2>
          <ul>
            <li className="mb-small"> >> Challenge your friends online</li>
            <li className="mb-small"> >> Play opponents from around the globe in a public room</li>
            <li className="mb-small"> >> Fully customizable categories and game settings</li>
          </ul>
      </div>

      <div className="rules-heading">
        <h2>How To Play</h2>
      </div>

      <div className="content content--rules">
        
        <div className="game_types">

        <h3 className="text-bright">Game Types</h3>

          <div className="game_type--type">
            <h4 className="centered">Private</h4>
            <ul>
              <li className="mb-small">1. Create a private game room</li>
              <li className="mb-small">2. Send your friends the generated game ID</li>
              <li className="mb-small">3. Select desired game category and settings</li>
              <li className="mb-small">4. Wait for your friends to join</li>
            </ul>
            </div>

            <div className="game_type--type">
            <h4 className="centered">Public</h4>
            <ul>
              <li className="mb-small">Create a public game room and wait for players to join</li>
              <li className="mb-small">OR</li>
              <li className="mb-small">Join a pre-existing public game from the home-page</li>
            </ul>
          </div>

        </div>    
        <div className="scoring">
          <h3 className="text-bright">Scoring</h3>
            <ul>
              <li className="mb-small">1. Points are earned for correct answers and removed for incorrect
            answers.</li>
              <li className="mb-small">2. The number of points for each question is based on the difficulty
            of the question.</li>
              <li className="mb-small">3. Your updated score and points earned for will be shown at the end
            of each question.</li>
            </ul>

        </div>

            <div className="customizeable_game_settings">
              <h3 className="text-bright">Customizable Game Settings</h3>
              <ul><li className="mb-small"><em>Access game settings upon creating or joing a game</em></li></ul>
              <h4 className="indent"> Category</h4>
              <ul><li className="mb-small">Select from over 20 categories or leave the category unselected to
            generate random categories for each question</li></ul>
              <h4 className="indent">Number of Questions</h4>
              <ul><li className="mb-small">Decide how many questions you want for each round</li></ul>
              <h4 className="indent">Difficulty</h4>
              <ul><li className="mb-small"> Choose between <em>easy</em>, <em>medium</em>, <em>hard</em> or
            <em>mixed</em></li></ul>
              <h4 className="indent">Time Limit</h4>
              <ul><li className="mb-small">Set the time allowed to answer each question.</li></ul>
              <h4 className="indent">Correct Answers Per Question</h4>
              <ul><li className="mb-small"> Decide how many players need to answer a question correctly before
            the question moves on, leaving the others in the dust.</li></ul>
            </div>

      </div>
    </div>
  );
}

export default GameRules;

import "./GameRules.scss";

function GameRules() {
  return (
    <div className="info-modal">
      <div className="content">
        <p>
          <span className="text-bright">
            <em> Let's Get Trivial</em> brings the fun back to trivia!
          </span>

          <span className="inner-text text-heading">
            <br />
            >> Challenge your friends online
            <br />
            >> Play opponents from around the globe in a public room
            <br />
            >> Fully customizable categories and game settings
            <br />
          </span>
        </p>
      </div>
      <div className="rules-heading">
        <h3>How To Play</h3>
      </div>
      <div className="content content--rules">
        <p>
          <span className="text-bright">Game Types</span>
          <span className="inner-text text-heading">
            <br />
            <span className="category-text">Private</span>
            <br />
            1. Create a private game room
            <br />
            2. Send your friends the generated game ID
            <br />
            3. Select desired game category and settings
            <br />
            4. Wait for your friends to join
            <br />
            <span className="category-text">Public</span>
            <br />
            1. Create a public game room and wait for players to join
            <br />
            OR
            <br />
            2. Join a pre-existing public game from the home-page
            <br />
            <br />
            <span className="text-bright">Scoring</span>
            <br />
            <span className="category-text"></span>
            1. Points are earned for correct answers and removed for incorrect
            answers.
            <br />
            2. The number of points for each question is based on the difficulty
            of the question.
            <br />
            3. Your updated score and points earned for will be shown at the end
            of each question.
            <br />
            <br />
            <span className="text-bright">Customizable Game Settings</span>
            <br />
            <span className="category-text"></span>
            Access game settings upon creating or joing a game
            <br />
            <span className="category-text">Category</span>
            <br />
            <span className="category-text"></span>
            Select from over 20 categories or leave the category unselected to
            generate random categories for each question
            <br />
            <span className="category-text">Number of Questions</span>
            <br />
            <span className="category-text"></span>
            Decide how many questions you want for each round
            <br />
            <span className="category-text">Difficulty</span>
            <br />
            <span className="category-text"></span>
            Choose between <em>easy</em>, <em>medium</em>, <em>hard</em> or
            <em>mixed</em>
            <br />
            <span className="category-text">Time Limit</span>
            <br />
            <span className="category-text"></span>
            Set the time allowed to answer each question.
            <br />
            <span className="category-text">Correct Answers Per Question</span>
            <br />
            <span className="category-text"></span>
            Decide how many players need to answer a question correctly before
            the question moves on, leaving the others in the dust.
            <br />
          </span>
        </p>
      </div>
    </div>
  );
}

export default GameRules;

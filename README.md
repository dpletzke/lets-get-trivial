# Let's Get Trivial

## Lets Get Trivial brings the fun back to trivia!

<p>
Challenge your friends online!</br>
Play opponents from around the globe in a public room</br>
Fully customizable categories and game settings</br>
</p>

---
## About the app

<p>
Lets Get Trivial is built with React. It runs on an Express server and uses Socket.io as a websocket API. The app also utilizes a public trivia api for generating questions and is deployed with Heroku.
</p>

## Finished Product


<p align='center'>Home and Waiting Room</p>
  <p align="center">
    <img src="https://github.com/dpletzke/lets-get-trivial/blob/master/DOCS/Home.png?raw=true" height="400">
    <img src="https://github.com/dpletzke/lets-get-trivial/blob/master/DOCS/Waiting_room.png?raw=true" height="400">
  </p>
</p>

<p align='center'>Start Game, Question, Scoreboard, Game Over</p>
<p align="center">
  <img src="https://github.com/dpletzke/lets-get-trivial/blob/master/DOCS/Starting.png?raw=true" height="400">
  <img src="https://github.com/dpletzke/lets-get-trivial/blob/master/DOCS/Question.png?raw=true" height="400">
</p>
<p align="center">
  <img src="https://github.com/dpletzke/lets-get-trivial/blob/master/DOCS/Score.png?raw=true" height="400">
  <img src="https://github.com/dpletzke/lets-get-trivial/blob/master/DOCS/Finished.png?raw=true" height="400">
</p>

<p align='center'>Info, Settings, and Public Games</p>
<p align="center">
  <img src="https://github.com/dpletzke/lets-get-trivial/blob/master/DOCS/Info_modal.png?raw=true" height="400">
  <img src="https://github.com/dpletzke/lets-get-trivial/blob/master/DOCS/Settings_modal.png?raw=true" height="400">
  <img src="https://github.com/dpletzke/lets-get-trivial/blob/master/DOCS/Public_games.png?raw=true" height="400">
</p>

## How to Install Locally

<p> Fork and clone this repo. Make sure to run npm install in <strong>both</strong> the server and the client folders, before starting both the client and the server (in separate terminal windows) and visiting your localhost.

`npm install` x 2

`npm start` x 2

<p>If serving 'Let's Get Trivial' locally, you will <em>not</em> be able to host multiplayer games over the internet. If you want to play the multiplayer, working version of the app, visit <a href="https://www.lets-get-trivial-game.herokuapp.com">Let's Get Trivial</a> on Heroku.</p>

## How To Play: Game Types

### Private

<ol>
<li>Create a private game room</li>
<li>Send your friends the generated game ID
</li>
<li>Select desired game category and settings</li>
<li>Wait for your friends to join</li>
</ol>

### Public

<p>Create a public game room and wait for players to join. </br>
<strong>OR</strong> </br>
Join a pre-existing public game from the home-page by clicking on the globe icon.</p>

---

## Scoring

<ol>
<li>Points are earned for correct answers and removed for incorrect
answers.</li>
<li>The number of points for each question is based on the
difficulty of the question.
</li>
<li>Your updated score and points earned will be shown at the
end of each question.</li>
</ol>
 
______________________________________________________________________

## Customizable Game Settings

Access game settings upon creating or joining a game.

### Category

Select from over 20 categories or leave the category unselected to
generate random categories for each question.

### Number of Questions

Decide how many questions you want for each round.

### Difficulty

Choose between easy, medium,
hard or mixed.

### Time Limit

Set the time allowed to answer each question.

### Game Sounds

Toggle game sounds on or off in the waiting room or settings modal.

---

## Contribute Questions

This app draws questions from the Open Trivia Database. [Visit their site to contribute a question to the game](https://opentdb.com/login.php).

---

## Developer Credits

<p>
Game designed and built by <a href='http://github.com/dpletzke/'>Dan Pletzke</a>, <a href="https://github.com/skendanavian">Soren Nissen</a>, and <a href="sebastiankann@gmail.com">Sebastian Kann</a>.

Fonts are 'Audiowide' by Astigmatic and 'Palanquin' by [Pria Ravichandran](https://linkedin.com/in/pria-ravichandran-7b896742) . </br>
</p>


<p>
<strong>All Rights Reserved &copy;2020</strong>
</p>

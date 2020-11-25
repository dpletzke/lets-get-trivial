const players = [
  { name: "player_1", score: 42, pointsEarned: 3, correctAnswer: true },
  { name: "player_6", score: 42, pointsEarned: 3, correctAnswer: false },
  { name: "player_2", score: 65, pointsEarned: -2, correctAnswer: true },
  { name: "player_3", score: 29, pointsEarned: 1, correctAnswer: false },
  { name: "player_4", score: 29, pointsEarned: 1, correctAnswer: false },
  { name: "player_5", score: 29, pointsEarned: 1, correctAnswer: true },
];

//Extract Player Names Where correctAnswer is true
export function generateScoreString(players) {
  let winners = [];
  players.forEach((player) => {
    if (player.correctAnswer) {
      winners.push(player.name);
    }
  });

  if (winners.length === 0) {
    return `No one answered correctly!`;
  }
  if (winners.length === 1) {
    return `${winners[0]} answered correctly!`;
  }
  if (winners.length === 2) {
    return `${winners[0]} & ${winners[1]} answered correctly!`;
  } else {
    let string = "";
    for (let i = 0; i < winners.length; i++) {
      if (i === winners.length - 1) {
        string += winners[i];
      } else if (i === winners.length - 2) {
        string += `${winners[i]} & `;
      } else {
        string += `${winners[i]}, `;
      }
    }
    return `${string} answered the question correctly!`;
  }
}

//If compareFunction(a, b) returns less than 0, sort a to an index lower than b (i.e. a comes first).
//Above coming from MDN for ref...
//Order players array by score
export function orderByScore(players) {
  return players.sort((a, b) => b.score - a.score);
}

export function orderByPlace(players) {
  const placesObj = {};
  players.forEach((player) => {
    const { score } = player;

    if (!placesObj[score]) {
      placesObj[score] = [player];
    } else {
      placesObj[score].push(player);
    }
  });
  return placesObj;
}

export function mapObjectToPlaces(placesObj) {
  const scores = Object.keys(placesObj).reverse();
  const places = scores.length;
  console.log(places);
  const placesArray = [];

  for (let i = 1; i <= places; i++) {
    placesArray.push(i);
  }
  const result = [];
  for (let place of placesArray) {
    const highestScore = scores[0];
    const resultElm = {};
    resultElm[place] = { ...placesObj[highestScore] };
    result.push(resultElm);
    scores.shift();
  }
  return result;
}

export function placementGenerator(players) {
  return mapObjectToPlaces(orderByPlace(orderByScore(players)));
}

console.log(placementGenerator(players));

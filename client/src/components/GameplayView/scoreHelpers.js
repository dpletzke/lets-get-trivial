//TEST DATA SET
// const players = [
//   { name: "player_1", score: 42, pointsEarned: 3, correctAnswer: true },
//   { name: "player_6", score: 42, pointsEarned: 3, correctAnswer: false },
//   { name: "player_2", score: 65, pointsEarned: -2, correctAnswer: true },
//   { name: "player_3", score: 29, pointsEarned: 1, correctAnswer: false },
//   { name: "player_4", score: 29, pointsEarned: 1, correctAnswer: false },
//   { name: "player_5", score: 29, pointsEarned: 1, correctAnswer: true },
// ];

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

export function orderByScore(players) {
  return players.sort((a, b) => b.score - a.score);
}

export function findPlacements(players) {
  const scores = players.map((player) => {
    return player.score;
  });

  const output = [...new Set(scores)].sort((a, b) => b - a);
  return output;
}

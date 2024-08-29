export const groupMatches = (matchesList) => {
  const grouped = Object.values(matchesList).reduce((acc, matchs) => {
    const matchID = matchs[0].matchID;

    if (!acc[matchID]) {
      acc[matchID] = {
        matchID: matchID,
        matchDate: matchs[0].matchDate,
        user1ID: matchs[0].user1ID,
        user1Name: matchs[0].user1Name,
        user1ProfileImage: matchs[0].user1ProfileImage,
        user2ID: matchs[0].user2ID,
        user2Name: matchs[0].user2Name,
        user2ProfileImage: matchs[0].user2ProfileImage,
        sets: [],
      };
    }
    matchs.forEach((set) => {
      acc[matchID].sets.push({
        setID: set.setID,
        user1Score: set.user1Score,
        user2Score: set.user2Score,
        winnerID: set.winnerID,
      });
    });
    return acc;
  }, {});

  Object.values(grouped).forEach((match) => {
    const winnerCounter = {};
    match.sets.forEach((set) => {
      if (!winnerCounter[set.winnerID]) {
        winnerCounter[set.winnerID] = 0;
      }
      winnerCounter[set.winnerID]++;
    });
    const matchWinner = Number(
      Object.keys(winnerCounter).reduce((a, b) =>
        winnerCounter[a] > winnerCounter[b] ? a : b,
      ),
    );
    match.matchWinner = matchWinner;
  });

  return Object.values(grouped);
};

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { matches } from "../redux/slices/matchesSlice";
import Match from "./Match";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMatches = async () => {
      // if (!validateLogin()) return;

      try {
        // console.log(credentials);
        await dispatch(matches()).unwrap();

        // navigate("/matches");
      } catch (error) {
        // await dispatch(
        //   toastAction({ message: error.message, type: "ERROR" })
        // ).unwrap();
        console.log(error);
      }
    };

    getMatches();
  }, [dispatch]);

  const matchesList = useSelector((state) => state.matches.matches);

  const grouped = Object.values(matchesList).reduce((acc, matchs) => {
    const matchID = matchs[0].matchID;

    if (!acc[matchID]) {
      acc[matchID] = {
        matchID: matchID,
        matchDate: matchs[0].matchDate,
        player1ID: matchs[0].player1ID,
        player1Name: matchs[0].player1Name,
        player2ID: matchs[0].player2ID,
        player2Name: matchs[0].player2Name,
        sets: [],
      };
    }
    matchs.forEach((set) => {
      acc[matchID].sets.push({
        setID: set.setID,
        player1Score: set.player1Score,
        player2Score: set.player2Score,
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

  const matchesGrouped = Object.values(grouped);

  return (
    <>
      {matchesGrouped.map((match, i) => (
        <Match match={match} key={i} />
      ))}
    </>
  );
};

export default Home;

import { Stack, useLocalSearchParams } from "expo-router";
import MatchInfo from "../../src/pages/MatchInfo";
import { colors } from "myracketpartner-commons";
import { useEffect } from "react";
import { matchDetailsAction } from "../../src/redux/slices/matchesSlice";
import { useSelector, useDispatch } from "react-redux";

const MatchId = () => {
  const { matchId } = useLocalSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const getMatcheDetails = async () => {
      // if (!validateLogin()) return;
      try {
        // console.log(credentials);
        await dispatch(matchDetailsAction(matchId)).unwrap();

        // navigate("/matches");
      } catch (error) {
        // await dispatch(
        //   toastAction({ message: error.message, type: "ERROR" })
        // ).unwrap();
        console.log(error);
      }
    };

    getMatcheDetails();
  }, [dispatch, matchId]);

  const matchDetails = useSelector((state) => state.matches.matchDetails || {});

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colors.green },
          headerTintColor: colors.primary,
          headerLeft: () => {},
          headerRight: () => {},
          headerTitle: `${matchDetails?.user1?.name} vs ${matchDetails?.user2?.name}`,
        }}
      />
      <MatchInfo matchDetails={matchDetails} />
    </>
  );
};

export default MatchId;

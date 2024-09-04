// DEPENDENCIES
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, useLocalSearchParams } from "expo-router";
import { colors } from "utils/stylesUtil";
import { ActivityIndicator } from "react-native";

// REDUX
import { matchDetailsAction } from "store/slices/matchesSlice";

// COMPONENTS
import MatchInfo from "pages/MatchInfo/MatchInfo";

// FUNCTION
const MatchId = () => {
  const { matchId } = useLocalSearchParams();
  const isLoading = useSelector((state) => state.loading);

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
          headerTitle: isLoading
            ? () => <ActivityIndicator size="small" color={colors.orange} />
            : `${matchDetails?.user1?.name} vs ${matchDetails?.user2?.name}`,
        }}
      />
      <MatchInfo matchDetails={matchDetails} />
    </>
  );
};

export default MatchId;

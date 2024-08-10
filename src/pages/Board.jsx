import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { matches } from "../redux/slices/matchesSlice";
import Match from "../components/Match";
import FriendlyIcon from "../images/svg-components/FriendlyIcon";
import { colors } from "myracketpartner-commons";
import { groupMatches } from "../utils/groupMatches";

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

  const matchesGrouped = groupMatches(matchesList);

  return (
    <ScrollView>
      <View style={styles.wrapperTitle}>
        <FriendlyIcon
          width={40}
          height={30}
          marginHorizontal={23}
          pathFill={colors.greyLight}
        />
        <Text style={styles.title}>Friendy Matches</Text>
      </View>
      {matchesGrouped.map((match, i) => (
        <Match match={match} key={i} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapperTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default Home;

// DEPENDENCIES
import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "myracketpartner-commons";
import { useTranslation } from "react-i18next";

// REDUX
import { matches } from "../redux/slices/matchesSlice";

// COMPONENTS
import Match from "../components/Match";

// IMAGES
import FriendlyIcon from "../images/svg-components/FriendlyIcon";

// UTILS
import { groupMatches } from "../utils/groupMatches";

// FUNCTION
const Board = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        <Text style={styles.title}>{t("Board.Friendly.Title")}</Text>
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

export default Board;

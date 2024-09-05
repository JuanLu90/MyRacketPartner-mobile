// DEPENDENCIES
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "utils/stylesUtil";
import { useTranslation } from "react-i18next";

// REDUX
import { matchesAction } from "store/slices/matchesSlice";

// COMPONENTS
import Match from "components/Match/Match";
import AddMatchModal from "components/Modals/AddMatchModal/AddMatchModal";
import FloatingButton from "components/FloatingButton/FloatingButton";

// STYLES
import styles from "./Board.styled";

// IMAGES
import FriendlyIcon from "images/svg-components/FriendlyIcon";

// FUNCTION
const Board = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [addMatchModalState, setAddMatchModalState] = useState(false);

  useEffect(() => {
    const getMatches = async () => {
      try {
        await dispatch(matchesAction()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    getMatches();
  }, [dispatch]);

  const {
    user: { id },
  } = useSelector((state) => state.auth);
  const matchesList = useSelector((state) => state.matches.matches);

  return (
    <>
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
        {matchesList.map((match) => (
          <Match match={match} key={match.matchID} />
        ))}
        {addMatchModalState && (
          <AddMatchModal
            isOpen={addMatchModalState}
            closeModal={() => setAddMatchModalState(false)}
          />
        )}
      </ScrollView>
      {id && <FloatingButton action={() => setAddMatchModalState(true)} />}
    </>
  );
};

export default Board;

import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { colors } from "../utils/stylesUtil";
import EditMatchImg from "../images/edit.png";
import { formatDate, formatHour } from "../utils/dateUtil";
import UserDefaultImg from "../images/user-default.png";

const Match = (props) => {
  const {
    match,
    toggleModal,
    selectMatch,
    manageUserAllowed,
    adminUserID,
    userID,
    playerID,
  } = props;

  const {
    matchWinner,
    player1ID,
    player2ID,
    player1Name,
    player2Name,
    sets,
    matchDate,
  } = match;

  const displayEditButton = () => {
    let checkIfMatchEditable = false;

    if (userID === adminUserID) checkIfMatchEditable = true;
    else if (
      manageUserAllowed &&
      (player1ID === playerID || player2ID === playerID)
    ) {
      checkIfMatchEditable = true;
    }

    return checkIfMatchEditable;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.innerWrapper}>
        <View style={styles.firstBlock}>
          <View style={styles.date}>
            <Text style={styles.dateText}>{formatDate(matchDate)}</Text>
            <Text style={styles.dateText}>{formatHour(matchDate)}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.playersWrapper}>
            <View style={styles.playersInfo}>
              <Image source={UserDefaultImg} style={styles.playerIcon} />
              <Text
                style={[
                  styles.playerStyled,
                  matchWinner === player1ID && styles.winner,
                ]}
              >
                {player1Name}
              </Text>
            </View>
            <View style={styles.playersInfo}>
              <Image source={UserDefaultImg} style={styles.playerIcon} />

              <Text
                style={[
                  styles.playerStyled,
                  matchWinner === player2ID && styles.winner,
                ]}
              >
                {player2Name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.result}>
          {sets.map((set, i) => (
            <View key={i} style={styles.resultInner}>
              <Text
                style={[
                  styles.resultStyled,
                  set.player1Score > set.player2Score && styles.winner,
                ]}
              >
                {set.player1Score}
              </Text>
              <Text
                style={[
                  styles.resultStyled,
                  set.player1Score < set.player2Score && styles.winner,
                ]}
              >
                {set.player2Score}
              </Text>
            </View>
          ))}
        </View>
        {/* {displayEditButton() && (
          <>
            <View style={styles.separator} />
            <View style={styles.wrapperEdit}>
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                  selectMatch(match);
                }}
              >
                <Image source={EditMatchImg} style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          </>
        )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  innerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstBlock: {
    flexDirection: "row",
  },
  date: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    fontSize: 12, // 0.75rem in px
  },
  dateText: {
    color: colors.greyLight,
  },
  result: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  resultInner: {
    flexDirection: "column",
    justifyContent: "center",
  },
  resultSpan: {
    marginHorizontal: 5,
  },
  playersWrapper: {
    flexDirection: "column",
  },
  playersInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  playerStyled: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: colors.white,
  },
  resultStyled: {
    fontWeight: "normal",
    color: colors.white,
    paddingHorizontal: 4,
  },
  winner: {
    fontWeight: "bold",
  },
  separator: {
    backgroundColor: colors.greyLight,
    height: 36,
    opacity: 0.6,
    width: 1,
    marginRight: 10,
  },
  wrapperEdit: {
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: {
    width: 17,
    height: 17, // Added height for better scaling
  },
  playerIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
});

export default Match;

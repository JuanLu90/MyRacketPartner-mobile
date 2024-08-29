// DEPENDENCIES
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { colors } from "myracketpartner-commons";
import { useRouter } from "expo-router";

// UTILS
import { formatDate, formatHour } from "utils/dateUtil";

// IMAGES
import EditMatchImg from "images/edit.png";
import UserDefaultImg from "images/user-default.png";

// FUNCTION
const Match = (props) => {
  const {
    match,
    toggleModal,
    selectMatch,
    manageUserAllowed,
    adminUserID,
    userID,
  } = props;

  const {
    matchWinner,
    user1ID,
    user2ID,
    user1Name,
    user2Name,
    sets,
    matchDate,
  } = match;

  const router = useRouter();

  const displayEditButton = () => {
    let checkIfMatchEditable = false;

    if (userID === adminUserID) checkIfMatchEditable = true;
    else if (manageUserAllowed && (user1ID === userID || user2ID === userID)) {
      checkIfMatchEditable = true;
    }

    return checkIfMatchEditable;
  };

  return (
    <Pressable onPress={() => router.push(`/match/${match.matchID}`)}>
      <View style={styles.wrapper}>
        <View style={styles.innerWrapper}>
          <View style={styles.firstBlock}>
            <View style={styles.date}>
              <Text style={styles.dateText}>{formatDate(matchDate)}</Text>
              <Text style={styles.dateText}>{formatHour(matchDate)}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.usersWrapper}>
              <View style={styles.usersInfo}>
                <Image source={UserDefaultImg} style={styles.userIcon} />
                <Text
                  style={[
                    styles.userStyled,
                    matchWinner === user1ID && styles.winner,
                  ]}
                >
                  {user1Name}
                </Text>
              </View>
              <View style={styles.usersInfo}>
                <Image source={UserDefaultImg} style={styles.userIcon} />

                <Text
                  style={[
                    styles.userStyled,
                    matchWinner === user2ID && styles.winner,
                  ]}
                >
                  {user2Name}
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
                    set.user1Score > set.user2Score && styles.winner,
                  ]}
                >
                  {set.user1Score}
                </Text>
                <Text
                  style={[
                    styles.resultStyled,
                    set.user1Score < set.user2Score && styles.winner,
                  ]}
                >
                  {set.user2Score}
                </Text>
              </View>
            ))}
          </View>
          {/* {displayEditButton() && (
          <>
            <View style={styles.separator} />
            <View style={styles.wrapperEdit}>
              <Pressable
                onPress={() => {
                  toggleModal();
                  selectMatch(match);
                }}
              >
                <Image source={EditMatchImg} style={styles.editIcon} />
              </Pressable>
            </View>
          </>
        )} */}
        </View>
      </View>
    </Pressable>
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
  usersWrapper: {
    flexDirection: "column",
  },
  usersInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userStyled: {
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
  userIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
});

export default Match;

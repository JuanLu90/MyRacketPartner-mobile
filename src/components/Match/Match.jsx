// DEPENDENCIES
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";
import { useRouter } from "expo-router";

// UTILS
import { formatDate, formatHour } from "utils/dateUtil";

// IMAGES
import EditMatchImg from "images/edit.png";
import UserDefaultImg from "images/user-default.png";

// STYLES
import styles from "./Match.styled";

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
    user1ProfileImage,
    user1Name,
    user2Name,
    user2ProfileImage,
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
                <Image
                  source={
                    user1ProfileImage
                      ? {
                          uri: user1ProfileImage,
                        }
                      : UserDefaultImg
                  }
                  style={styles.userIcon}
                />
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
                <Image
                  source={
                    user2ProfileImage
                      ? {
                          uri: user2ProfileImage,
                        }
                      : UserDefaultImg
                  }
                  style={styles.userIcon}
                />

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
          <View style={styles.wrapperResult}>
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

export default Match;

// DEPENDENCIES
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

// REDUX
import { matchDetailsHeadToHeadAction } from "store/slices/matchesSlice";

// STYLES
import styles from "./HeadToHead.styled";

// UTILS
import { formatDate } from "utils/dateUtil";

// FUNCTION
const HeadToHead = (props) => {
  const { user1, user2 } = props;
  const dispatch = useDispatch();
  const matchDetailsHeadToHead = useSelector(
    (state) => state.matches.matchDetailsHeadToHead,
  );

  useEffect(() => {
    const getMatcheDetails = async () => {
      if (!user1 || !user2) return;

      try {
        await dispatch(
          matchDetailsHeadToHeadAction({
            user1Id: user1?.id,
            user2Id: user2?.id,
          }),
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    getMatcheDetails();
  }, [dispatch, user1, user2]);

  return (
    <ScrollView>
      {matchDetailsHeadToHead?.map((tournamentData, i) => (
        <View key={i}>
          <Text style={styles.tournamentName}>
            {tournamentData.tournamentName}
          </Text>
          {tournamentData.matches.map((match) => {
            const { id, date, user1, user2, winnerID, sets } = match;
            return (
              <View key={id} style={styles.wrapperScore}>
                <Text style={styles.date}>{formatDate(date)}</Text>
                <View style={styles.usersWrapper}>
                  <Text
                    style={[
                      styles.userStyled,
                      winnerID === user1.id && styles.winner,
                    ]}
                  >
                    {user1.name}
                  </Text>
                  <Text
                    style={[
                      styles.userStyled,
                      winnerID === user2.id && styles.winner,
                    ]}
                  >
                    {user2.name}
                  </Text>
                </View>
                <View style={styles.resultScore}>
                  {sets.map((set, i) => (
                    <View key={i} style={styles.setWrapper}>
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
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

export default HeadToHead;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { matchDetailsHeadToHeadAction } from "../redux/slices/matchesSlice";
import { formatDate } from "../utils/dateUtil";
import { colors } from "myracketpartner-commons";

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
            const { id, date, user1, user2, winnerId, sets } = match;
            return (
              <View key={id} style={styles.wrapperScore}>
                <Text style={styles.date}>{formatDate(date)}</Text>
                <View style={styles.usersWrapper}>
                  <Text
                    style={[
                      styles.userStyled,
                      winnerId === user1.id && styles.winner,
                    ]}
                  >
                    {user1.name}
                  </Text>
                  <Text
                    style={[
                      styles.userStyled,
                      winnerId === user2.id && styles.winner,
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

const styles = StyleSheet.create({
  wrapperScore: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  usersWrapper: {
    flexDirection: "column",
    marginRight: 80,
    overflow: "hidden",
  },
  userStyled: {
    alignItems: "center",
    marginVertical: 3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: colors.white,
    fontSize: 15,
  },
  winner: {
    fontWeight: "bold",
  },
  resultScore: {
    flexDirection: "row",
    gap: 8,
    height: "100%",
  },
  setWrapper: {
    flexDirection: "column",
    justifyContent: "center",
  },
  resultStyled: {
    margin: 3,
    color: colors.white,
    fontSize: 15,
  },
  date: {
    marginRight: 15,
    fontSize: 13,
    fontWeight: "bold",
    color: colors.greyLight,
  },
  tournamentName: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: colors.white,
    backgroundColor: colors.greyLightSemiTransparent,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default HeadToHead;

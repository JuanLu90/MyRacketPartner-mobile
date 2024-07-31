import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { matchDetailsHeadToHeadAction } from "../redux/slices/matchesSlice";
import { formatDate } from "../utils/dateUtil";
import { colors } from "myracketpartner-commons";

const HeadToHead = (props) => {
  const { player1, player2 } = props;
  const dispatch = useDispatch();
  const matchDetailsHeadToHead = useSelector(
    (state) => state.matches.matchDetailsHeadToHead,
  );

  useEffect(() => {
    const getMatcheDetails = async () => {
      if (!player1 || !player2) return;

      try {
        await dispatch(
          matchDetailsHeadToHeadAction({
            player1Id: player1?.id,
            player2Id: player2?.id,
          }),
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    getMatcheDetails();
  }, [dispatch, player1, player2]);

  return (
    <ScrollView>
      {matchDetailsHeadToHead?.map((tournamentData, i) => (
        <View key={i}>
          <Text style={styles.tournamentName}>
            {tournamentData.tournamentName}
          </Text>
          {tournamentData.matches.map((match) => {
            const { id, date, player1, player2, winnerId, sets } = match;
            return (
              <View key={id} style={styles.wrapperScore}>
                <Text style={styles.date}>{formatDate(date)}</Text>
                <View style={styles.playersWrapper}>
                  <Text
                    style={[
                      styles.playerStyled,
                      winnerId === player1.id && styles.winner,
                    ]}
                  >
                    {player1.name}
                  </Text>
                  <Text
                    style={[
                      styles.playerStyled,
                      winnerId === player2.id && styles.winner,
                    ]}
                  >
                    {player2.name}
                  </Text>
                </View>
                <View style={styles.resultScore}>
                  {sets.map((set, i) => (
                    <View key={i} style={styles.setWrapper}>
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
  playersWrapper: {
    flexDirection: "column",
    marginRight: 80,
    overflow: "hidden",
  },
  playerStyled: {
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

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "myracketpartner-commons";

const Score = ({ matchDetails }) => {
  return (
    <View style={styles.wrapperScore}>
      <View style={styles.playersWrapper}>
        <Text
          style={[
            styles.playerStyled,
            matchDetails?.winnerId === matchDetails?.player1?.id &&
              styles.winner,
          ]}
        >
          {matchDetails?.player1?.name}
        </Text>
        <Text
          style={[
            styles.playerStyled,
            matchDetails?.winnerId === matchDetails?.player2?.id &&
              styles.winner,
          ]}
        >
          {matchDetails?.player2?.name}
        </Text>
      </View>
      <View style={styles.resultScore}>
        {matchDetails?.sets?.map((set, i) => (
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
};

const styles = StyleSheet.create({
  wrapperScore: {
    flexDirection: "row",
    height: 65,
    paddingHorizontal: 25,
    marginTop: 20,
  },
  playersWrapper: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginRight: 80,
    overflow: "hidden",
  },
  playerStyled: {
    color: colors.white,
    fontSize: 17,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  winner: {
    fontWeight: "bold",
  },
  resultScore: {
    gap: 20,
    height: "100%",
    flexDirection: "row",
  },
  setWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  resultStyled: {
    marginVertical: 5,
    color: colors.white,
    fontSize: 17,
  },
});

export default Score;

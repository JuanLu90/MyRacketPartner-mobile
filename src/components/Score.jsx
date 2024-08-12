import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "myracketpartner-commons";

const Score = ({ matchDetails }) => {
  return (
    <View style={styles.wrapperScore}>
      <View style={styles.usersWrapper}>
        <Text
          style={[
            styles.userStyled,
            matchDetails?.winnerId === matchDetails?.user1?.id && styles.winner,
          ]}
        >
          {matchDetails?.user1?.name}
        </Text>
        <Text
          style={[
            styles.userStyled,
            matchDetails?.winnerId === matchDetails?.user2?.id && styles.winner,
          ]}
        >
          {matchDetails?.user2?.name}
        </Text>
      </View>
      <View style={styles.resultScore}>
        {matchDetails?.sets?.map((set, i) => (
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
};

const styles = StyleSheet.create({
  wrapperScore: {
    flexDirection: "row",
    height: 65,
    paddingHorizontal: 25,
    marginTop: 20,
  },
  usersWrapper: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginRight: 80,
    overflow: "hidden",
  },
  userStyled: {
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

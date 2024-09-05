// DEPENDENCIES
import { View, Text } from "react-native";

// STYLES
import styles from "./Score.styled";

// FUNCTION
const Score = ({ matchDetails }) => {
  return (
    <View style={styles.wrapperScore}>
      <View style={styles.usersWrapper}>
        <Text
          style={[
            styles.userStyled,
            matchDetails?.winnerID === matchDetails?.user1?.id && styles.winner,
          ]}
        >
          {matchDetails?.user1?.name}
        </Text>
        <Text
          style={[
            styles.userStyled,
            matchDetails?.winnerID === matchDetails?.user2?.id && styles.winner,
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

export default Score;

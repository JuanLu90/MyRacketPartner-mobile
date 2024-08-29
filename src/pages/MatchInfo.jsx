// DEPENDENCIES
import { useState } from "react";
import { Image, StyleSheet, Text, Pressable, View } from "react-native";
import { colors } from "utils/stylesUtil";
import { useRouter } from "expo-router";

// COMPONENTS
import Screen from "./Screen";
import Score from "components/Score";
import HeadToHead from "components/HeadToHead";

// IMAGES
import UserDefaultImg from "images/user-default.png";

// FUNCTION
const MatchInfo = ({ matchDetails }) => {
  const router = useRouter();

  const [currentOptionSelected, setCurrentOptionSelected] =
    useState("Marcador");

  const { winnerId, user1, user2, totalSetsUser1, totalSetsUser2 } =
    matchDetails;

  const options = {
    Marcador: <Score matchDetails={matchDetails} />,
    H2H: <HeadToHead user1={user1} user2={user2} />,
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          <Pressable onPress={() => router.push(`/profile/${user1?.id}`)}>
            <View
              style={[
                styles.wrapperUser,
                winnerId !== user1?.id && styles.winner,
              ]}
            >
              <Image source={UserDefaultImg} style={styles.userDefaultIcon} />
              <Text style={styles.userName}>{user1?.name}</Text>
            </View>
          </Pressable>
          <View style={styles.resultContainer}>
            <Text
              style={[styles.result, winnerId !== user1?.id && styles.winner]}
            >
              {totalSetsUser1}
            </Text>
            <Text style={styles.result}> - </Text>
            <Text
              style={[styles.result, winnerId !== user2?.id && styles.winner]}
            >
              {totalSetsUser2}
            </Text>
          </View>
          <Pressable onPress={() => router.push(`/profile/${user2?.id}`)}>
            <View
              style={[
                styles.wrapperUser,
                winnerId !== user2?.id && styles.winner,
              ]}
            >
              <Image source={UserDefaultImg} style={styles.userDefaultIcon} />
              <Text style={styles.userName}>{user2?.name}</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.wrapperOptions}>
          <Pressable
            style={[
              styles.option,
              currentOptionSelected === "Marcador" && styles.selectedOption,
            ]}
            onPress={() => setCurrentOptionSelected("Marcador")}
          >
            <Text
              style={[
                styles.optionText,
                currentOptionSelected === "Marcador" &&
                  styles.optionSelectedText,
              ]}
            >
              Marcador
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.option,
              currentOptionSelected === "H2H" && styles.selectedOption,
            ]}
            onPress={() => setCurrentOptionSelected("H2H")}
          >
            <Text
              style={[
                styles.optionText,
                currentOptionSelected === "H2H" && styles.optionSelectedText,
              ]}
            >
              H2H
            </Text>
          </Pressable>
        </View>
        <View>{options[currentOptionSelected]}</View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 35,
  },
  wrapperUser: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
  },
  userName: {
    fontSize: 17,
    color: colors.white,
    fontWeight: "bold",
  },
  winner: {
    opacity: 0.5,
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  result: {
    color: colors.white,
    fontSize: 35,
    fontWeight: "bold",
  },
  wrapperOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
  selectedOption: {
    backgroundColor: colors.green,
  },
  optionText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  optionSelectedText: {
    color: colors.primary,
  },
  userDefaultIcon: {
    width: 65,
    height: 65,
    marginBottom: 8,
  },
});

export default MatchInfo;

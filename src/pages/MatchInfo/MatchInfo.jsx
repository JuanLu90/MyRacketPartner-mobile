// DEPENDENCIES
import { useState } from "react";
import { Image, Text, Pressable, View } from "react-native";
import { useRouter } from "expo-router";

// COMPONENTS
import Screen from "../Screen/Screen";
import Score from "./components/Score/Score";
import HeadToHead from "./components/HeadToHead/HeadToHead";
import AddMatchModal from "components/Modals/AddMatchModal/AddMatchModal";

// STYLES
import styles from "./MatchInfo.styled";

// IMAGES
import UserDefaultImg from "images/user-default.png";
import EditImg from "images/edit.png";

// FUNCTION
const MatchInfo = ({ matchDetails }) => {
  const router = useRouter();

  const [currentOptionSelected, setCurrentOptionSelected] =
    useState("Marcador");

  const [addMatchModalState, setAddMatchModalState] = useState(false);

  const { winnerID, user1, user2, totalSetsUser1, totalSetsUser2 } =
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
                winnerID !== user1?.id && styles.winner,
              ]}
            >
              <Image
                source={
                  user1?.profileImage
                    ? {
                        uri: user1?.profileImage,
                      }
                    : UserDefaultImg
                }
                style={styles.userDefaultIcon}
              />

              <Text style={styles.userName}>{user1?.name}</Text>
            </View>
          </Pressable>
          <View style={styles.resultContainer}>
            <Text
              style={[styles.result, winnerID !== user1?.id && styles.winner]}
            >
              {totalSetsUser1}
            </Text>
            <Text style={styles.result}> - </Text>
            <Text
              style={[styles.result, winnerID !== user2?.id && styles.winner]}
            >
              {totalSetsUser2}
            </Text>
            <Pressable
              style={styles.editResultWrapper}
              onPress={() => setAddMatchModalState(true)}
            >
              <Image source={EditImg} style={styles.editResultIcon} />
            </Pressable>
          </View>
          <Pressable onPress={() => router.push(`/profile/${user2?.id}`)}>
            <View
              style={[
                styles.wrapperUser,
                winnerID !== user2?.id && styles.winner,
              ]}
            >
              <Image
                source={
                  user2?.profileImage
                    ? {
                        uri: user2?.profileImage,
                      }
                    : UserDefaultImg
                }
                style={styles.userDefaultIcon}
              />
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
      {addMatchModalState && (
        <AddMatchModal
          isOpen={addMatchModalState}
          closeModal={() => setAddMatchModalState(false)}
          matchInfo={matchDetails}
        />
      )}
    </Screen>
  );
};

export default MatchInfo;

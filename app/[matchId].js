import { Link, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import Screen from "../src/components/Screen";

const MatchId = () => {
  const { matchId } = useLocalSearchParams();

  return (
    <Screen>
      <Text> MatchId </Text>
      <Text> MatchId </Text>
      <Text> MatchId </Text>
      <Link href="/"> Volver </Link>
      <Text> Detalle del partido {matchId} </Text>
      <Text> Detalle del partido {matchId} </Text>
      <Text> Detalle del partido {matchId} </Text>
    </Screen>
  );
};

export default MatchId;

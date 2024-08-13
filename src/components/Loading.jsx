// DEPENDENCIES
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "myracketpartner-commons";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.green} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;

import { StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

const styles = StyleSheet.create({
  wrapperTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default styles;

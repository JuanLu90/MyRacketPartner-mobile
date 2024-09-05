import { StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  contents: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default styles;

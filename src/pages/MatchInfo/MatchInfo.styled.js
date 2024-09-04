import { StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

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
    borderRadius: 40,
  },
});

export default styles;

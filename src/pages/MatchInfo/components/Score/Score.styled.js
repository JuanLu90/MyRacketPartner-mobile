import { StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

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

export default styles;

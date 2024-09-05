import { StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  innerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstBlock: {
    flexDirection: "row",
  },
  date: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    fontSize: 12, // 0.75rem in px
  },
  dateText: {
    color: colors.greyLight,
  },
  wrapperResult: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  resultInner: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 5,
  },
  resultSpan: {
    marginHorizontal: 5,
  },
  usersWrapper: {
    flexDirection: "column",
    gap: 5,
  },
  usersInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userStyled: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: colors.white,
  },
  resultStyled: {
    fontWeight: "normal",
    color: colors.white,
    paddingHorizontal: 4,
  },
  winner: {
    fontWeight: "bold",
  },
  separator: {
    backgroundColor: colors.greyLight,
    height: 36,
    opacity: 0.6,
    width: 1,
    marginRight: 10,
  },
  wrapperEdit: {
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: {
    width: 17,
    height: 17, // Added height for better scaling
  },
  userIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    borderRadius: 40,
  },
});

export default styles;

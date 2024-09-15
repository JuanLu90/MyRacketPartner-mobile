import { StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

const styles = StyleSheet.create({
  userDefaultIcon: {
    width: 65,
    height: 65,
    marginBottom: 8,
    borderRadius: 40,
  },
  selectedUser: {
    width: 65,
    height: 65,
    marginBottom: 8,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: colors.blue,
  },
  wrapperInfoResult: {
    flex: 1,
    flexDirection: "row",
  },
  usersWrapper: {
    width: 100,
    gap: 25,
    overflow: "hidden",
  },
  userStyled: {
    flexDirection: "column",
    alignItems: "center",
  },
  userName: {
    color: colors.white,
  },
  notSelectedUser: {
    width: 65,
    height: 65,
    marginBottom: 7,
    padding: 16,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 40,
    borderStyle: "dashed",
  },
  unselectUser: {
    position: "absolute",
    width: 25,
    height: 25,
    right: 17,
    bottom: 22,
    padding: 5,
    backgroundColor: colors.blue,
    borderRadius: 40,
  },
  input: {
    paddingBottom: 5,
    width: 40,
    color: colors.white,
    background: "transparent",
    fontSize: 32,
    border: "none",
    borderBottomWidth: 1,
    borderColor: colors.white,
    textAlign: "center",
  },
  wrapperResult: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  result: {
    justifyContent: "space-around",
  },
  inputSearchUser: {
    width: "100%",
    paddingBottom: 5,
    color: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.white,
    fontSize: 18,
  },
  searchUserImage: {
    width: 35,
    height: 35,
    marginBottom: 8,
    borderRadius: 40,
  },
  option: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 7,
  },
  wrapperErrorMessage: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textErrorMessage: {
    color: colors.orange,
    fontWeight: "500",
    fontSize: 18,
  },
});

export default styles;

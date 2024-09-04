import { StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

const styles = StyleSheet.create({
  firstBlock: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  userProfileIcon: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  nameInfo: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.white,
  },
  usernameInfo: {
    fontSize: 17,
    color: colors.white,
  },
  wrapperButtons: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    color: "#ffffff" /* Color del texto blanco */,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4 /* Bordes redondeados */,
    borderWidth: 2,
    borderColor: "#ffffff",
    margin: "auto",
  },
  userInfo: {
    marginBottom: 55,
  },
  userInfoChild: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 12,
  },
  countryInfo: {
    display: "flex",
  },
  asPlayerTitle: {
    marginLeft: 20,
    fontSize: 23,
    fontWeight: "bold",
  },
  playerBox: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderWidth: 1,
  },
  wrapperHandIcom: {
    display: "flex",
    justifyContent: "center",
    paddingRight: 20,
  },
});

export default styles;

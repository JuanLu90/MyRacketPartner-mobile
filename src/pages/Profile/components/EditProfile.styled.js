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
  wrapperInfo: {
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.greyDarkSemiTransparent, // Adjust based on your theme
  },
  sectionTitle: {
    marginVertical: 10,
    paddingHorizontal: 22,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  infoLabel: {
    color: colors.greyLight,
    fontSize: 16,
  },
  infoValue: {
    color: colors.white,
    fontSize: 16,
  },
  input: {
    height: 45,
    marginTop: 7,
    marginBottom: 5,
    paddingHorizontal: 10,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.greyDark,
  },
  inputSelect: {
    height: 45,
    paddingHorizontal: 10,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.greyDark,
  },
  wrapperSendButton: {
    marginBottom: 20,
  },
  errorLabel: {
    fontSize: 17,
    color: colors.orange,
  },
});

export default styles;

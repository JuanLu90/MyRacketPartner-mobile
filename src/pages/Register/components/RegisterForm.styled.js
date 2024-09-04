import { StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

const styles = StyleSheet.create({
  input: {
    width: 40,
    height: 45,
    marginBottom: 6,
    paddingHorizontal: 10,
    color: colors.white,
    borderWidth: 1,
  },
  sendButton: {
    marginHorizontal: "auto",
    marginBottom: 80,
    marginTop: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.green,
  },
  textSenfButton: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  forgotPassword: {
    marginLeft: "auto",
    marginTop: 15,
  },
  textForgotPassword: {
    margin: "auto",
    fontSize: 18,
    color: colors.green,
  },
  errorLabel: {
    fontSize: 17,
    color: colors.orange,
  },
});

export default styles;

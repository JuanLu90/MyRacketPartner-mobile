import { StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    minHeight: 250,
    zIndex: 2,
  },
  closeIcon: {
    position: "absolute",
    top: -15,
    right: 30,
    backgroundColor: colors.primary,
    borderColor: colors.orange,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    zIndex: 3,
  },
  title: {
    marginBottom: 20,
    fontSize: 35,
    fontWeight: "bold",
    color: colors.white,
  },
  children: {
    flex: 1,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    padding: 10,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  sendButton: {
    flex: 1,
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderColor: colors.greyLight,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default styles;

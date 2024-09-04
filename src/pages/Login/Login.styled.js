import { StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

const styles = StyleSheet.create({
  wrapper: { alignItems: "center", marginTop: 50 },
  textColor: {
    color: colors.white,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.greyLight,
  },
  LogIn: {
    fontSize: 18,
    marginVertical: 30,
  },
});

export default styles;

import { StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.orange,
    color: "black",
    textAlign: "center",
  },
  logoIcon: {
    width: 300,
    height: 100,
    marginVertical: 10,
  },
  wrapperRRSS: {
    flexDirection: "row",
    marginVertical: 20,
  },
  rrssImage: {
    width: 30,
    height: 30,
    marginHorizontal: 15,
  },
  links: {
    flexDirection: "column",
    marginBottom: 20,
    alignItems: "center",
  },
  linkText: {
    margin: 3,
    color: "black",
  },
  separator: {
    width: "100%",
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    marginVertical: 20,
  },
  donatePaypalImage: {
    width: 170,
    height: 50,
    marginTop: 10,
  },
  footerText: {
    marginTop: 25,
    color: "black",
    textAlign: "center",
  },
});

export default styles;

// DEPENDENCIES
import { StyleSheet, View } from "react-native";
import { colors } from "myracketpartner-commons";

// FUNCTION
const Screen = ({ children }) => {
  return (
    <View style={[styles.wrapper]}>
      {children}
      {/* <View style={styles.bottomBlock} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.green,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingVertical: 10,
  },
  //   bottomBlock: {
  //     marginTop: "auto",
  //     height: 60,
  //     borderTopWidth: 1,
  //     borderTopColor: colors.green,
  //   },
});

export default Screen;

import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { colors } from "../utils/stylesUtil.js";

const Layout = (props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <View style={styles.main}>{props.children}</View>
        <View style={styles.bottomBlock} />
      </View>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  wrapperBody: {
    // maxWidth: 800,
    // margin: "auto",
  },
  main: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "calc(100vh - 60px)",
    borderWidth: 2,
    borderColor: colors.green,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  bottomBlock: {
    // height: 60,
    borderTopWidth: 1,
    borderTopColor: colors.green,
  },
});

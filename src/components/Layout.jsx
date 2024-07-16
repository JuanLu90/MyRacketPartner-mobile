import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { colors } from "../utils/stylesUtil.js";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: screenHeight } = Dimensions.get("window");

const Layout = (props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Header />
      <View style={styles.main}>
        {props.children}
        <View style={styles.bottomBlock} />
      </View>
      <Footer />
    </View>
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
    flex: 1,
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: screenHeight - 100, // Altura mínima para cubrir toda la pantalla menos 60px
    borderWidth: 2,
    borderColor: colors.green,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  bottomBlock: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: colors.green,
  },
});

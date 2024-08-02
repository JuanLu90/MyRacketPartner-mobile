import { useState } from "react";
import { Stack, Link } from "expo-router";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Text,
  Pressable,
} from "react-native";
import { colors } from "myracketpartner-commons";
import { LogoIcon } from "../images/svg-components/LogoIcon";
import { MenuIcon } from "../images/svg-components/MenuIcon";
import UserDefaultImg from "../images/user-default.png";
import { useSelector } from "react-redux";

export default function Layout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(250))[0];

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: 250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const {
    user: { id, profileImage },
  } = useSelector((state) => state.auth);

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.primary },
          headerLeft: () => (
            <View>
              <TouchableOpacity onPress={() => console.log("LogoIconLeft")}>
                <LogoIcon width={35} height={35} pathFill={colors.green} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View>
              {id && (
                <TouchableOpacity
                  onPress={() => console.log("UserDefaultIcon")}
                >
                  <Image
                    source={profileImage ?? UserDefaultImg}
                    style={{ width: 35, height: 35, marginRight: 15 }}
                  />
                </TouchableOpacity>
              )}

              <View>
                <TouchableOpacity onPress={toggleMenu}>
                  <MenuIcon width={40} height={40} pathFill={colors.green} />
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
      {menuVisible && (
        <Animated.View
          style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}
        >
          <Link href="/login" onPress={toggleMenu} asChild>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Login</Text>
            </Pressable>
          </Link>
          <Link href="/register" onPress={toggleMenu} asChild>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Register</Text>
            </Pressable>
          </Link>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "sticky", // No hay equivalente directo en RN, manejar con otros estilos si es necesario
    top: 0, // No hay equivalente directo en RN
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary,
    zIndex: 3,
  },
  logoIcon: {
    height: 40, // 2.5rem aproximadamente
    cursor: "pointer",
    fill: colors.green, // Necesitarás ajustar el SVG manualmente
  },
  userDefaultIcon: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 50,
    cursor: "pointer",
  },
  wrapperMenuIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    height: 40,
    cursor: "pointer",
    fill: colors.green, // Necesitarás ajustar el SVG manualmente
  },
  dropdownWrapper: {
    position: "absolute",
    top: 60,
    right: 0,
    width: 200,
    backgroundColor: colors.green,
    overflow: "hidden", // Manejando la animación con RN Animated
  },
  listItem: {
    display: "flex",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  listItemText: {
    color: colors.primary,
  },
  separator: {
    width: "100%",
    opacity: 0.4,
    borderTopWidth: 2,
    borderTopColor: colors.greyDark,
  },
  wrapperSelectLanguage: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  languageOption: {
    marginHorizontal: 7,
    paddingVertical: 3,
    paddingHorizontal: 7,
    color: colors.primary,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  languageOptionSelected: {
    borderColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "80%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menu: {
    position: "absolute",
    top: 90,
    right: 0,
    width: 250,
    height: "100%",
    backgroundColor: colors.green,
    padding: 20,
    zIndex: 10,
  },
  menuItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  menuText: {
    padding: 10,
    color: colors.primary,
    fontSize: 18,
    borderWidth: 1,
    borderColor: colors.primary,
    textAlign: "center",
  },
});

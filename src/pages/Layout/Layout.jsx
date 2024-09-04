// DEPENDENCIES
import { useEffect, useState } from "react";
import { Stack, Link, useRouter } from "expo-router";
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Animated,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "utils/stylesUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

// REDUX
import { setUser, logout } from "store/slices/authSlice";

// IMAGES
import { LogoIcon } from "images/svg-components/LogoIcon";
import { MenuIcon } from "images/svg-components/MenuIcon";
import UserDefaultImg from "images/user-default.png";
import LanguageImg from "images/language.png";

// STYLED
import styles from "./Layout.styled";

// UTILS
import { getTokenLocalStorage } from "utils/apiUtils";

// FUNCTION
const Layout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(250))[0];

  const logoutAction = async () => {
    try {
      await dispatch(logout()).unwrap();
      toggleMenu();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleOutsidePress = () => {
    if (menuVisible) {
      toggleMenu();
    }
  };

  const {
    user: { id, profileImage, token },
  } = useSelector((state) => state.auth);

  const tokenLocal = async () => {
    const token = await getTokenLocalStorage();
    return token;
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (await tokenLocal()) {
        await dispatch(setUser(await tokenLocal())).unwrap();
      }
    };

    fetchUser();
  }, [dispatch, token]);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
    toggleMenu();
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.primary },
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable style={styles.menuItem}>
                <LogoIcon width={35} height={35} pathFill={colors.green} />
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {id && (
                <Pressable onPress={() => router.push(`/profile/${id}`)}>
                  <Image
                    source={
                      profileImage
                        ? {
                            uri: profileImage,
                            cache: "reload",
                          }
                        : UserDefaultImg
                    }
                    style={{
                      width: 35,
                      height: 35,
                      marginRight: 15,
                      borderRadius: 20,
                    }}
                  />
                </Pressable>
              )}

              <View>
                <Pressable onPress={toggleMenu}>
                  <MenuIcon width={40} height={40} pathFill={colors.green} />
                </Pressable>
              </View>
            </View>
          ),
        }}
      />
      {menuVisible && (
        <Pressable onPress={handleOutsidePress} style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}
          >
            <View style={styles.wrapperSelectLanguage}>
              <Image
                source={LanguageImg}
                style={{
                  width: 35,
                  height: 35,
                }}
              />
              <Pressable
                onPress={() => changeLanguage("es")}
                style={[
                  styles.languageOption,
                  currentLanguage === "es" && styles.languageOptionSelected,
                ]}
              >
                <Text style={styles.languageOptionText}>ES</Text>
              </Pressable>
              <Pressable
                onPress={() => changeLanguage("en-US")}
                style={[
                  styles.languageOption,
                  currentLanguage === "en-US" && styles.languageOptionSelected,
                ]}
              >
                <Text style={styles.languageOptionText}>EN</Text>
              </Pressable>
            </View>

            {id ? (
              <>
                <Link
                  href="/suggestions"
                  style={styles.suggestionsLink}
                  onPress={toggleMenu}
                >
                  {t("HeaderMenu.Suggestions")}
                </Link>
                <Pressable onPress={logoutAction} style={styles.menuItem}>
                  <Text style={styles.menuText}>{t("HeaderMenu.Logout")}</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable
                  onPress={() => {
                    toggleMenu();
                    router.push("/login");
                  }}
                  style={styles.menuItem}
                >
                  <Text style={styles.menuText}>Login</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    toggleMenu();
                    router.push("/register");
                  }}
                  style={styles.menuItem}
                >
                  <Text style={styles.menuText}>Register</Text>
                </Pressable>
              </>
            )}
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
};

export default Layout;

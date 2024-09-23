// DEPENDENCIES
import { Text, View, ScrollView } from "react-native";
import { Link, Stack } from "expo-router";
import { colors } from "utils/stylesUtil";
import { useTranslation } from "react-i18next";

// COMPONENTS
import LoginForm from "./components/LoginForm";
// import GoogleAuthButton from "components/GoogleAuthButton/GoogleAuthButton";

// STYLES
import styles from "./Login.styled";

// FUNCTION
const Login = () => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colors.green },
          headerTintColor: colors.primary,
          headerLeft: () => {},
          headerRight: () => {},
          headerTitle: "Log in",
        }}
      />
      <View style={styles.wrapper}>
        <Text style={[styles.textColor, styles.title]}>{t("Login.Title")}</Text>
        <Text style={[styles.textColor, styles.subtitle, { marginBottom: 40 }]}>
          {t("Login.Subtitle")}
        </Text>
        {/* <Text style={[styles.textColor, styles.LogIn]}>
          {t("Login.Separator1")}
        </Text> */}
        {/* <GoogleAuthButton /> */}
        {/* <Text style={[styles.textColor, styles.LogIn]}>
          {t("Login.Separator2")}
        </Text> */}
        <LoginForm />
        <Text style={[styles.textColor, { fontSize: 18 }]}>
          {t("Login.NoRegisterYet")}
          <Link href="/register" style={styles.forgotPassword}>
            <Text style={{ color: colors.green }}> {t("Login.Signup")} </Text>
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;

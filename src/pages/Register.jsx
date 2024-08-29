// DEPENDENCIES
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Link, Stack } from "expo-router";
import { colors } from "myracketpartner-commons";
import { useTranslation } from "react-i18next";

// COMPONENTS
import RegisterForm from "components/RegisterForm";
import GoogleAuthButton from "components/GoogleAuthButton";

// FUNCTION
const Register = () => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colors.green },
          headerTintColor: colors.primary,
          headerLeft: () => {},
          headerRight: () => {},
          headerTitle: "Sign up",
        }}
      />
      <View style={styles.wrapper}>
        <Text style={[styles.textColor, styles.title]}>
          {t("Register.Title")}
        </Text>
        <Text style={[styles.textColor, styles.subtitle]}>
          {t("Register.Subtitle")}
        </Text>
        <Text style={[styles.textColor, styles.Register]}>
          {t("Register.Separator1")}
        </Text>
        <GoogleAuthButton />
        <Text style={[styles.textColor, styles.Register]}>
          {t("Register.Separator2")}
        </Text>
        <RegisterForm />
        <Text style={[styles.textColor, { fontSize: 18 }]}>
          {t("Register.haveAccount")}{" "}
          <Link href="/login" style={styles.forgotPassword}>
            <Text style={{ color: colors.green }}>
              {" "}
              {t("Register.Signin")}{" "}
            </Text>
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
};

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
  Register: {
    fontSize: 18,
    marginVertical: 30,
  },
});

export default Register;

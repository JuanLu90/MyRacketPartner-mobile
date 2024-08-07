import { StyleSheet, Text, View } from "react-native";
import LoginForm from "./LoginForm";
import { colors } from "myracketpartner-commons";
import GoogleAuthButton from "../GoogleAuthButton";
import { Link } from "expo-router";

const Login = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.textColor, styles.title]}>Welcome Back</Text>
      <Text style={[styles.textColor, styles.subtitle]}>
        Log into your account
      </Text>
      <Text style={[styles.textColor, styles.LogIn]}>Log in with</Text>
      <GoogleAuthButton />
      <Text style={[styles.textColor, styles.LogIn]}>or</Text>
      <LoginForm />
      <Text style={[styles.textColor, { fontSize: 18 }]}>
        Are you not registered yet?
        <Link href="/register" style={styles.forgotPassword}>
          <Text style={{ color: colors.green }}> Sign up</Text>
        </Link>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { alignItems: "center" },
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

export default Login;

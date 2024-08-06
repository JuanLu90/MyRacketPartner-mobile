import { Text, View } from "react-native";
import LoginForm from "./LoginForm";
import { colors } from "myracketpartner-commons";

const Login = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.textColor, styles.title]}>Welcome Back</Text>
      <Text style={[styles.textColor, styles.subtitle]}>
        Log into your account
      </Text>
      <LoginForm />
      <Text style={[styles.textColor, { fontSize: 18 }]}>
        Are you not registered yet?
        <Text style={{ color: colors.green }}> Sign up</Text>
      </Text>
    </View>
  );
};

const styles = {
  wrapper: { alignItems: "center" },
  textColor: {
    color: colors.white,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 7,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.greyLight,
  },
};

export default Login;

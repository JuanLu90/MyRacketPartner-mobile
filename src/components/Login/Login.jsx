import { Text, View } from "react-native";
import LoginForm from "./LoginForm";
import { colors } from "myracketpartner-commons";

const Login = () => {
  return (
    <View>
      <Text style={styles.textColor}>Welcome Back</Text>
      <Text style={styles.textColor}>Log into your account</Text>
      <LoginForm />
      <Text style={styles.textColor}>Are you not registered yet?</Text>
    </View>
  );
};

const styles = {
  textColor: {
    color: colors.white,
  },
};

export default Login;

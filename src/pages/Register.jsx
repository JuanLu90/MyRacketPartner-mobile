// DEPENDENCIES
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Link, Stack } from "expo-router";
import { colors } from "myracketpartner-commons";

// COMPONENTS
import RegisterForm from "../components/RegisterForm";
import GoogleAuthButton from "../components/GoogleAuthButton";

// FUNCTION
const Register = () => {
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
        <Text style={[styles.textColor, styles.title]}>Welcome</Text>
        <Text style={[styles.textColor, styles.subtitle]}>
          Insert your info
        </Text>
        <Text style={[styles.textColor, styles.Register]}>Log in with</Text>
        <GoogleAuthButton />
        <Text style={[styles.textColor, styles.Register]}>or</Text>
        <RegisterForm />
        <Text style={[styles.textColor, { fontSize: 18 }]}>
          Do you already have an account?
          <Link href="/login" style={styles.forgotPassword}>
            <Text style={{ color: colors.green }}> Sign in</Text>
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

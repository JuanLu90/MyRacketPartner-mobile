import { Link } from "expo-router";
import { colors } from "myracketpartner-commons";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from "react-native";

const LoginForm = () => {
  const [text, onChangeText] = useState("");
  const [number, onChangeNumber] = useState("");

  const { width } = Dimensions.get("window");
  return (
    <View>
      <TextInput
        style={[styles.input, { width: width - 65, marginBottom: 27 }]}
        onChangeText={onChangeText}
        value={text}
        placeholder="Email"
        placeholderTextColor={colors.greyDark}
      />
      <TextInput
        style={[styles.input, { width: width - 65, marginBottom: 15 }]}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Password"
        placeholderTextColor={colors.greyDark}
        secureTextEntry={true}
      />
      <Link href="/" style={styles.forgotPassword}>
        <Text style={styles.textForgotPassword}>I forgot my password</Text>
      </Link>
      <Pressable
        onPress={() => alert("Botón presionado")}
        style={styles.sendButton}
      >
        <Text style={styles.textSenfButton}>Send</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 40,
    height: 45,
    paddingHorizontal: 10,
    color: colors.white,
    borderColor: colors.greyDark,
    borderWidth: 1,
  },
  sendButton: {
    marginHorizontal: "auto",
    marginBottom: 80,
    marginTop: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.green,
  },
  textSenfButton: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  forgotPassword: {
    marginLeft: "auto",
  },
  textForgotPassword: {
    margin: "auto",
    fontSize: 18,
    color: colors.green,
  },
});

export default LoginForm;

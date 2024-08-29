// DEPENDENCIES
import { useState } from "react";
import { colors } from "myracketpartner-commons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// REDUX
import { loginAction, registerAction } from "store/slices/authSlice";

// UTILS
import { validateEmail, validatePassword } from "utils/validationUtil";

// FUNCTION
const RegisterForm = () => {
  const { t } = useTranslation();

  const initialRegisterInfo = {
    userName: "",
    email: "",
    // email: email ?? "",
    password: "",
    confirmPassword: "",
    userRole: "Admin",
  };

  const [registerInfo, setRegisterInfo] = useState(initialRegisterInfo);
  const [errorState, setErrorState] = useState({});

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const validateRegister = () => {
    const { userName, email, password, confirmPassword } = registerInfo;
    const errors = {};

    if (!userName) errors.userName = "Username is required";

    if (!email) errors.email = "Email is required.";
    else if (!validateEmail(email))
      errors.email = "Enter a valid email address.";

    if (!password) errors.password = "Password is required";
    else if (!validatePassword(password))
      errors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and between 6 and 12 characters.";

    if (!confirmPassword)
      errors.confirmPassword = "Confirm password is required";
    else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrorState(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (value, name) => {
    setRegisterInfo((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    if (!validateRegister()) return;
    try {
      const response = await dispatch(
        registerAction({ user: registerInfo }),
      ).unwrap();

      // await dispatch(
      //   toastAction({ message: response, type: "SUCCESS" })
      // ).unwrap();

      // if (tournamentUrl) {
      //   navigate(`/tournament/${tournamentUrl}`);
      // }
      const credentials = {
        email: registerInfo.email,
        password: registerInfo.password,
      };
      await dispatch(loginAction(credentials)).unwrap();
      navigation.navigate("index");
    } catch (error) {
      console.log(error);
      if (error?.errorCode === "01") {
        setErrorState({ email: "Email already exists" });
      } else if (error?.errorCode === "02") {
        setErrorState({ userName: "Username already exists" });
      }
      // await dispatch(toastAction(error)).unwrap();
    }
  };

  const { width } = Dimensions.get("window");

  const generalWidth = width - 65;

  return (
    <View style={{ maxWidth: generalWidth }}>
      <View>
        <TextInput
          style={[
            styles.input,
            {
              width: generalWidth,
              borderColor: errorState.email ? colors.orange : colors.greyDark,
            },
          ]}
          onChangeText={(value) => handleChange(value, "userName")}
          value={registerInfo.userName}
          placeholder={t("Register.Username")}
          placeholderTextColor={colors.greyDark}
        />
        {errorState.userName ? (
          <Text style={styles.errorLabel}>{errorState.userName}</Text>
        ) : null}
      </View>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={[
            styles.input,
            {
              width: generalWidth,
              borderColor: errorState.password
                ? colors.orange
                : colors.greyDark,
            },
          ]}
          onChangeText={(value) => handleChange(value, "email")}
          value={registerInfo.email}
          placeholder={t("Register.Email")}
          placeholderTextColor={colors.greyDark}
        />
        {errorState.email ? (
          <Text style={styles.errorLabel}>{errorState.email}</Text>
        ) : null}
      </View>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={[
            styles.input,
            {
              width: generalWidth,
              borderColor: errorState.password
                ? colors.orange
                : colors.greyDark,
            },
          ]}
          onChangeText={(value) => handleChange(value, "password")}
          value={registerInfo.password}
          placeholder={t("Register.Password")}
          placeholderTextColor={colors.greyDark}
          secureTextEntry={true}
        />
        {errorState.password ? (
          <Text style={styles.errorLabel}>{errorState.password}</Text>
        ) : null}
      </View>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={[
            styles.input,
            {
              width: generalWidth,
              borderColor: errorState.password
                ? colors.orange
                : colors.greyDark,
            },
          ]}
          onChangeText={(value) => handleChange(value, "confirmPassword")}
          value={registerInfo.confirmPassword}
          placeholder={t("Register.ConfirmPassword")}
          placeholderTextColor={colors.greyDark}
          secureTextEntry={true}
        />
        {errorState.confirmPassword ? (
          <Text style={styles.errorLabel}>{errorState.confirmPassword}</Text>
        ) : null}
      </View>
      <Pressable onPress={onSubmit} style={styles.sendButton}>
        <Text style={styles.textSenfButton}>{t("Register.SendButton")}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 40,
    height: 45,
    marginBottom: 6,
    paddingHorizontal: 10,
    color: colors.white,
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
    marginTop: 15,
  },
  textForgotPassword: {
    margin: "auto",
    fontSize: 18,
    color: colors.green,
  },
  errorLabel: {
    fontSize: 17,
    color: colors.orange,
  },
});

export default RegisterForm;

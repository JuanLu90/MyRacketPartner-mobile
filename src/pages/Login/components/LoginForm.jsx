// DEPENDENCIES
import { useState } from "react";
import { Link } from "expo-router";
import { colors } from "utils/stylesUtil";
import { Pressable, Text, View, TextInput, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// REDUX
import { loginAction } from "store/slices/authSlice";

// UTILS
import { validateEmail, validatePassword } from "utils/validationUtil";

// STYLES
import styles from "./LoginForm.styled";

// FUNCTION
const LoginForm = () => {
  const initialCredentials = {
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(initialCredentials);
  const [errorState, setErrorState] = useState({});

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validateLogin = () => {
    const { email, password } = credentials;
    const errors = {};

    if (!email) errors.email = t("Login.Validations.NoEmail");
    else if (!validateEmail(email))
      errors.email = t("Login.Validations.InvalidEmail");

    if (!password) errors.password = t("Login.Validations.NoPassword");
    else if (!validatePassword(password))
      errors.password = t("Login.Validations.InvalidPassword");

    setErrorState(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (value, name) => {
    setCredentials((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    if (!validateLogin()) return;

    try {
      await dispatch(loginAction(credentials)).unwrap();
      navigation.navigate("index");
    } catch (error) {
      console.log(error);
      alert(error.message);
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
          onChangeText={(value) => handleChange(value, "email")}
          value={credentials.email}
          placeholder={t("Login.Email")}
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
          value={credentials.password}
          placeholder={t("Login.Password")}
          placeholderTextColor={colors.greyDark}
          secureTextEntry={true}
        />
        {errorState.password ? (
          <Text style={styles.errorLabel}>{errorState.password}</Text>
        ) : null}
      </View>
      <Link href="/" style={styles.forgotPassword}>
        <Text style={styles.textForgotPassword}>
          {t("Login.ForgotPassword")}
        </Text>
      </Link>
      <Pressable onPress={onSubmit} style={styles.sendButton}>
        <Text style={styles.textSenfButton}>{t("Login.SendButton")}</Text>
      </Pressable>
    </View>
  );
};

export default LoginForm;

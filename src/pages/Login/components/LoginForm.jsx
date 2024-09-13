// DEPENDENCIES
import { Link, useNavigation } from "expo-router";
import { Pressable, Text, View, TextInput, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// REDUX
import { loginAction } from "store/slices/authSlice";

// HOOKS
import useFormValidation from "hooks/useFormValidation";

// STYLES
import styles from "./LoginForm.styled";

// UTILS
import { colors } from "utils/stylesUtil";
import { validateLogin } from "utils/validationUtil";

// FUNCTION
const LoginForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialCredentials = {
    email: "",
    password: "",
  };

  const { formState, errors, handleChange, handleValidation } =
    useFormValidation(initialCredentials, validateLogin);

  const onSubmit = async () => {
    const isValid = handleValidation();
    if (!isValid) return;

    try {
      await dispatch(loginAction(formState)).unwrap();
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
              borderColor: errors.email ? colors.orange : colors.greyDark,
            },
          ]}
          onChangeText={(value) => handleChange(value, "email")}
          value={formState.email}
          placeholder={t("Login.Email")}
          placeholderTextColor={colors.greyDark}
        />
        {errors.email ? (
          <Text style={styles.errorLabel}>{errors.email}</Text>
        ) : null}
      </View>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={[
            styles.input,
            {
              width: generalWidth,
              borderColor: errors.password ? colors.orange : colors.greyDark,
            },
          ]}
          onChangeText={(value) => handleChange(value, "password")}
          value={formState.password}
          placeholder={t("Login.Password")}
          placeholderTextColor={colors.greyDark}
          secureTextEntry={true}
        />
        {errors.password ? (
          <Text style={styles.errorLabel}>{errors.password}</Text>
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

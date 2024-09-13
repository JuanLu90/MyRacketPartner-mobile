// DEPENDENCIES
import { Pressable, Text, View, TextInput, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";

// REDUX
import { loginAction, registerAction } from "store/slices/authSlice";

// HOOKS
import useFormValidation from "hooks/useFormValidation";

// STYLES
import styles from "./RegisterForm.styled";

// UTILS
import { colors } from "utils/stylesUtil";
import { validateRegister } from "utils/validationUtil";

// FUNCTION
const RegisterForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialRegisterInfo = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { formState, errors, handleChange, handleValidation } =
    useFormValidation(initialRegisterInfo, validateRegister);

  const onSubmit = async () => {
    const isValid = handleValidation();
    if (!isValid) return;

    try {
      await dispatch(registerAction({ user: formState })).unwrap();
      // await dispatch(
      //   toastAction({ message: response, type: "SUCCESS" })
      // ).unwrap();

      const credentials = {
        email: formState.email,
        password: formState.password,
      };
      await dispatch(loginAction(credentials)).unwrap();
      navigation.navigate("index");
    } catch (error) {
      console.log(error);
      // if (error?.errorCode === "01") {
      //   setErrorState({ email: "Email already exists" });
      // } else if (error?.errorCode === "02") {
      //   setErrorState({ userName: "Username already exists" });
      // }
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
              borderColor: errors.email ? colors.orange : colors.greyDark,
            },
          ]}
          onChangeText={(value) => handleChange(value, "userName")}
          value={formState.userName}
          placeholder={t("Register.Username")}
          placeholderTextColor={colors.greyDark}
        />
        {errors.userName ? (
          <Text style={styles.errorLabel}>{errors.userName}</Text>
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
          onChangeText={(value) => handleChange(value, "email")}
          value={formState.email}
          placeholder={t("Register.Email")}
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
          placeholder={t("Register.Password")}
          placeholderTextColor={colors.greyDark}
          secureTextEntry={true}
        />
        {errors.password ? (
          <Text style={styles.errorLabel}>{errors.password}</Text>
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
          onChangeText={(value) => handleChange(value, "confirmPassword")}
          value={formState.confirmPassword}
          placeholder={t("Register.ConfirmPassword")}
          placeholderTextColor={colors.greyDark}
          secureTextEntry={true}
        />
        {errors.confirmPassword ? (
          <Text style={styles.errorLabel}>{errors.confirmPassword}</Text>
        ) : null}
      </View>
      <Pressable onPress={onSubmit} style={styles.sendButton}>
        <Text style={styles.textSenfButton}>{t("Register.SendButton")}</Text>
      </Pressable>
    </View>
  );
};
export default RegisterForm;

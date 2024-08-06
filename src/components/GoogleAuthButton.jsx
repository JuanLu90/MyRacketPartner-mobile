import React from "react";
import { View, Button, Text } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { authGoogleAction } from "../redux/slices/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Envía la credencial a la acción de Redux
      const response = await dispatch(
        authGoogleAction(userInfo.idToken),
      ).unwrap();
      console.log("Usuario logueado:", response);
      navigation.navigate("index"); // O navega a donde necesites
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Inicio de sesión cancelado");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Inicio de sesión en progreso");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Servicios de Google Play no disponibles");
      } else {
        console.log("Error desconocido", error);
      }
    }
  };

  return <Button title="Sign in with Google" onPress={signIn} />;
};

export default LoginForm;

import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { authGoogleAction } from "../redux/slices/authSlice";
import GoogleIcon from "../images/svg-components/GoogleIcon";

const GoogleAuthButton = () => {
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

  return (
    <Pressable style={styles.button} onPress={signIn}>
      <View style={styles.contentWrapper}>
        <View style={styles.iconWrapper}>
          <GoogleIcon />
        </View>
        <Text style={styles.contents}>Sign in with Google</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f2f2f2",
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  contents: {
    fontSize: 14,
    fontWeight: "500",
  },
});
export default GoogleAuthButton;

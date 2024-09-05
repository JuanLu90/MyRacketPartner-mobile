// DEPENDENCIES
import { Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";

// REDUX
import { authGoogleAction } from "store/slices/authSlice";

// STYLES
import styles from "./GoogleAuthButton.styled";

// IMAGES
import GoogleIcon from "images/svg-components/GoogleIcon";

// FUNCTION
const GoogleAuthButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Envía la credencial a la acción de Redux
      await dispatch(authGoogleAction(userInfo.idToken)).unwrap();
      // console.log("Usuario logueado:", response);
      navigation.navigate("index");
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

export default GoogleAuthButton;

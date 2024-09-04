// DEPENDENCES
import { View, Text, Image, Linking, Pressable } from "react-native";

// IMAGES
import FBIcon from "images/facebook.png";
import IGIcon from "images/instagram.png";
import PaypalIcon from "images/donate-paypal.png";

// STYLED
import styles from "./Footer.styled";

// FUNCTION
const Footer = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperRRSS}>
        <Image style={styles.rrssImage} source={FBIcon} />
        <Image style={styles.rrssImage} source={IGIcon} />
      </View>
      <View style={styles.links}>
        <Text style={styles.linkText}>© 2023 MyRacketPartner </Text>
        <Text style={styles.linkText}>Avisos Legales</Text>
        <Text style={styles.linkText}>Política de cookies</Text>
        <Text style={styles.linkText}>Política de privacidad</Text>
      </View>
      <View style={styles.separator} />
      <Text style={styles.footerText}>
        MyRacketPartner es una aplicación totalmente gratuita. Si te gusta y
        quieres apoyar el proyecto, puedes hacerlo mediante PayPal.
        {"\n\n"}
        Todas las contribuciones se destinan a cubrir gastos fijos como hosting,
        dominio, entre otros. ¡Gracias!
      </Text>
      <Pressable
        onPress={() =>
          Linking.openURL("https://www.paypal.com/paypalme/jlmorenocalderon")
        }
      >
        <Image style={styles.donatePaypalImage} source={PaypalIcon} />
      </Pressable>
    </View>
  );
};

export default Footer;

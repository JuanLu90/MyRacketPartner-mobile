// DEPENDENCES
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  Pressable,
} from "react-native";
import { colors } from "myracketpartner-commons";

// IMAGES
import FBIcon from "images/facebook.png";
import IGIcon from "images/instagram.png";
import PaypalIcon from "images/donate-paypal.png";

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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.orange,
    color: "black",
    textAlign: "center",
  },
  logoIcon: {
    width: 300,
    height: 100,
    marginVertical: 10,
  },
  wrapperRRSS: {
    flexDirection: "row",
    marginVertical: 20,
  },
  rrssImage: {
    width: 30,
    height: 30,
    marginHorizontal: 15,
  },
  links: {
    flexDirection: "column",
    marginBottom: 20,
    alignItems: "center",
  },
  linkText: {
    margin: 3,
    color: "black",
  },
  separator: {
    width: "100%",
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    marginVertical: 20,
  },
  donatePaypalImage: {
    width: 170,
    height: 50,
    marginTop: 10,
  },
  footerText: {
    marginTop: 25,
    color: "black",
    textAlign: "center",
  },
});

export default Footer;

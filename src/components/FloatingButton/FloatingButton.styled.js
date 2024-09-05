import { StyleSheet } from "react-native";
import { colors } from "utils/stylesUtil";

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 70,
    height: 70,
    padding: 12,
    backgroundColor: colors.green, // Usa colors.green si está disponible
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Añade una sombra para destacar el botón en Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default styles;

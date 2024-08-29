// DEPENDENCIES
import { StyleSheet, View } from "react-native";
import { colors } from "myracketpartner-commons";

// REDUX
import { useSelector } from "react-redux";

// COMPONENTS
import Loading from "components/Loading";

// FUNCTION
const Screen = ({ children }) => {
  const isLoading = useSelector((state) => state.loading);

  return (
    <View style={styles.wrapper}>
      {children}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Loading />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.green,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingVertical: 10,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente para oscurecer el contenido debajo
  },
});

export default Screen;

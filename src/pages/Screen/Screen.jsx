// DEPENDENCIES
import { View } from "react-native";

// REDUX
import { useSelector } from "react-redux";

// COMPONENTS
import Loading from "components/Loading/Loading";

// STYLES
import styles from "./Screen.styled";

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

export default Screen;

// DEPENDENCIES
import { View, ActivityIndicator } from "react-native";

// STYLES
import styles from "./Loading.styled";

// UTILS
import { colors } from "utils/stylesUtil";

// FUNCTION
const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.green} />
    </View>
  );
};

export default Loading;

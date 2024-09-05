// DEPENDENCIES
import { Pressable } from "react-native";

// STYLES
import styles from "./FloatingButton.styled";

// IMAGES
import PlusIcon from "images/svg-components/PlusIcon";

// UTILS
import { colors } from "utils/stylesUtil";

// FUNCTION
const FloatingButton = ({ action }) => {
  return (
    <Pressable onPress={action} style={styles.button}>
      <PlusIcon pathFill={colors.primary} />
    </Pressable>
  );
};

export default FloatingButton;

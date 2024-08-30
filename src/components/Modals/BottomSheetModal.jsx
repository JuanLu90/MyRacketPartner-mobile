// DEPENDENCIES
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Pressable,
  Image,
} from "react-native";

// UTILS
import { colors } from "utils/stylesUtil";

// IMAGES
import closeIcon from "images/close.png";

// FUNCTION
const BottomSheetModal = ({
  isOpen,
  closeModal,
  children,
  title,
  onSubmit,
  setErrorState,
  setState,
  hideButtons,
}) => {
  const [modalVisible, setModalVisible] = useState(isOpen);
  const animation = new Animated.Value(0);

  useEffect(() => {
    if (isOpen) {
      setModalVisible(true);
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
      setState?.({});
      setErrorState?.({});
    }
  }, [isOpen, setState, setErrorState]);

  const modalTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // Ajusta el valor según el tamaño del modal
  });

  return (
    <Modal
      transparent
      visible={modalVisible}
      onRequestClose={closeModal}
      animationType="none"
    >
      <Pressable style={styles.overlay} onPress={closeModal} />
      <Animated.View
        style={[
          styles.modalBackground,
          { transform: [{ translateY: modalTranslateY }] },
        ]}
      >
        <Pressable style={styles.closeIcon} onPress={closeModal}>
          <Image source={closeIcon} style={{ width: 25, height: 25 }} />
        </Pressable>
        {title && <Text style={styles.title}>{title}</Text>}
        <View style={styles.children}>{children}</View>
        {!hideButtons && (
          <View style={styles.buttons}>
            {/* <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.sendButton} onPress={onSubmit}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    minHeight: 250,
    zIndex: 2,
  },
  closeIcon: {
    position: "absolute",
    top: -15,
    right: 30,
    backgroundColor: colors.primary,
    borderColor: colors.orange,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    zIndex: 3,
  },
  title: {
    marginBottom: 20,
    fontSize: 35,
    fontWeight: "bold",
    color: colors.white,
  },
  children: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderColor: colors.greyLight,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default BottomSheetModal;

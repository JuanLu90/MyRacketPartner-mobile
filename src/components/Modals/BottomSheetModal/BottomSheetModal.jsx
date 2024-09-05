// DEPENDENCIES
import { useEffect, useState } from "react";
import { View, Text, Animated, Modal, Pressable, Image } from "react-native";

// STYLES
import styles from "./BottomSheetModal.styled";

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
            {/* <Pressable style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable> */}
            <Pressable style={styles.sendButton} onPress={onSubmit}>
              <Text style={styles.buttonText}>Send</Text>
            </Pressable>
          </View>
        )}
      </Animated.View>
    </Modal>
  );
};

export default BottomSheetModal;

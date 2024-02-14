import React from "react";
import { Text, StyleSheet } from "react-native";
import { Modal, Button } from "native-base";
import { colors } from "@/app/colors";
import { useColorScheme } from "nativewind";
type ModalDescriptionProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  activeDescription: string;
};
const ModalDescription = ({
  showModal,
  setShowModal,
  activeDescription,
}: ModalDescriptionProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
      <Modal.Content maxWidth="80%" maxHeight="90%" {...styles["modal"]}>
        <Modal.CloseButton />
        <Modal.Header>Descrição</Modal.Header>
        <Modal.Body>
          <Text className="text-justify text-light-text dark:text-dark-text">
            {activeDescription}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
            _text={{ color: colors[colorScheme].text2 }}
            bg={colors[colorScheme].primaria}
            _pressed={{ bg: "" }}
            flex="1"
            onPress={() => {
              setShowModal(false);
            }}
          >
            Continue
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    marginBottom: "auto",
    marginTop: 5,
  },
});
export default ModalDescription;

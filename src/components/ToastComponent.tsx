import React from 'react';
import {
  Text,
  HStack,
  IconButton,
  CloseIcon,
  Alert,
  VStack,
} from "native-base";

export interface ToastOptions {
  id: number;
  status: "success" | "error" | "info" | "warning";
  description: string;
  duration: number
}

const ToastComponent = ({id, status, description, duration}: ToastOptions) => {

  return (
    <Alert w="100%" key={id} status={status}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {description}
            </Text>
          </HStack>
          <IconButton
          className="-mt-1"
            /* onPress={() => toast.close(id)} */
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" />}
            _icon={{
              color: "coolGray.600",
            }}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};

export default ToastComponent;

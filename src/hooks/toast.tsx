import React from "react";
import {
  useToast,
  Box,
  Text,
  HStack,
  IconButton,
  CloseIcon,
  Alert,
  Stack,
  VStack,
} from "native-base";

interface ToastOptions {
  id: number;
  status?: "success" | "error" | "info" | "warning";
  description?: string;
}

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (options: ToastOptions) => {
    const {
      id = 0,
      status = "info",
      description = "Description",
    } = options;
    if (!toast.isActive(id)) {
      toast.show({
        render: () => {
          return <CustomToast
          id={id}
          status={status}
          description={description}
        />
        },
        placement: "top-right"
      });
    }
    
  };

  const CustomToast: React.FC<{
    id: number;
    status: "success" | "error" | "info" | "warning";
    description: string;
  }> = ({ id, status, description }) => (
    <Alert w="100%" status={status}>
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
            onPress={() => toast.close(id)}
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

  return { showToast };
};

export default useCustomToast;

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CircularProgress,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import useCartContext from "hooks/useCartContext";

interface ChangeMenuModalProps {
  // children: any;
  isOpen: boolean;
  onClose: VoidFunction;
  doAction: VoidFunction;
}

export default function ChangeMenuModal({
  isOpen,
  doAction,
  onClose,
}: ChangeMenuModalProps) {
  const router = useRouter();
  const cartContext = useCartContext();
  const changeMenu = async () => {
    await cartContext.SetNewCart(null);
    doAction();
    onClose();
  };
  return (
    <>
      {/* <Box onClick={cartContext.cart.totalItem > 0 ? onOpen : doAction}>
        {children}
      </Box> */}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"md"}
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />

        <ModalContent fontFamily={"coorder"}>
          <ModalCloseButton />
          <ModalHeader fontSize="3xl">Lưu ý</ModalHeader>
          <ModalBody pb={6}>
            <Alert status="error">
              <AlertIcon />
              <Text fontSize="xl">
                Thay đổi menu sẽ xóa giỏ hàng hiện tại của bạn
              </Text>
            </Alert>
          </ModalBody>

          <ModalFooter width={"100%"} justifyContent={"space-between"} gap={5}>
            <Button width={"50%"} onClick={onClose}>
              Hủy
            </Button>
            <Button
              bgColor={"primary.main"}
              color="light"
              width={"50%"}
              onClick={changeMenu}
            >
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

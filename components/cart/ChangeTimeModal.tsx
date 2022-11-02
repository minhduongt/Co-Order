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

interface ChangeTimeModalProps {
  children: any;
}

export default function ChangeTimeModal({ children }: ChangeTimeModalProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const cartContext = useCartContext();
  const changeTime = async () => {
    await cartContext.SetNewCart(null);
    cartContext.onClose();
    document.documentElement.scrollTop = 0;
  };
  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

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
                Thay đổi khung giờ sẽ xóa giỏ hàng hiện tại của bạn
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
              onClick={changeTime}
            >
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

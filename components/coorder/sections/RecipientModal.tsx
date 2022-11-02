import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Flex,
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
import { TRecipient } from "types/order";

interface RecipientModalProps {
  children: any;
  recipients: TRecipient[];
}

export default function RecipientModal({
  children,
  recipients,
}: RecipientModalProps) {
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
          <ModalHeader fontSize="3xl">
            <Text fontSize="2xl">Chia hóa đơn</Text>
          </ModalHeader>
          <ModalBody pb={6}>
            <Container bg="gray.200" p={3}>
              <Flex flexDirection="column" fontSize={"xl"} gap={2}>
                {recipients.map((rep, index) => {
                  return (
                    <Flex key={rep.customerCode} flexDirection="column" gap={2}>
                      <Flex alignItems={"center"}>
                        <Text minW="50%">{rep.customerCode}</Text>
                        <Divider borderColor="black" />
                      </Flex>

                      <Flex justifyContent={"space-between"}>
                        <Flex flexDirection="column">
                          <Text>Tạm tính:</Text>
                          <Text>Phí giao hàng:</Text>
                          <Text>Giảm giá:</Text>
                          <Text fontSize={"2xl"}>Tổng cộng:</Text>
                        </Flex>
                        <Flex
                          flexDirection="column"
                          alignItems={"flex-end"}
                          fontWeight="semibold"
                        >
                          <Text>{rep.totalAmount.toLocaleString()} đ</Text>
                          <Text>{rep.shippingFee.toLocaleString()} đ</Text>
                          <Text>{rep.discount.toLocaleString()} đ</Text>
                          <Text>{rep.finalAmount.toLocaleString()} đ</Text>
                        </Flex>
                      </Flex>
                      {index != recipients.length - 1 ? (
                        <Divider my={2} borderColor="black" />
                      ) : (
                        <></>
                      )}
                    </Flex>
                  );
                })}
              </Flex>
            </Container>
          </ModalBody>

          <ModalFooter width={"100%"} justifyContent={"space-between"} gap={5}>
            <Button width={"100%"} onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CircularProgress,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { PostResponse } from "types/request";
import { OrderResponse } from "types/cart";
import { ErrorResponse } from "types/response";
import useCartContext from "hooks/useCartContext";
import oopsBean from "../../public/assets/image/beanoops.png";
import ridingBean from "../../public/assets/image/beanriding.png";
import { BiTime } from "react-icons/bi";
import { useRouter } from "next/router";
import { IoLocationOutline } from "react-icons/io5";
interface CheckoutModalNotifyProps {
  children: any;
  checkoutRes: PostResponse<OrderResponse> | undefined;
  errorRes?: ErrorResponse;
  receivedDestination: string;
  open: boolean;
  onClose: VoidFunction;
}

export default function CheckoutNotifyModal({
  children,
  checkoutRes,
  errorRes,
  receivedDestination,
  open,
  onClose,
}: CheckoutModalNotifyProps) {
  const router = useRouter();
  const cartContext = useCartContext();

  const finish = async () => {
    await cartContext.SetNewCart(null);
    cartContext.onClose();
    document.documentElement.scrollTop = 0;
  };
  return (
    <>
      <Box>{children}</Box>

      <Modal
        isOpen={open}
        onClose={onClose}
        size={"md"}
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />

        <ModalContent fontFamily={"beanoi"} textAlign="center">
          {errorRes && (
            <>
              <ModalCloseButton />
              <ModalHeader fontSize="3xl">Oops!</ModalHeader>
              <ModalBody pb={6}>
                <Image loading="lazy" alt="oops bean" src={oopsBean.src} />
                <Alert status="error" justifyContent={"center"}>
                  <AlertIcon />
                  <Text fontSize="2xl">
                    <Text fontSize="2xl">
                      {/* Có chút trục trặc rồi, bạn hãy thử lại sau nhé */}
                      {errorRes.message}
                    </Text>
                  </Text>
                </Alert>
              </ModalBody>
            </>
          )}
          {checkoutRes ? (
            <>
              <ModalHeader fontSize="3xl"></ModalHeader>
              <ModalBody pb={6}>
                <Flex flexDirection={"column"} fontSize="2xl">
                  <Alert status="success" justifyContent={"space-between"}>
                    <Flex alignItems={"center"}>
                      <AlertIcon />
                      <Text fontWeight={"semibold"} color="secondary.main">
                        {/* {"Mã đơn của bạn là " + checkoutRes.data.invoice_id} */}
                        {checkoutRes.data.invoice_id}
                      </Text>
                    </Flex>

                    <Button
                      fontSize={"xl"}
                      bgColor="secondary.main"
                      color="light"
                      onClick={() =>
                        router.push(
                          "https://www.facebook.com/messages/t/103238875095890"
                        )
                      }
                    >
                      Liên hệ hỗ trợ
                    </Button>
                  </Alert>
                  <Text py="1rem" fontWeight={"bold"}>
                    {"Bạn sẽ nhận đơn của mình:"}
                  </Text>
                  <Box border="solid" p={2} borderColor="secondary.main">
                    <Flex
                      textAlign="left"
                      alignItems={"center"}
                      py="1rem"
                      justifyContent="space-between"
                    >
                      <Flex gap={2}>
                        <BiTime size={"2.2rem"} color="green" />
                        <Text>{"Vào lúc:"}</Text>
                      </Flex>

                      <Text fontWeight={"bold"}>
                        {checkoutRes.message.substring(33)}
                      </Text>
                    </Flex>
                    <Flex
                      alignItems={"center"}
                      py="1rem"
                      justifyContent="space-between"
                    >
                      <Flex gap={2}>
                        <IoLocationOutline size={"2.2rem"} color="green" />
                        <Text>{"Tại:"}</Text>
                      </Flex>

                      <Text fontWeight={"bold"}> {receivedDestination} </Text>
                    </Flex>
                  </Box>
                </Flex>

                <Image
                  loading="lazy"
                  alt="riding bean"
                  src={ridingBean.src}
                  w="50%"
                  h="50%"
                  mx="auto"
                />
              </ModalBody>
            </>
          ) : (
            !errorRes && (
              <>
                <ModalCloseButton />
                <ModalHeader fontSize="3xl">
                  <CircularProgress isIndeterminate />
                </ModalHeader>
                <ModalBody pb={6} textAlign="center">
                  <Alert status="info" justifyContent={"center"}>
                    <AlertIcon />
                    <Text fontSize="2xl">Đang xử lý...</Text>
                  </Alert>
                </ModalBody>
              </>
            )
          )}

          {checkoutRes && (
            <ModalFooter width={"100%"} justifyContent={"center"}>
              <Button
                bgColor={"primary.main"}
                color="light"
                width={"50%"}
                onClick={finish}
              >
                Xong
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

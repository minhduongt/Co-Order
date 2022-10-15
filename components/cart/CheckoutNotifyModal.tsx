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
import { TLocation } from "types/location";
interface CheckoutModalNotifyProps {
  children: any;
  checkoutRes: PostResponse<OrderResponse> | undefined;
  errorRes?: ErrorResponse;
  receivedDestination: TLocation;
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
        size={"lg"}
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
                {/* <Image loading="lazy" alt="oops bean" src={oopsBean.src} /> */}
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
                    <Flex alignItems={"center"} gap={3}>
                      <Flex alignItems={"center"}>
                        <AlertIcon />
                        <Text textAlign={"left"}>{"Mã đơn của bạn là: "}</Text>
                      </Flex>

                      <Text
                        textAlign={"right"}
                        fontWeight={"semibold"}
                        color="secondary.main"
                      >
                        {checkoutRes?.data.orderCode}
                      </Text>
                    </Flex>

                    {/* <Button
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
                    </Button> */}
                  </Alert>
                  <Text py="1rem" fontWeight={"bold"}>
                    Bạn vui lòng nhận đơn:
                  </Text>
                  <Box border="solid" p={2} borderColor="secondary.main">
                    <Flex
                      textAlign="left"
                      alignItems={"center"}
                      py="1rem"
                      justifyContent="space-between"
                    >
                      <Flex gap={2} alignItems="center">
                        <BiTime size={"2.2rem"} color="green" />
                        <Text minW="6rem">Vào lúc:</Text>
                      </Flex>

                      <Text fontWeight={"bold"} textAlign="right">
                        {checkoutRes.data.endTime.toString().slice(11, 19)}
                      </Text>
                    </Flex>
                    <Flex
                      alignItems={"center"}
                      py="1rem"
                      justifyContent="space-between"
                    >
                      <Flex gap={2}>
                        <IoLocationOutline size={"2.2rem"} color="green" />
                        <Text>Tại:</Text>
                      </Flex>

                      <Text fontWeight={"bold"}>
                        {checkoutRes?.data.location.name}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>

                {/* <Image
                  loading="lazy"
                  alt="riding bean"
                  src={ridingBean.src}
                  w="50%"
                  h="50%"
                  mx="auto"
                /> */}
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

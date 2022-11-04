import React from "react";
import {
  Badge,
  Box,
  Button,
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import MenuList from "../components/menu/MenuList";
import MainHeader from "components/nav";
import MainFooter from "components/foot";
import AuthCheck from "components/authentication/AuthCheck";
import useOrderHistories from "hooks/order/useOrderHistory";
import useUserContext from "hooks/useUserContext";
import { getOrderStatus, OrderStatusEnum, OrderTypeEnum } from "types/constant";
import useOrderPartyHistories from "hooks/order/userOrderPartyHistory";
import { TOrder, TOrderDetail } from "types/order";
import orderApi from "api/order";

const OrderPartyHistoryPage = () => {
  const { accessToken } = useUserContext();
  const [orderStatus, setOrderStatus] = useState<OrderStatusEnum | null>(
    OrderStatusEnum.PENDING
  );
  const [selectedOrder, setSelectedOrder] = useState<TOrderDetail | null>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data: partyOrders,
    isLoading: partyOrderLoading,
    refetch,
  } = useOrderPartyHistories({
    accessToken,
    params: {
      status: orderStatus,
    },
  });
  console.log("orders", partyOrders);

  async function handelOpenOrderDetail(orderId: number, accessToken: string) {
    const res = await orderApi.getOrderDetail(orderId, accessToken);
    setSelectedOrder(res);
  }

  function onCompleteOrder(orderId: number, status: OrderStatusEnum) {
    orderApi.completeOrder(orderId, accessToken!, status).then((res) => {
      console.log(res);
      onClose();
      refetch();
      toast({
        title: `Cập nhật thành công`,
        status: "success",
        position: "top-right",
        isClosable: true,
        duration: 1000,
      });
    });
  }
  return (
    <Box fontFamily="coorder">
      <AuthCheck>
        <MainHeader />
        <Tabs
          size="lg"
          align="center"
          variant="soft-rounded"
          colorScheme="teal"
          defaultIndex={0}
        >
          <TabList>
            <Tab onClick={() => setOrderStatus(OrderStatusEnum.PENDING)}>
              Chờ xác nhận
            </Tab>
            <Tab onClick={() => setOrderStatus(OrderStatusEnum.WAITING)}>
              Đang giao
            </Tab>
            <Tab onClick={() => setOrderStatus(OrderStatusEnum.FINISHED)}>
              Hoàn thành
            </Tab>
            <Tab onClick={() => setOrderStatus(OrderStatusEnum.CANCELED)}>
              Đã hủy
            </Tab>
          </TabList>

          <Box w="100%" p={4}>
            {partyOrders == null || partyOrders.length == 0 ? (
              <Text mb={500} fontSize={"2xl"}>
                Không có đơn hàng nào
              </Text>
            ) : (
              partyOrders.map((order) => (
                <Box
                  onClick={() => {
                    handelOpenOrderDetail(order.id, accessToken!);
                    onOpen();
                  }}
                  p={4}
                  mt={4}
                  gap={1}
                  borderWidth="2px"
                  borderRadius="lg"
                  borderColor={"teal.400"}
                  overflow="hidden"
                  key={order.id}
                >
                  <Flex
                    w="100%"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text color="black">{order.orderCode}</Text>
                    <Badge
                      size="lg"
                      colorScheme={
                        order.status == OrderStatusEnum.FINISHED
                          ? "green"
                          : order.status == OrderStatusEnum.CANCELED
                          ? "red"
                          : order.status == OrderStatusEnum.WAITING
                          ? "blue"
                          : "yellow"
                      }
                    >
                      {getOrderStatus(order.status)}
                    </Badge>
                  </Flex>
                  <Flex
                    mt={4}
                    w="100%"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text color="black">
                      {order.createdDate.toString().replace("T", " ")}
                    </Text>
                    <Text color="black">{order.finalAmount} đ</Text>
                  </Flex>
                </Box>
              ))
            )}
          </Box>
        </Tabs>
        <Modal
          size="2xl"
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Chi tiết đơn hàng</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Container maxWidth="6xl" paddingRight={"1rem"}>
                <Flex w="100%" flexDirection={"column"}>
                  <Flex w="100%" fontSize={"lg"} alignContent="space-between">
                    <Flex w="50%" flexDirection={"row"} fontSize={"lg"}>
                      <Text>Mã đơn:</Text>
                      <Text ml={4}>{selectedOrder?.orderCode}</Text>
                    </Flex>
                    <Flex w="50%" flexDirection={"row"} fontSize={"lg"}>
                      <Text textAlign="left">Trạng thái: </Text>
                      <Badge
                        ml={4}
                        colorScheme={
                          selectedOrder?.status == OrderStatusEnum.FINISHED
                            ? "green"
                            : selectedOrder?.status == OrderStatusEnum.CANCELED
                            ? "red"
                            : selectedOrder?.status == OrderStatusEnum.PENDING
                            ? "yellow"
                            : "blue"
                        }
                      >
                        {getOrderStatus(selectedOrder?.status!)}
                      </Badge>
                    </Flex>
                  </Flex>

                  <Flex w="100%" fontSize={"lg"} alignContent="space-between">
                    <Text textAlign="left" w="30%">
                      Điểm giao:
                    </Text>
                    <Text textAlign="right" w="70%">
                      {selectedOrder?.receiveAddress}
                    </Text>
                  </Flex>
                  <Flex w="100%" fontSize={"lg"} alignContent="space-between">
                    <Text textAlign="left" w="30%">
                      Thời gian giao:
                    </Text>
                    <Text textAlign="right" w="70%">
                      {selectedOrder?.receiveTime}
                    </Text>
                  </Flex>
                </Flex>

                <Text fontWeight={"semibold"} mt={4} fontSize={"md"}>
                  Danh sách Sản phẩm
                </Text>
                <Divider />
                {selectedOrder?.details.map((item, index) => (
                  <Box w="100%" key={index}>
                    <Flex w="100%" flexDir="row">
                      <Text textAlign="left" w="60%" fontSize={"md"}>
                        {item.productName}
                      </Text>
                      <Text w="10%" fontSize={"md"}>
                        {" "}
                        X {item.quantity}
                      </Text>
                      <Text textAlign="right" w="30%" fontSize={"md"}>
                        {item.unitPrice} đ
                      </Text>
                    </Flex>
                    <Divider />
                  </Box>
                ))}
                <Text fontWeight={"semibold"} mt={4} fontSize={"lg"}>
                  Ghi chú
                </Text>
                <Divider />
                <Text textAlign="left" w="50%" fontSize={"md"}>
                  {selectedOrder?.notes}
                </Text>
                <Text fontWeight={"semibold"} mt={4} fontSize={"lg"}>
                  Thành tiền
                </Text>
                <Divider />
                <Flex w="100%" flexDirection={"column"}>
                  <Flex w="100%" flexDir="row">
                    <Text textAlign="left" w="50%" fontSize={"md"}>
                      Tạm tính
                    </Text>
                    <Divider />
                    <Text textAlign="right" w="50%" fontSize={"md"}>
                      {selectedOrder?.totalAmount} đ
                    </Text>
                  </Flex>
                  <Divider />
                  <Flex w="100%" flexDir="row">
                    <Text textAlign="left" w="50%" fontSize={"md"}>
                      Giảm giá
                    </Text>
                    <Text textAlign="right" w="50%" fontSize={"md"}>
                      - {selectedOrder?.discount} đ
                    </Text>
                  </Flex>
                  <Divider />
                  <Flex w="100%" flexDir="row">
                    <Text textAlign="left" w="50%" fontSize={"md"}>
                      Phí dịch vụ
                    </Text>
                    <Text textAlign="right" w="50%" fontSize={"md"}>
                      + 5000 đ
                    </Text>
                  </Flex>
                  <Divider />
                  <Flex w="100%" flexDir="row">
                    <Text textAlign="left" w="50%" fontSize={"md"}>
                      Tổng cộng
                    </Text>
                    <Text
                      fontWeight={"semibold"}
                      textAlign="right"
                      w="50%"
                      fontSize={"md"}
                    >
                      {selectedOrder?.finalAmount} đ
                    </Text>
                  </Flex>
                  <Divider />
                </Flex>
              </Container>
            </ModalBody>

            <ModalFooter>
              {(selectedOrder?.status == OrderStatusEnum.WAITING ||
                selectedOrder?.status == OrderStatusEnum.PENDING) && (
                <Button
                  onClick={() =>
                    onCompleteOrder(selectedOrder!.id, OrderStatusEnum.CANCELED)
                  }
                  colorScheme="red"
                  mr={10}
                >
                  Huỷ đơn
                </Button>
              )}
              {selectedOrder?.status == OrderStatusEnum.WAITING && (
                <Button
                  onClick={() =>
                    onCompleteOrder(selectedOrder!.id, OrderStatusEnum.FINISHED)
                  }
                  colorScheme="teal"
                  mr={3}
                >
                  Hoàn thành đơn
                </Button>
              )}

              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <MainFooter />
      </AuthCheck>
    </Box>
  );
};

export default OrderPartyHistoryPage;

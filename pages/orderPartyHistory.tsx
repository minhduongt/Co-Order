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
    OrderStatusEnum.WAITING
  );
  const [selectedOrder, setSelectedOrder] = useState<TOrderDetail | null>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: partyOrders, isLoading: partyOrderLoading } =
    useOrderPartyHistories({
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
            {partyOrders?.map((order) => (
              <Box
                onClick={() => {
                  handelOpenOrderDetail(order.id, accessToken!);
                  onOpen();
                }}
                p={4}
                mt={4}
                gap={2}
                borderWidth="4px"
                borderRadius="lg"
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
                        : order.status == OrderStatusEnum.PENDING
                        ? "yellow"
                        : "blue"
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
            ))}
          </Box>
        </Tabs>
        <Modal
          size="xl"
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
                <Flex flexDirection={"column"}>
                  <Flex fontSize={"xl"}>
                    <Text>Mã đơn: {selectedOrder?.orderCode}</Text>
                  </Flex>
                  <Flex fontSize={"xl"}>
                    <Text>
                      Trạng thái:{" "}
                      {selectedOrder?.status == OrderStatusEnum.WAITING
                        ? "Đang xử lý"
                        : selectedOrder?.status == OrderStatusEnum.FINISHED
                        ? "Hoàn thành"
                        : "Đã hủy"}
                    </Text>
                  </Flex>
                  <Flex fontSize={"xl"}>
                    <Text>Điểm giao: {selectedOrder?.receiveAddress}</Text>
                  </Flex>
                </Flex>

                <Text mt={4} fontSize={"xl"}>
                  {" "}
                  Sản phẩm
                </Text>
                <Divider />
                {selectedOrder?.details?.map((item, index) => (
                  <Box w="100%" key={index}>
                    <Flex w="100%" flexDir="row">
                      <Text textAlign="left" w="60%" fontSize={"lg"}>
                        {item.productName}
                      </Text>
                      <Text w="10%" fontSize={"lg"}>
                        {" "}
                        X {item.quantity}
                      </Text>
                      <Text textAlign="right" w="30%" fontSize={"lg"}>
                        {item.unitPrice} đ
                      </Text>
                    </Flex>
                    <Divider />
                  </Box>
                ))}
              </Container>
            </ModalBody>

            <ModalFooter>
              {/* <Button
                onClick={() => onCompleteOrder(selectedOrder!.id)}
                colorScheme="blue"
                mr={3}
              >
                Hoàn thành
              </Button> */}
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

import React from "react";
import {
  Badge,
  Box,
  Button,
  Container,
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
  Tag,
  Text,
  useDisclosure,
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
import { TOrder } from "types/order";
import Cart from "components/cart";
import orderApi from "api/order";

const OrderHistoryPage = () => {
  const { accessToken } = useUserContext();
  const [orderStatus, setOrderStatus] = useState<OrderStatusEnum | null>(
    OrderStatusEnum.WAITING
  );
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const { data: orders, isLoading: orderLoading } = useOrderHistories({
    accessToken,
    params: {
      status: orderStatus,
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  function onCompleteOrder(orderId: number) {
    orderApi.completeOrder(orderId).then((res) => {
      console.log(res);
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
            <Tab onClick={() => setOrderStatus(OrderStatusEnum.WAITING)}>
              Đơn hàng mới
            </Tab>
            <Tab onClick={() => setOrderStatus(OrderStatusEnum.FINISHED)}>
              Hoàn thành
            </Tab>
            <Tab onClick={() => setOrderStatus(OrderStatusEnum.CANCELED)}>
              Đã hủy
            </Tab>
          </TabList>
          <Box w="100%" p={4}>
            {orders?.map((order) => (
              <Box
                onClick={() => {
                  setSelectedOrder(order);
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
            ))}
          </Box>
        </Tabs>

        <Modal
          size="full               "
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
                      {selectedOrder?.status == "WAITING"
                        ? "Đang chờ"
                        : "Hoàn thành"}
                    </Text>
                  </Flex>
                  <Flex fontSize={"xl"}>
                    <Text>Điểm giao: {selectedOrder?.location.name}</Text>
                  </Flex>
                </Flex>
                {/* <Cart /> */}
              </Container>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => onCompleteOrder(selectedOrder!.id)}
                colorScheme="blue"
                mr={3}
              >
                Hoàn thành
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <MainFooter />
      </AuthCheck>
    </Box>
  );
};

export default OrderHistoryPage;

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
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import orderApi from "api/order";
import AuthCheck from "components/authentication/AuthCheck";
import MainFooter from "components/foot";
import MainHeader from "components/nav";
import ProductCard from "components/product/ProductCard";
import useOrderHistories from "hooks/order/useOrderHistory";
import useUserContext from "hooks/useUserContext";
import { useState } from "react";
import { getOrderStatus, OrderStatusEnum } from "types/constant";
import { TOrder } from "types/order";

const OrderHistoryPage = () => {
  const { accessToken } = useUserContext();
  const toast = useToast();
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
      onClose();
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
                    <Text>Điểm giao: {selectedOrder?.location.name}</Text>
                  </Flex>
                </Flex>

                <Text mt={4} fontSize={"xl"}>
                  {" "}
                  Sản phẩm
                </Text>
                <Divider />
                {selectedOrder?.orderDetails.map((item, index) => (
                  <Box w="100%" key={index}>
                    <Flex w="100%" flexDir="row">
                      <Text textAlign="left" w="60%" fontSize={"lg"}>
                        {item.productInMenu.product.name}
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
              {selectedOrder?.status == OrderStatusEnum.WAITING && (
                <Button
                  onClick={() => onCompleteOrder(selectedOrder!.id)}
                  colorScheme="blue"
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

export default OrderHistoryPage;

import React from "react";
import {
  Badge,
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
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

const OrderPartyHistoryPage = () => {
  const { accessToken } = useUserContext();
  const [orderStatus, setOrderStatus] = useState<OrderStatusEnum | null>(null);
  const { data: partyOrders, isLoading: partyOrderLoading } =
    useOrderPartyHistories({
      accessToken,
      params: {
        status: orderStatus,
      },
    });
  console.log("orders", partyOrders);
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
            {partyOrders?.map((order) => (
              <Box
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

        <MainFooter />
      </AuthCheck>
    </Box>
  );
};

export default OrderPartyHistoryPage;

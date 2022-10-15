import React from "react";
import {
  Box,
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
import { OrderStatusEnum, OrderTypeEnum } from "types/constant";

const OrderHistoryPage = () => {
  const { accessToken } = useUserContext();
  const [orderType, setOrderType] = useState<OrderTypeEnum | null>(null);
  const [orderStatus, setOrderStatus] = useState<OrderStatusEnum | null>(null);
  const { data: orders, isLoading: orderLoading } = useOrderHistories({
    accessToken,
    params: {
      type: orderType,
      status: orderStatus,
    },
  });
  console.log("orders", orders);
  return (
    <Box fontFamily="coorder">
      <AuthCheck>
        <MainHeader />
        <Tabs size="lg" align="center" variant="enclosed">
          <TabList>
            <Tab onClick={() => setOrderType(OrderTypeEnum.NORMAL)}>
              Đơn hàng của tôi
            </Tab>
            <Tab onClick={() => setOrderType(OrderTypeEnum.PARTY)}>
              Đơn hàng nhóm
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Tabs size="lg" align="center" variant="solid-rounded">
                <TabList>
                  <Tab>Đang thực hiện</Tab>
                  <Tab>Hoàn Thành</Tab>
                  <Tab>Đã hủy</Tab>
                </TabList>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Tabs size="lg" align="center" variant="solid-rounded">
                <TabList>
                  <Tab>Đang thực hiện</Tab>
                  <Tab>Hoàn Thành</Tab>
                  <Tab>Đã hủy</Tab>
                </TabList>
              </Tabs>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box w="100%" p={4}>
          {orders?.map((order) => (
            <Box
              p={4}
              mt={4}
              gap={2}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              key={order.id}
            >
              <Text color="black">{order.orderCode}</Text>
              <Text color="black">{order.status}</Text>
              <Text color="black">{order.finalAmount} đ</Text>
              <Text color="black">{order.createdDate}</Text>
              <Text color="black">{order.type}</Text>
            </Box>
          ))}
        </Box>
        <MainFooter />
      </AuthCheck>
    </Box>
  );
};

export default OrderHistoryPage;

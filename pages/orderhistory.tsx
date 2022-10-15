import React from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import MenuList from "../components/menu/MenuList";
import MainHeader from "components/nav";
import MainFooter from "components/foot";
import AuthCheck from "components/authentication/AuthCheck";
import useOrderHistories from "hooks/order/useOrderHistory";
import useUserContext from "hooks/useUserContext";

const OrderHistoryPage = () => {
  const { accessToken } = useUserContext();
  const { data: order, isLoading: orderLoading } = useOrderHistories({
    accessToken,
  });
  return (
    <Box fontFamily="coorder">
      <AuthCheck>
        <MainHeader />
        <Tabs size="lg" align="center" variant="enclosed">
          <TabList>
            <Tab>Đơn hàng của tôi</Tab>
            <Tab>Đơn hàng nhóm</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Tabs size="lg" align="center" variant="solid-rounded">
                <TabList>
                  <Tab>Đang thực hiện</Tab>
                  <Tab>Hoàn Thành</Tab>
                  <Tab>Đã hủy</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <p>one!</p>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                  <TabPanel>
                    <p>three!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Tabs size="lg" align="center" variant="solid-rounded">
                <TabList>
                  <Tab>Đang thực hiện</Tab>
                  <Tab>Hoàn Thành</Tab>
                  <Tab>Đã hủy</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <p>one!</p>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                  <TabPanel>
                    <p>three!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <MainFooter />
      </AuthCheck>
    </Box>
  );
};

export default OrderHistoryPage;

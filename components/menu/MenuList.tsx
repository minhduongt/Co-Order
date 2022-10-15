import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Select,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
//images and icons
//components
import CartDrawer from "../cart/CartDrawer";
import CategoryProduct from "./StoreProducts";
import MenuOffline from "./MenuOffline";
import CategoryCarousel from "components/carousel/CategoryCarousel";
//hooks
import useStores from "hooks/store/useStores";
import { FormProvider, useForm } from "react-hook-form";
import TextCarousel from "components/carousel/TextCarousel";
import useStoreSuppliers from "hooks/store/useStoreSuppliers";
import MenuFooter from "./MenuFooter";
import CollectionProducts from "./CollectionProducts";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import ScrollToTop from "components/sections/ScrollToTop";
import useStoreProducts from "hooks/store/useStoreProducts";
import SupplierProducts from "./SuppliersProduct";
import useCartContext from "hooks/useCartContext";
import MenuHeader from "./MenuHeader";
import { FaShippingFast } from "react-icons/fa";
import useMenus from "hooks/menu/useMenus";
import useAreas from "hooks/area/useAreas";
import { TArea } from "types/area";
import { TMenu } from "types/menu";
import useAreaContext from "hooks/useAreaContext";

interface filterCate {
  category_id: number;
  category_name: string;
}

const weekday = [
  { name: "Thứ Hai", value: 1 },
  { name: "Thứ Ba", value: 2 },
  { name: "Thứ Tư", value: 3 },
  { name: "Thứ Năm", value: 4 },
  { name: "Thứ Sáu", value: 5 },
  { name: "Thứ Bảy", value: 6 },
  { name: "Chủ nhật", value: 0 },
];

const renderer = ({ hours, minutes, seconds, completed, formatted }: any) => {
  if (completed) {
    // Render a complete state
    return <Text fontSize={"2xl"}>Khung giờ này đã đóng</Text>;
  } else {
    // Render a countdown
    return (
      <Flex alignItems={"center"} gap={2}>
        <Text>{"Hết giờ chốt còn: "}</Text>
        <Flex gap={1} textAlign="center">
          <Text w="3rem" bg="secondary.main" p={1} borderRadius={10}>
            {hours < 10 ? "0" + hours : hours}
          </Text>
          :
          <Text w="3rem" bg="secondary.main" p={1} borderRadius={10}>
            {minutes < 10 ? "0" + minutes : minutes}
          </Text>
          :
          <Text w="3rem" bg="secondary.main" p={1} borderRadius={10}>
            {seconds < 10 ? "0" + seconds : seconds}
          </Text>
        </Flex>
      </Flex>
    );
  }
};

const currentDate = new Date();

const MenuList = () => {
  //hooks
  const [filterCate, setFilterCate] = useState<number | null>(null);
  const [filterMenu, setFilterMenu] = useState<number | null>(null);
  const cartContext = useCartContext();
  const menuForm = useForm({});
  //apis
  const { data: areas, isLoading: areaLoading } = useAreas();
  const { selectedArea, SetSelectedArea } = useAreaContext();
  const { data: menus, isLoading: menuLoading } = useMenus(
    selectedArea?.id ?? 1
  );

  const { data: suppliers, isLoading: supLoading } = useStoreSuppliers({
    id: 150,
  });

  //variables
  const { register, watch } = menuForm;
  const defautTabIndex = currentDate.getDay() - 1;
  console.log("menu", menus);

  return (
    <Box
      overflow={"clip"}
      w={"100%"}
      justifyContent="center"
      zIndex={2}
      py="2rem"
      // borderLeft="groove"
      // borderLeftWidth={"10px"}
      // borderLeftColor="primary.main"
      // borderRight="groove"
      // borderRightWidth={"10px"}
      // borderRightColor="primary.main"
    >
      <ScrollToTop smooth color="primary.main" width={"3rem"} />
      <Tabs defaultIndex={defautTabIndex >= 0 ? defautTabIndex : 0}>
        <TabPanels>
          {weekday.map((day) =>
            day.value == currentDate.getDay() ? (
              <TabPanel key={day.value} padding={"0"}></TabPanel>
            ) : (
              <TabPanel>
                <MenuOffline />
              </TabPanel>
            )
          )}
        </TabPanels>
        <TabPanels>
          {weekday.map((day) =>
            day.value == currentDate.getDay() ? (
              <TabPanel key={day.value} padding={"0"}></TabPanel>
            ) : (
              <TabPanel>
                <MenuOffline />
              </TabPanel>
            )
          )}
        </TabPanels>
        <TabPanels>
          {weekday.map((day) =>
            day.value == currentDate.getDay() ? (
              <TabPanel key={day.value} padding={"0"}></TabPanel>
            ) : (
              <TabPanel>
                <MenuOffline />
              </TabPanel>
            )
          )}
        </TabPanels>
      </Tabs>
      <FormProvider {...menuForm}>
        <FormControl>
          <Flex
            pl={{ xs: "1rem", md: "3.2rem", xl: "7vw" }}
            justifyContent={"space-between"}
            alignItems="center"
            maxW="100vw"
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Flex
              fontWeight={"semibold"}
              fontSize={"2xl"}
              display={"flex"}
              alignContent="center"
            >
              <FaShippingFast size={"2.5rem"} color="#38A169" />
              Danh sách thực đơn
            </Flex>
          </Flex>
          <Tabs variant="enclosed">
            <TabList>
              {menus &&
                menus.map((menu: TMenu) => (
                  <Box key={menu.id}>
                    <Tab sx={{ width: 200 }}>{menu.name}</Tab>
                  </Box>
                ))}
            </TabList>
            <TabPanels>
              {menus &&
                menus.map((menu: TMenu) => (
                  <Box key={menu.id}>
                    <TabPanel>
                      {menu.name}
                      <CategoryCarousel setFilterCate={setFilterCate} />
                    </TabPanel>
                  </Box>
                ))}
            </TabPanels>
          </Tabs>
          <CategoryCarousel setFilterCate={setFilterCate} />
        </FormControl>
      </FormProvider>
      <Box px="1rem" pt="5rem">
        <CategoryProduct
          setFilterCate={setFilterCate}
          filterCate={filterCate}
        />
      </Box>
      {/* <CollectionProducts />
      <SupplierProducts /> */}
    </Box>
  );
};

export default MenuList;

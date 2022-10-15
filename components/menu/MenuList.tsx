import {
  Box,
  Divider,
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
import CategoryProduct from "./CategoryProduct";
import MenuOffline from "./MenuOffline";
import CategoryCarousel from "components/carousel/CategoryCarousel";
//hooks
import useStores from "hooks/store/useStores";
import { FormProvider, useForm } from "react-hook-form";
import TextCarousel from "components/carousel/TextCarousel";
import useAreaSuppliers from "hooks/store/useStoreSuppliers";
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
import { TCategory } from "types/category";

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
  const [filterCate, setFilterCate] = useState<TCategory | null>(null);

  const cartContext = useCartContext();
  const menuForm = useForm({});
  //apis
  const { data: areas, isLoading: areaLoading } = useAreas();
  const {
    selectedArea,
    SetSelectedMenu,
    SetSelectedArea,
    selectedLocation,
    SetSelectedLocation,
  } = useAreaContext();
  const { data: menus, isLoading: menuLoading } = useMenus(
    selectedArea?.id ?? 1
  );
  const [filterMenu, setFilterMenu] = useState<TMenu | null>(null);

  const sortMenus = menus?.sort((a, b) => a.displayOrder - b.displayOrder);
  console.log("sortMenus", sortMenus);
  //variables
  const { register, watch } = menuForm;
  const defautTabIndex = currentDate.getDay() - 1;
  const timeRange = watch("time-range") && watch("time-range");
  const timeRangeArr = timeRange && timeRange.split("-");
  let countDownDateTime =
    timeRangeArr &&
    new Date(currentDate.toISOString().substring(0, 11) + timeRangeArr[1]);
  //Get arrived time range from order time range for displaying
  // useEffect(() => {
  //   if (timeRangeArr)
  //     stores?.map((store) =>
  //       store.time_slots.map((slot) => {
  //         if (slot.from == timeRangeArr[0])
  //           setArrivedTimeRange(
  //             slot.arrive_time_range[0] + "-" + slot.arrive_time_range[1]
  //           );
  //       })
  //     );
  // }, [timeRangeArr]);

  //Delete all item in cart when change time range

  useEffect(() => {
    if (filterMenu == null && menus) {
      setFilterMenu(menus[0]);
      SetSelectedMenu(menus[0]);
    }
  }, [filterMenu, menus]);

  return (
    <Box
      p={4}
      overflow={"clip"}
      w={"100%"}
      justifyContent="center"
      // borderLeft="groove"
      // borderLeftWidth={"10px"}
      // borderLeftColor="primary.main"
      // borderRight="groove"
      // borderRightWidth={"10px"}
      // borderRightColor="primary.main"
    >
      <ScrollToTop smooth color="primary.main" width={"3rem"} />
      {/* <Tabs defaultIndex={defautTabIndex >= 0 ? defautTabIndex : 0}>
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
      </Tabs> */}

      <Tabs colorScheme="teal" size="lg" align="center" variant="solid-rounded">
        <TabList>
          {menus &&
            menus.map((menu: TMenu) => (
              <Box key={menu.id}>
                <Tab
                  sx={{ minW: "10rem" }}
                  onClick={() => {
                    SetSelectedMenu(menu);
                    setFilterMenu(menu);
                    setFilterCate(null);
                  }}
                >
                  {menu.name}
                </Tab>
              </Box>
            ))}
        </TabList>
        <Divider sx={{ borderWidth: "3px", marginY: "1rem", opacity: 1 }} />
        <Flex>
          <CategoryCarousel setFilterCate={setFilterCate} />
        </Flex>

        <Box px="1rem" pt="5rem">
          <CategoryProduct
            filterMenu={filterMenu}
            setFilterCate={setFilterCate}
            filterCate={filterCate}
          />
        </Box>
      </Tabs>
      {/* 
      <CollectionProducts /> */}
      {/* <SupplierProducts /> */}
    </Box>
  );
};

export default MenuList;

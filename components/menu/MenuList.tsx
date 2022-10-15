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
import StoreProducts from "./StoreProducts";
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
  const [filterCate, setFilterCate] = useState<filterCate>();
  const cartContext = useCartContext();
  const menuForm = useForm({});
  //apis
  const { data: menu, isLoading: menuLoading } = useMenus();
  const { data: suppliers, isLoading: supLoading } = useStoreSuppliers({
    id: 150,
  });
  //states
  const [isCartDisable, setIsCartDisable] = useState(false);
  const [arrivedTimeRange, setArrivedTimeRange] = useState("");
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
      </Tabs> */}
      {/* <FormProvider {...menuForm}>
        <FormControl>
          <Flex
            pl={{ xs: "1rem", md: "3.2rem", xl: "7vw" }}
            justifyContent={"space-between"}
            alignItems="center"
            maxW="100vw"
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Box>
              <FormLabel
                fontWeight={"semibold"}
                fontSize={"2xl"}
                display={"flex"}
                gap={2}
              >
                <FaShippingFast size={"2.5rem"} color="#38A169" />
                Giờ giao hàng:
              </FormLabel>
              {stores ? (
                stores.map((store) => (
                  <Box key={store.id}>
                    <Select
                      borderColor="dark"
                      focusBorderColor="primary.main"
                      size={"lg"}
                      w={{ xs: "90vw", md: "40vw", xl: "30vw" }}
                      height={{ xs: "4rem", xl: "5rem" }}
                      fontSize="xl"
                      {...register("time-range")}
                    >
                      {store.time_slots.map((slot, index) => (
                        // slot.available == true &&
                        <option key={index} value={slot.from + "-" + slot.to}>
                          {slot.arrive_time_range[0] +
                            " - " +
                            slot.arrive_time_range[1]}
                        </option>
                      ))}
                    </Select>
                    {!timeRangeArr && (
                      <Text fontSize={"xl"} color="error">
                        Hiện không có khung giờ nào hoạt động
                      </Text>
                    )}
                    <Flex fontSize={"xl"} py="1rem" gap={2}>
                      {timeRangeArr && (
                        <Countdown
                          daysInHours={true}
                          date={countDownDateTime}
                          renderer={renderer}
                        />
                      )}
                    </Flex>
                  </Box>
                ))
              ) : (
                <Skeleton w={"30vw"} h="4rem" />
              )}
            </Box>
          </Flex>
          <CategoryCarousel setFilterCate={setFilterCate} />
        </FormControl>
      </FormProvider> */}
      {/* <Box px="1rem" pt="5rem">
        {!filterCate ? (
          <>
            <CollectionProducts time_slot={timeRangeArr} />
            {timeRangeArr &&
              suppliers?.map((sup) => (
                <SupplierProducts
                  key={sup.id}
                  time_slot={timeRangeArr}
                  supplier={sup}
                />
              ))}
          </>
        ) : (
          <StoreProducts
            setFilterCate={setFilterCate}
            time_slot={timeRangeArr}
            filterCate={filterCate}
          />
        )}
      </Box> */}
      <CollectionProducts />
      <SupplierProducts />
    </Box>
  );
};

export default MenuList;

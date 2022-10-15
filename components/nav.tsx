//hooks
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Select,
  Image,
  MenuGroup,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import CartDrawer from "./cart/CartDrawer";
import { useRouter } from "next/router";
import useAuthContext from "hooks/useAuthContext";
import { logOut } from "../firebase/authentication";
import useAreas from "hooks/area/useAreas";

import logo from "../public/assets/image/logofinal.png";
import useLocalStorage from "hooks/useLocalStorage";
import useAreaContext from "hooks/useAreaContext";

const Links = [
  { name: "Trang chủ", href: "/" },
  { name: "Đơn chung", href: "/coorder" },
];

const NavLink: any = () => {
  const router = useRouter();
  const pathname = router.pathname;
  return Links.map((link) => (
    <NextLink key={link.name} href={link.href} passHref>
      <Link
        color={{
          xs:
            pathname == link.href ||
            (pathname.includes(link.href) && link.href != "/")
              ? "secondary.main"
              : "light",
          lg:
            pathname == link.href ||
            (pathname.includes(link.href) && link.href != "/")
              ? "primary.main"
              : "gray.500",
        }}
        fontWeight={pathname == link.href ? "bold" : "none"}
        fontSize="1.3rem"
        _hover={{
          textDecoration: "none",
          color: {
            xs:
              pathname == link.href || pathname.includes(link.href)
                ? "secondary.main"
                : "primary.main",
            lg: "primary.main",
          },
          fontWeight: "bold",
        }}
        _focus={{ boxShadow: "none" }}
        width="8rem"
        pl={{ xs: "1rem", lg: 0 }}
      >
        {link.name}
      </Link>
    </NextLink>
  ));
};
const weekday = [
  { name: "Thứ Hai", value: 1, isAvailable: true },
  { name: "Thứ Ba", value: 2, isAvailable: true },
  { name: "Thứ Tư", value: 3, isAvailable: true },
  { name: "Thứ Năm", value: 4, isAvailable: true },
  { name: "Thứ Sáu", value: 5, isAvailable: true },
  { name: "Thứ Bảy", value: 6, isAvailable: true },
  { name: "Chủ nhật", value: 0, isAvailable: false },
];

const currentDate = new Date();

const MainHeader = () => {
  //hooks
  const { user, loading } = useAuthContext();
  const {
    selectedArea,
    SetSelectedArea,
    selectedLocation,
    SetSelectedLocation,
  } = useAreaContext();

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //apis
  const { data: areas } = useAreas();
  useEffect(() => {
    if (!selectedArea) {
      SetSelectedArea(areas?.[0]);
      SetSelectedLocation(areas?.[0].locations[0]);
    }
  }, [selectedArea, areas, SetSelectedArea, SetSelectedLocation]);

  console.log("selectedArea", selectedArea);
  //states
  const [isCartDisable, setIsCartDisable] = useState(false);
  const [arrivedTimeRange, setArrivedTimeRange] = useState("");
  //variables
  const defautTabIndex = currentDate.getDay() - 1;

  // const useScrollingUp = () => {
  //   let prevScroll = window.pageYOffset;

  //   const [scrollingUp, setScrollingUp] = useState(false);
  //   const handleScroll = () => {
  //     const currScroll = window.pageYOffset;
  //     const isScrolled = prevScroll > currScroll;
  //     setScrollingUp(isScrolled);
  //     prevScroll = currScroll;
  //   };
  //   useEffect(() => {
  //     on(window, "scroll", handleScroll, { passive: true });
  //     return () => {
  //       off(window, "scroll", handleScroll, { passive: true });
  //     };
  //   }, []);
  //   return scrollingUp;
  // };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} mb="1rem">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Image
              alt="logo"
              sx={{ width: "50px", marginLeft: "20px" }}
              src={logo.src}
            ></Image>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink />
            </HStack>
          </HStack>
          <Flex>
            <Menu>
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                Giao tại: {selectedLocation?.name} - {selectedArea?.name}
              </MenuButton>
              <MenuList>
                {areas?.map((area, idx) => (
                  <>
                    <MenuGroup key={area.id} title={area.name}>
                      {area.locations.map((location) => (
                        <MenuItem
                          key={location.id}
                          onClick={() => {
                            SetSelectedArea(area);
                            SetSelectedLocation(location);
                          }}
                        >
                          {location.name}
                        </MenuItem>
                      ))}
                    </MenuGroup>
                    {idx !== areas.length - 1 && <MenuDivider />}
                  </>
                ))}
              </MenuList>
            </Menu>
            {/* <Menu>
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                Điểm giao: {selectedArea?.name}
              </MenuButton>
              <MenuList>
                {selectedArea?.locations.map((location) => (
                  <MenuItem
                    key={location.id}
                    onClick={() => {
                      // SetSelectedArea(area);
                      console.log("selectedlocation", location);
                    }}
                  >
                    {location.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu> */}
          </Flex>
          <Flex alignItems={"center"}>
            <CartDrawer
              isCartDisable={isCartDisable}
              arrivedTimeRange={arrivedTimeRange}
            />
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "http://uxpanol.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => router.push("../profile")}>
                    Hồ sơ
                  </MenuItem>
                  <MenuItem onClick={() => router.push("../orderhistory")}>
                    Lịch sử đơn hàng
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => logOut()}>Đăng xuất</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Flex p={2}>
                <Button onClick={() => router.push("../authentication")}>
                  Đăng nhập
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
    // <Tabs>
    //   <TabList
    //     justifyContent={"space-between"}
    //     alignItems="center"
    //     py="1rem"
    //     px={"1rem"}
    //     mb="2rem"
    //     position="sticky"
    //     top="0"
    //     zIndex={3}
    //     bg="light"
    //   >
    //     {weekday.slice(0, 6).map((day) => (
    //       <Tab
    //         key={day.name}
    //         isDisabled={currentDate.getDay() == day.value ? false : true}
    //         _selected={{
    //           color: "primary.main",
    //           borderColor: "primary.main",
    //           transform: "translateY(5px)",
    //         }}
    //         _hover={{
    //           boxShadow: "sm",
    //         }}
    //       >
    //         <Text fontSize={"2xl"}>{day.name}</Text>
    //       </Tab>
    //     ))}

    //     <CartDrawer
    //       isCartDisable={isCartDisable}
    //       arrivedTimeRange={arrivedTimeRange}
    //     />
    //   </TabList>
    // </Tabs>
  );
};

export default MainHeader;

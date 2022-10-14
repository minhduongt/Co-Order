//images and icons
//components
import CartDrawer from "../cart/CartDrawer";

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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);
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

const MenuHeader = () => {
  //hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  //apis
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
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} mb="2rem">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <CartDrawer
              isCartDisable={isCartDisable}
              arrivedTimeRange={arrivedTimeRange}
            />
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
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
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

export default MenuHeader;

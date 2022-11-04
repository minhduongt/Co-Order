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
  useToast,
  MenuGroup,
  Input,
  FormControl,
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
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cartApi from "api/cart";
import useCartContext from "hooks/useCartContext";
import useCheckout from "hooks/cart/useCheckout";
import usePartyOrder from "hooks/order/usePartyOrder";
import useUserContext from "hooks/useUserContext";
type MainHeaderProps = {
  isCartPage?: boolean;
};
type FindRoomForm = {
  shareLink: string;
};
const Links = [
  { name: "Trang chủ", href: "/" },
  // { name: "Đơn chung", href: "/coorder" },
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
const findRoomSchema = yup.object().shape({
  shareLink: yup.string().required("Hãy điền vào code"),
});

const currentDate = new Date();

const MainHeader = ({ isCartPage }: MainHeaderProps) => {
  //hooks
  const toast = useToast();
  const { user, loading } = useAuthContext();
  const {
    selectedArea,
    SetSelectedArea,
    selectedLocation,
    SetSelectedLocation,
  } = useAreaContext();
  const {
    cart: currentCart,
    SetPartyOrder,
    partyOrder,
    isHost,
  } = useCartContext();
  const { accessToken, user: currentUser } = useUserContext();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //apis
  const { data: areas } = useAreas();
  const { getPartyOrderByCode } = usePartyOrder();
  const { joinPartyOrder } = useCheckout(currentCart);
  useEffect(() => {
    if (!selectedArea) {
      SetSelectedArea(areas?.[0]);
      SetSelectedLocation(areas?.[0].locations[0]);
    }
  }, [areas]);
  const { shareLink } = router.query;

  //states
  const [isCartDisable, setIsCartDisable] = useState(false);
  const [arrivedTimeRange, setArrivedTimeRange] = useState("");
  //variables
  const defautTabIndex = currentDate.getDay() - 1;
  const findRoomForm = useForm<FindRoomForm>({
    // resolver: yupResolver(findRoomSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = findRoomForm;
  async function getRoomAndSetToJoin(shareLink: string) {
    if (partyOrder?.shareLink != shareLink) {
      await SetPartyOrder(null);
    } else {
      toast({
        title: "Bạn đã vào party này rồi",
        status: "warning",
        position: "top",
        isClosable: false,
        duration: 1500,
      });
    }

    try {
      const targetPartyOrder = await getPartyOrderByCode(
        shareLink,
        accessToken!
      );
      if (targetPartyOrder) {
        if (targetPartyOrder.error) {
          toast({
            title: "Lỗi vào party!",
            status: "error",
            position: "top",
            isClosable: false,
            duration: 2000,
          });
          return;
        }
        if (targetPartyOrder.data) {
          console.log("targetPartyOrder", targetPartyOrder.data);
          await SetPartyOrder(targetPartyOrder.data);
          toast({
            title: "Vào party thành công!",
            status: "success",
            position: "top",
            isClosable: false,
            duration: 2000,
          });
        }

        // const res = await joinPartyOrder(
        //   partyOrderId,
        //   form.shareLink,
        //   accessToken!
        // );
      }
    } catch (error) {
      if (error.statusCode === 404) {
        toast({
          title: "Không tìm thấy party!",
          status: "error",
          position: "top",
          isClosable: false,
          duration: 2000,
        });
      } else {
        toast({
          title: error.message,
          status: "error",
          position: "top",
          isClosable: false,
          duration: 2000,
        });
      }
    }
  }
  const onSubmit = async (form: FindRoomForm) => {
    try {
      console.log("form ", form);

      if (form.shareLink) {
        getRoomAndSetToJoin(form.shareLink);
      } else {
        toast({
          title: "Vui lòng nhập mã party",
          status: "warning",
          position: "top",
          isClosable: true,
          duration: 1500,
        });
      }
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        position: "top",
        isClosable: false,
        duration: 2000,
      });
      console.log("error", error);
    }
  };
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

  const handleSignout = async () => {
    await logOut();
    await router.push("/authentication");
    toast({
      title: `Đã dăng xuất`,
      status: "success",
      position: "top-right",
      isClosable: true,
      duration: 1000,
    });
  };

  //
  useEffect(() => {
    if (shareLink && accessToken) {
      getRoomAndSetToJoin(shareLink as string);
      console.log("partyOrder", partyOrder);
    } else return;
  }, [shareLink, accessToken]);

  return (
    <Box pb="5rem">
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        mb="2rem"
        w={"100%"}
        position={"fixed"}
        zIndex={99}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          minWidth={"100vw"}
          px="2em"
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"left"}>
            <Image
              alt="logo"
              sx={{ width: "50px" }}
              src={logo.src}
              onClick={() => router.push("/")}
              display={{ base: "none", md: "block" }}
            ></Image>

            <Menu>
              <MenuButton
                fontSize={{ xs: "md", md: "block", xl: "xl" }}
                isActive={isOpen}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                Giao tại: {selectedLocation?.name} -{selectedArea?.name}
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
          </HStack>
          <Flex></Flex>
          <Flex gap={2} alignItems={"center"}>
            {isCartPage ? (
              <NextLink href={"/coorder"} passHref>
                <Link
                  color={
                    router.pathname.includes("coorder")
                      ? "primary.main"
                      : "primary.darker"
                  }
                  fontWeight={"bold"}
                  fontSize="1.3rem"
                  _hover={{
                    textDecoration: "none",
                    color: "primary.main",

                    fontWeight: "bold",
                  }}
                  _focus={{ boxShadow: "none" }}
                  width="8rem"
                  pl={{ xs: "1rem", lg: 0 }}
                >
                  Đơn party
                </Link>
              </NextLink>
            ) : partyOrder ? (
              <>
                {isHost ? (
                  <></>
                ) : (
                  <Flex alignItems={"center"} gap={5}>
                    <Text>{partyOrder.orderCode}</Text>
                    <Button
                      onClick={() => SetPartyOrder(null)}
                      colorScheme="teal"
                    >
                      Thoát party
                    </Button>
                  </Flex>
                )}

                <NextLink href={`/coorder/${partyOrder?.id}`} passHref>
                  <Link
                    color={
                      router.pathname.includes("coorder")
                        ? "primary.main"
                        : "primary.darker"
                    }
                    fontWeight={"bold"}
                    fontSize="lg"
                    _hover={{
                      textDecoration: "none",
                      color: "primary.main",
                      fontWeight: "bold",
                    }}
                    _focus={{ boxShadow: "none" }}
                    width="8rem"
                    pl={{ xs: "1rem", lg: 0 }}
                  >
                    Đơn party
                  </Link>
                </NextLink>
              </>
            ) : (
              <FormProvider {...findRoomForm}>
                <Input
                  {...register("shareLink")}
                  w="8rem"
                  variant="outlined"
                  colorScheme="teal"
                  placeholder="Nhập code"
                />
                <Button onClick={handleSubmit(onSubmit)} colorScheme="teal">
                  Vào party
                </Button>
              </FormProvider>
            )}

            {isHost ? (
              <></>
            ) : (
              <CartDrawer
                isCartDisable={isCartDisable}
                arrivedTimeRange={arrivedTimeRange}
              />
            )}
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={6}
                  marginRight={4}
                >
                  <Avatar size={"sm"} src={currentUser?.imageUrl} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => router.push("../profile")}>
                    Hồ sơ
                  </MenuItem>
                  <MenuItem onClick={() => router.push("../orderhistory")}>
                    Lịch sử đơn hàng
                  </MenuItem>
                  <MenuItem onClick={() => router.push("../orderPartyHistory")}>
                    Lịch sử đơn hàng nhóm
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => handleSignout()}>Đăng xuất</MenuItem>
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
    </Box>
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

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
import logo from "../public/assets/image/logofinal.png";
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
import { useForm } from "react-hook-form";
import useCartContext from "hooks/useCartContext";
import useCheckout from "hooks/cart/useCheckout";
import usePartyOrder from "hooks/order/usePartyOrder";
import useUserContext from "hooks/useUserContext";
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
const currentDate = new Date();

const PartyOrderHeader = () => {
  //hooks
  const toast = useToast();
  const { user, loading } = useAuthContext();

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
  const { orderId } = router.query;
  async function getPartyDetail(shareLink: string) {
    try {
      const targetPartyOrder = await getPartyOrderByCode(
        shareLink,
        accessToken!
      );
      if (targetPartyOrder) {
        if (targetPartyOrder.error) {
          toast({
            title: "Lỗi vào phòng!",
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
          <Image
            alt="logo"
            sx={{ width: "50px" }}
            src={logo.src}
            onClick={() => router.push("/")}
            display={{ base: "none", md: "block" }}
          />
          <Flex gap={2} alignItems={"center"} justifyContent="space-between">
            <NextLink href={`/coorder/${orderId ?? partyOrder?.id}`} passHref>
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
  );
};

export default PartyOrderHeader;

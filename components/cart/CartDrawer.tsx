import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Circle,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { FaShoppingBasket } from "react-icons/fa";
import logoBean from "../../public/assets/image/logo.png";
import useCartContext from "hooks/useCartContext";
import { CartItem } from "types/cart";
import useDeleteCartItem from "hooks/cart/useDeleteCartItem";
import useCartPrice from "hooks/cart/useCartPrice";
import { mapCartModelToOrderRequest } from "hooks/cart/helper";
import beanEmpty from "../../public/assets/image/empty.png";
import ProductInCart from "components/sections/cart/ProductInCart";
import CartModal from "./CartModal";
import { TRoom } from "types/room";
import CreateRoomModal from "./CreateRoomModal";

interface CartDrawerProps {
  arrivedTimeRange: string;
  isCartDisable: boolean;
}

export default function CartDrawer({
  arrivedTimeRange,
  isCartDisable,
}: CartDrawerProps) {
  const [isDesktop] = useMediaQuery("(min-width: 1440px)");
  const toast = useToast();
  const cartContext = useCartContext();
  const { cart: currentCart, room: currentRoom } = cartContext;
  const [totalCartItems, setTotalCartItems] = useState<number>(0);
  const totalCurrentCart = currentCart?.items.length;
  const { data: cartPrepareRes, error } = useCartPrice(
    mapCartModelToOrderRequest(currentCart)
  );
  useEffect(() => {
    setTotalCartItems(totalCurrentCart);
  }, [totalCurrentCart]);

  const deleteItem = useDeleteCartItem;

  const handleDeleteCartItem = async (cartItem: CartItem) => {
    try {
      const newCart = deleteItem(cartItem, currentCart);
      await cartContext.SetNewCart(newCart);
      toast({
        title: `Đã xóa ${cartItem.product.product_name} khỏi giỏ hàng`,
        status: "warning",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: `Có lỗi xảy ra`,
        status: "error",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    }
  };

  const handleCreateRoom = async (room: TRoom) => {
    try {
      await cartContext.SetNewRoom(newRoom);
      toast({
        title: `Đã vào phòng ${room.name}`,
        status: "success",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: `Có lỗi xảy ra`,
        status: "error",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    }
  };

  const newRoom = {
    id: "abcd-1234",
    name: "Hội người lười chảy thây",
  };

  const handleJoinRoom = async (room: TRoom) => {
    try {
      const newRoom = {
        id: "abcd-1234",
        name: "Hội những người lười chảy thây",
      };
      await cartContext.SetNewRoom(newRoom);
      toast({
        title: `Đã vào phòng ${room.name}`,
        status: "success",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: `Có lỗi xảy ra`,
        status: "error",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    }
  };
  const handleExitRoom = async () => {
    try {
      await cartContext.SetNewRoom(null);
      toast({
        title: `Đã thoát khỏi phòng ${currentRoom?.name}`,
        status: "success",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: `Có lỗi xảy ra`,
        status: "error",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    }
  };

  return (
    <Box>
      <Flex padding={"2rem"}>
        <Button
          disabled={isCartDisable}
          onClick={cartContext.onOpen}
          variant="outline"
          colorScheme="dark"
          aria-label="Giỏ hàng"
          minW={{ xs: "1.5rem", xl: "5.5rem" }}
          height={{ xs: "1.5rem", xl: "2.5rem" }}
          leftIcon={
            <FaShoppingBasket
              size={isDesktop ? "2rem" : "1.5rem"}
              color="#2689e0"
            />
          }
        >
          <Text>Giỏ hàng</Text>
        </Button>
        {totalCartItems > 0 && (
          <Circle
            size="20px"
            bg="tomato"
            color="white"
            position={"relative"}
            bottom="55px"
            left="35px"
          >
            {totalCartItems}
          </Circle>
        )}
      </Flex>

      <Drawer
        isOpen={cartContext.isOpen}
        placement="right"
        onClose={cartContext.onClose}
        size="sm"
      >
        <DrawerOverlay background={"transparent"} />

        <DrawerContent fontFamily="beanoi">
          <DrawerHeader>
            <Flex fontSize={"3xl"} gap={2}>
              {/* <Image alt="beanoi" src={logoBean.src} w="2.5rem" h="2.5rem" /> */}
              <Text>Giỏ hàng</Text>
            </Flex>
            {currentRoom != null ? (
              <Flex flexDirection={"column"} gap={2}>
                <Text>Phòng hiện tại của bạn: {currentRoom.name} </Text>
                <Button onClick={() => handleExitRoom()}>Thoát Phòng</Button>
              </Flex>
            ) : (
              <Box color="secondary.main" fontSize={"xl"}>
                <Flex></Flex>
                <Text>Muốn đặt đơn cùng bạn bè hoặc nhiều người?</Text> Chọn
                <CreateRoomModal>
                  <Button>Tạo phòng</Button>
                </CreateRoomModal>{" "}
                hoặc{" "}
                <Button onClick={() => handleJoinRoom(newRoom)}>
                  Vào phòng
                </Button>{" "}
                ngay!
              </Box>
            )}
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody
            fontSize="2xl"
            paddingInlineStart={2}
            paddingInlineEnd={0}
          >
            <Divider />
            {totalCartItems > 0 ? (
              currentCart?.items?.map((item, index) => (
                <Box key={index + item.product.product_id}>
                  <ProductInCart
                    item={item}
                    deleteCartItem={handleDeleteCartItem}
                  />
                  <Divider />
                </Box>
              ))
            ) : (
              <Flex
                w="100%"
                h="100%"
                justifyContent={"center"}
                alignItems="center"
              >
                <Box maxW="50%" textAlign={"center"}>
                  <Text fontSize={"3xl"}>Giỏ hàng trống</Text>
                  {/* <Image
                    loading="lazy"
                    alt={"empty cart"}
                    src={beanEmpty.src}
                    w="100%"
                    h="250px"
                  /> */}
                  <Text>Hãy thêm món bạn thích vào nhé!</Text>
                </Box>
              </Flex>
            )}
          </DrawerBody>
          {totalCartItems > 0 && (
            <Flex
              minHeight={"20vh"}
              flexDirection="column"
              justifyContent={"space-between"}
              padding="1rem"
            >
              {/* {cartPrepareRes ? ( */}
              <>
                <Flex
                  height={"auto"}
                  border={"groove"}
                  borderRadius={8}
                  paddingX="1rem"
                  paddingY="0.5rem"
                  justifyContent={"space-between"}
                  flexDirection="column"
                >
                  {/* <Box>
                    <Flex justifyContent="space-between" fontSize={"xl"}>
                      <Text>{"Tạm tính:"}</Text>
                      <Text>
                        {cartPrepareRes.total_amount.toLocaleString()} đ
                      </Text>
                    </Flex>

                    {cartPrepareRes.other_amounts.map((other, index) => (
                      <Flex
                        key={index}
                        justifyContent="space-between"
                        fontSize={"xl"}
                      >
                        <Text>{other.name}</Text>
                        <Text> {other.amount.toLocaleString()} đ</Text>
                      </Flex>
                    ))}
                  </Box> */}
                  <Divider />
                  <Flex
                    justifyContent="space-between"
                    fontSize={"2xl"}
                    fontWeight="bold"
                  >
                    <Text>{"Tổng cộng:"}</Text>
                    <Text>
                      {cartPrepareRes?.final_amount.toLocaleString()} đ
                    </Text>
                  </Flex>
                </Flex>
                {/*  Check out */}
                <Flex paddingTop="1rem">
                  <CartModal arrivedTimeRange={arrivedTimeRange}>
                    <Button
                      height={"3rem"}
                      variant="outline"
                      color={"light"}
                      backgroundColor="primary.main"
                      colorScheme={"primary.main"}
                      onClick={cartContext.onOpen}
                      fontSize="2xl"
                      w="100%"
                    >
                      Đặt ngay!
                    </Button>
                  </CartModal>
                </Flex>
              </>
              {/* ) : (
                <>
                  <SkeletonText h="20vh" noOfLines={4} spacing="7" mx="1rem" />
                  <Skeleton h="5vh" mx="1rem" mb="2rem" />
                </>
              )} */}
            </Flex>
          )}
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

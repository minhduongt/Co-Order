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
import useCartContext from "hooks/useCartContext";
import { CartItem } from "types/cart";
import useDeleteCartItem from "hooks/cart/useDeleteCartItem";
import useCartPrice from "hooks/cart/useCartPrice";
import { mapCartModelToOrderRequest } from "hooks/cart/helper";
import ProductInCart from "components/sections/cart/ProductInCart";
import CartModal from "./CartModal";
import { TRoom } from "types/room";
import RoomModal from "./RoomModal";
import useAreaContext from "hooks/useAreaContext";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const cartContext = useCartContext();
  const areaContext = useAreaContext();
  const { cart: currentCart } = cartContext;
  const [totalCartItems, setTotalCartItems] = useState<number>(0);
  const totalCurrentCart = currentCart?.totalItem;
  useEffect(() => {
    setTotalCartItems(totalCurrentCart);
  }, [totalCurrentCart]);

  const deleteItem = useDeleteCartItem;

  const handleDeleteCartItem = async (cartItem: CartItem) => {
    try {
      const newCart = deleteItem(cartItem, currentCart);
      await cartContext.SetNewCart(newCart);
      toast({
        title: `Đã xóa ${cartItem.product.product.name} khỏi giỏ hàng`,
        status: "warning",
        position: "top-right",
        isClosable: true,
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
          minH={{ xs: "1.5rem", xl: "2.5rem" }}
          leftIcon={
            <FaShoppingBasket
              size={isDesktop ? "2rem" : "1.5rem"}
              color="#2689e0"
            />
          }
        >
          <Text>Giỏ hàng</Text>
        </Button>
        <Box visibility={totalCartItems > 0 ? "visible" : "hidden"}>
          <Circle
            size="20px"
            bg="tomato"
            color="white"
            position={"relative"}
            bottom="5px"
            right="10px"
          >
            {totalCartItems}
          </Circle>
        </Box>
      </Flex>

      <Drawer
        isOpen={cartContext.isOpen}
        placement="right"
        onClose={cartContext.onClose}
        size="sm"
      >
        <DrawerOverlay background={"transparent"} />

        <DrawerContent fontFamily="coorder">
          <DrawerHeader>
            <Flex fontSize={"3xl"} gap={2}>
              {/* <Image alt="beanoi" src={logoBean.src} w="2.5rem" h="2.5rem" /> */}
              <Text>Giỏ hàng</Text>
            </Flex>
            {/* {currentRoom != null ? (
              <Flex flexDirection={"column"} gap={2}>
                <Text>Phòng hiện tại của bạn: {currentRoom.name} </Text>
                <Button onClick={() => handleExitRoom()}>Thoát Phòng</Button>
              </Flex>
            ) : (
              <Box color="secondary.main" fontSize={"xl"}>
                <Text>Muốn đặt đơn cùng bạn bè hoặc nhiều người?</Text> Chọn
                <Flex alignItems={"center"} gap="2">
                  <RoomModal isCreate>
                    <Button>Tạo phòng</Button>
                  </RoomModal>
                  hoặc
                  <RoomModal>
                    <Button>Vào phòng</Button>
                  </RoomModal>
                  ngay!
                </Flex>
              </Box>
            )} */}
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
                <Box key={index + item.product.productId}>
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
                  <Box>
                    <Flex justifyContent="space-between" fontSize={"xl"}>
                      <Text>{"Tạm tính:"}</Text>
                      <Text>{currentCart.total.toLocaleString()} đ</Text>
                    </Flex>

                    <Flex justifyContent="space-between" fontSize={"xl"}>
                      <Text>Phí giao hàng</Text>
                      <Text>
                        {areaContext.selectedArea?.shippingFee.toLocaleString()}{" "}
                        đ
                      </Text>
                    </Flex>
                  </Box>
                  <Divider />
                  <Flex
                    justifyContent="space-between"
                    fontSize={"2xl"}
                    fontWeight="bold"
                  >
                    <Text>{"Tổng cộng:"}</Text>
                    <Text>
                      {(
                        currentCart?.total +
                        areaContext.selectedArea?.shippingFee!
                      ).toLocaleString()}{" "}
                      đ
                    </Text>
                  </Flex>
                </Flex>
                {/*  Check out */}
                <Flex paddingTop="1rem">
                  {/* <Button
                    height={"3rem"}
                    variant="outline"
                    color={"light"}
                    backgroundColor="primary.main"
                    colorScheme={"primary.main"}
                    onClick={() => {
                      cartContext.onClose();
                      router.push("/coorder");
                    }}
                    fontSize="2xl"
                    w="95%"
                  >
                    Tạo phòng
                  </Button> */}
                  <CartModal>
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
                      Tiếp tục
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

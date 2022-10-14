import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Link,
  Text,
  Flex,
  Container,
  Heading,
  Image,
  WrapItem,
  Grid,
  IconButton,
  Button,
  Code,
  Tag,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { mapCartModelToOrderRequest } from "hooks/cart/helper";
import Cart from "./cart";
import { CartItem } from "types/cart";
import useCartContext from "hooks/useCartContext";
import useDeleteCartItem from "hooks/cart/useDeleteCartItem";
import useCartPrice from "hooks/cart/useCartPrice";
import { useEffect, useState } from "react";
const items = [...Array(5)].map((_) => {
  return {
    title: "Cá hồi",
    price: "25000",
    image: "https://cloud.lunchon.ae/resized-images/560px/40291m.jpg",
    quantity: 5,
  };
});

const MyCoOrder = () => {
  const toast = useToast();
  const copy = async () => {
    await navigator.clipboard.writeText(
      "https://co-order.com/order/25AB6S?userId=12"
    );
    toast({
      title: "Đã sao lưu vào bộ nhớ tạm",
      status: "success",
      position: "bottom",
      isClosable: false,
      duration: 2000,
    });
  };
  const cartContext = useCartContext();
  const currentCart = cartContext.cart;
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
  // const { cart } = useCart();
  // const { mutate: deleteCartItem } = useDeleteItem();
  // const { mutate: updateCartItem } = useUpdateItem();

  // const { data: relatedProducts } = useProducts({
  //   params: { page: 1, size: 10 },
  // });

  // const cartItems = cart.items;

  return (
    <Box>
      {/* <Action hasBanner={false} isBlog={false} /> */}
      <Container maxWidth="6xl" paddingRight={"1rem"}>
        <Flex flexDirection={"column"}>
          <Flex fontSize={"xl"}>
            <Text>Mã phòng của đơn: {"25AB6S"}</Text>
          </Flex>
          <Flex gap={3} fontSize={"xl"} p={4} alignItems="center">
            <Text px={3}>Đường dẫn vào phòng:</Text>{" "}
            <Box>
              <NextLink
                passHref
                href={"https://co-order.com/order/25AB6S?userId=12"}
              >
                <Tag>
                  {" "}
                  <Link> {"co-order.com/order/25AB6S?userId=12"}</Link>
                </Tag>
              </NextLink>
            </Box>
            <Button onClick={copy} px={3}>
              Copy link
            </Button>
          </Flex>
        </Flex>

        <Cart />
      </Container>
    </Box>
  );
};

export default MyCoOrder;

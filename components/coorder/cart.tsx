import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { mapCartModelToOrderRequest } from "hooks/cart/helper";
import useCartPrice from "hooks/cart/useCartPrice";
import useDeleteCartItem from "hooks/cart/useDeleteCartItem";
import useCartContext from "hooks/useCartContext";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import { CartItem } from "types/cart";
import QuantityInput from "./QuantityInput";
import NoImage from "../../public/assets/image/noimage.png";

const items = [...Array(5)].map((_) => {
  return {
    title: "Cá hồi",
    price: 25000,
    image: "https://cloud.lunchon.ae/resized-images/560px/40291m.jpg",
    quantity: 5,
  };
});
const Cart = () => {
  const toast = useToast();
  const cartContext = useCartContext();
  const currentCart = cartContext.cart;
  const [totalCartItems, setTotalCartItems] = useState<number>(0);
  const totalCurrentCart = currentCart?.items.length;
  // const { data: cartPrepareRes, error } = useCartPrice(
  //   mapCartModelToOrderRequest(currentCart)
  // );
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
      <Flex justifyContent={"space-between"} paddingY="2rem">
        <Heading fontSize={"3xl"}>Giỏ hàng của bạn</Heading>
        <Flex alignItems={"center"} color="secondary.main">
          <FaFire size="1.2rem" />
          <NextLink passHref href="/">
            <Link>Đặt thêm món</Link>
          </NextLink>
        </Flex>
      </Flex>
      {totalCartItems > 0 ? (
        currentCart?.items?.map((item, index) => (
          <Box key={index + item.product.id}>
            <Box
              key={index}
              width={"100%"}
              display={"flex"}
              // border="groove"
              backgroundColor="light"
              paddingY={"0.5rem"}
              borderStyle="solid"
              borderWidth={"10px"}
            >
              <NextLink passHref href={"#"}>
                <Link _hover={{ textDecoration: "none" }}>
                  <Box
                    overflow="hidden"
                    borderRadius={"1rem"}
                    maxHeight={{
                      xs: "5rem",
                      sm: "6rem",
                    }}
                    minHeight={{
                      xs: "5rem",
                      sm: "6rem",
                    }}
                    minWidth={{
                      xs: "7rem",
                      sm: "9rem",
                    }}
                    maxWidth={{
                      xs: "7rem",
                      sm: "9rem",
                    }}
                    backgroundColor={"gray.200"}
                  >
                    <Image
                      src={item.product.product.imageUrl}
                      fallbackSrc={NoImage.src}
                      alt={"image"}
                      objectFit={"cover"}
                      transform="scale(1.0)"
                      transition="0.3s ease-in-out"
                      _hover={{
                        transform: "scale(1.05)",
                      }}
                    />
                  </Box>
                </Link>
              </NextLink>

              <Grid
                templateColumns="repeat(4, 1fr)"
                gap={6}
                width="100%"
                paddingX={"1rem"}
                paddingY={"0.5rem"}
                alignItems="center"
              >
                <Text
                  color="primary.darker"
                  fontSize="2xl"
                  alignSelf={"flex-start"}
                >
                  {item.product.product.name}
                </Text>

                <Text fontSize="xl">
                  {item.product.price?.toLocaleString()}đ
                </Text>
                <Box minWidth={"10rem"}>
                  <QuantityInput quantity={item.quantity} />
                </Box>

                <IconButton
                  onClick={() => handleDeleteCartItem(item)}
                  justifySelf={"flex-end"}
                  width={"1rem"}
                  colorScheme="red"
                  aria-label="remove-item"
                  icon={<SmallCloseIcon />}
                />
              </Grid>
              {/*  Check out */}
            </Box>
          </Box>
        ))
      ) : (
        <Flex w="100%" h="100%" justifyContent={"center"} alignItems="center">
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
              <Flex
                justifyContent="space-between"
                fontSize={"2xl"}
                fontWeight="bold"
              >
                <Text>{"Tổng cộng:"}</Text>
                <Text>{currentCart?.total.toLocaleString()} đ</Text>
              </Flex>
              <Flex width="100%" justifyContent={"flex-end"} pt={10}>
                <Button width={"50%"}>Chốt đơn</Button>
              </Flex>
            </Flex>
            {/*  Check out */}
          </>
          {/* ) : (
                <>
                  <SkeletonText h="20vh" noOfLines={4} spacing="7" mx="1rem" />
                  <Skeleton h="5vh" mx="1rem" mb="2rem" />
                </>
              )} */}
        </Flex>
      )}
    </Box>
  );
};

export default Cart;

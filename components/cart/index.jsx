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
} from "@chakra-ui/react";
import { FaFire } from "react-icons/fa";
import NextLink from "next/link";
import Action from "../nav";
import QuantityInput from "./QuantityInput";

const items = [...Array(5)].map((_) => {
  return {
    title: "Cá hồi",
    price: "25000",
    image: "https://cloud.lunchon.ae/resized-images/560px/40291m.jpg",
    quantity: 5,
  };
});

const MyCart = () => {
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
        <Flex justifyContent={"space-between"} paddingY="2rem">
          <Heading fontSize={"3xl"}>Giỏ hàng của bạn</Heading>
          <Flex alignItems={"center"} color="secondary.main">
            <FaFire size="1.2rem" />
            <NextLink passHref href="/menu">
              <Link>Đặt thêm món</Link>
            </NextLink>
          </Flex>
        </Flex>

        {items.map((item, index) => (
          <Box
            key={index}
            width={"100%"}
            display={"flex"}
            // border="groove"
            backgroundColor="light"
            paddingY={"0.5rem"}
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
                    src={item.image}
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
                {item.title}
              </Text>

              <Text fontSize="xl">{item.price}đ</Text>
              <Box minWidth={"10rem"}>
                <QuantityInput quantity={item.quantity} />
              </Box>

              <IconButton
                justifySelf={"flex-end"}
                width={"1rem"}
                colorScheme="red"
                aria-label="remove-item"
                icon={<SmallCloseIcon />}
              />
            </Grid>
            {/*  Check out */}
          </Box>
        ))}
        <Flex width="100%" justifyContent={"flex-end"}>
          <Button width={"50%"}>Chốt đơn</Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default MyCart;

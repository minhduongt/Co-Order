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
const items = [...Array(5)].map((_) => {
  return {
    title: "Cá hồi",
    price: "25000",
    image: "https://cloud.lunchon.ae/resized-images/560px/40291m.jpg",
    quantity: 5,
  };
});

const MyCoOrder = () => {
  return (
    <Container maxW={"6xl"}>
      <Cart />
    </Container>
  );
};

export default MyCoOrder;

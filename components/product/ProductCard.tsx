import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Text,
  Stack,
  Button,
  Image,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import ProductDetailModal from "components/productdetail/ProductDetailModal";
import { motion } from "framer-motion";
import { TProduct } from "types/product";
import AddToCartWrapper from "../cart/AddToCartWrapper";
import NoImage from "../../public/assets/image/noimage.png";
import { BsFillCartPlusFill } from "react-icons/bs";

const boxMotion = {
  toggle: {
    opacity: 0.6,
  },
  inview: {
    opacity: 1,
  },
  static: {
    opacity: 0,
  },
};

interface ProductCardProps {
  product: TProduct;
  // TProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const ButtonWrapper = AddToCartWrapper;

  return (
    <Center py={10}>
      <Box
        maxW={{ xs: "250px", xl: "300px" }}
        w={"full"}
        bg={"light"}
        boxShadow={"2xl"}
        p={3}
        my={{ xs: "0.5rem", xl: "1rem" }}
        textAlign={"center"}
        borderRadius="12%"
        as={motion.div}
        variants={boxMotion}
        initial="static"
        //animate="inview"

        whileInView={"inview"}
        viewport={{ once: true }}
      >
        <ProductDetailModal product={product}>
          <Box
            as={motion.div}
            variants={boxMotion}
            whileHover="toggle"
            whileFocus="toggle"
            whileTap="toggle"
          >
            <Image
              width={"14.5rem"}
              height={"14.5rem"}
              borderRadius="20%"
              src={product.imageUrl}
              alt={product.name}
              objectFit="cover"
              pos={"relative"}
              bottom="90px"
              fallbackSrc={NoImage.src}
              mx="auto"
            />
            <Text
              mt="-5rem"
              fontSize={"2xl"}
              h="4.5rem"
              fontWeight={"semibold"}
              noOfLines={2}
              //isTruncated
            >
              {product.name}
            </Text>
          </Box>
        </ProductDetailModal>
        <Flex flexDirection={"column"}>
          <Stack
            mt={2}
            direction={"row"}
            spacing={1}
            alignItems="center"
            gap={5}
          >
            <Text
              color={"secondary.main"}
              minW="8.5rem"
              flex={1}
              fontSize={"2xl"}
              fontWeight="bold"
            >
              10000 đ
            </Text>
            <ButtonWrapper product={product}>
              <IconButton
                aria-label="add-to-cart-button"
                flex={1}
                fontSize={"xl"}
                minW="3rem"
                minH="3rem"
                rounded={"full"}
                bg={"primary.main"}
                color={"light"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "primary.light",
                }}
                _focus={{
                  bg: "primary.light",
                }}
                icon={<BsFillCartPlusFill />}
              ></IconButton>
            </ButtonWrapper>
          </Stack>
        </Flex>
      </Box>
    </Center>
  );
}

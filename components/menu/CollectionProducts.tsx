import { Box, Button, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
//
import ProductList from "../product/ProductList";
//
import { FaFire } from "react-icons/fa";

import useCollections from "hooks/collection/useCollections";
import MenuOffline from "./MenuOffline";
interface CollectionProductsProps {
  time_slot?: string[];
}

function CollectionProducts({ time_slot }: CollectionProductsProps) {
  const {
    data: collections,
    isLoading: colLoading,
    isError: colError,
  } = useCollections({
    params: { "time-slot": time_slot, "show-on-home": true },
  });

  return (
    <Box>
      {/* {colLoading && (
        <Flex
          flexDirection={"column"}
          px="1rem"
          py="3rem"
          alignItems={{ xl: "center" }}
        >
          <Skeleton w={"35%"} h="4rem" my="1rem" />
          <Skeleton w={"100%"} h="20rem" />
        </Flex>
      )}
      {colError && <MenuOffline />}
      {collections?.map((col) => {
        const productsMasterAndExceptGift = col.products.filter(
          (pro) => pro.product_type_id != 12 && pro.product_type_id != 0
        );
        if (productsMasterAndExceptGift.length > 0)
          return ( */}
      <Box
      // key={col.id}
      >
        <Flex
          pt="2rem"
          pb="4rem"
          alignItems={"center"}
          justifyContent={{ xl: "center" }}
        >
          <FaFire size={"2rem"} color="#F5B340" />
          <Text paddingLeft={"0.5rem"} fontSize={"4xl"} fontWeight="semibold">
            {/* {col.name} */} Món ăn nổi bật
          </Text>
        </Flex>
        <ProductList />
      </Box>
      );
      {/* })} */}
      {/* <ProductList /> */}
    </Box>
  );
}

export default CollectionProducts;

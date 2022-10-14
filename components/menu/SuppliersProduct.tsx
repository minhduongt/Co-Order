import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import ProductList from "../product/ProductList";
import { FaStore } from "react-icons/fa";
import { TSupplier } from "types/supplier";
import useStoreSupplierProduct from "hooks/store/useStoreSupplierProduct";

interface SupplierProductsProps {
  supplier?: TSupplier;
  time_slot?: string[];
}

function SupplierProducts({ supplier, time_slot }: SupplierProductsProps) {
  // const {
  //   data: supProducts,
  //   isLoading: supProsLoading,
  //   isError: supProsError,
  // } = useStoreSupplierProduct({
  //   storeId: 150,
  //   supId: supplier.id,
  //   params: {
  //     "time-slot": time_slot,
  //     fields: ["ChildProducts", "CollectionId", "Extras"],
  //   },
  // });
  // const productsMasterAndExceptGift = supProducts?.filter(
  //   (pro) => pro.product_type_id != 12 && pro.product_type_id != 0
  // );
  return (
    <>
      {/* {supProsLoading && (
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
      {productsMasterAndExceptGift && productsMasterAndExceptGift.length > 0 && (
        <Box>
          <Flex
            pt="2rem"
            pb="4rem"
            alignItems={"center"}
            justifyContent={{ xl: "center" }}
          >
            <FaStore size={"2rem"} color="#38A169" />
            <Text paddingLeft={"0.5rem"} fontSize={"4xl"} fontWeight="semibold">
              {supplier.name}
            </Text>
          </Flex>

          <ProductList
            from={supplier.name}
            products={productsMasterAndExceptGift}
          />
        </Box>
      )} */}
      <ProductList />
    </>
  );
}

export default SupplierProducts;

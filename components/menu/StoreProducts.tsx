import { Box, Flex, IconButton, Image, Skeleton, Text } from "@chakra-ui/react";
import ProductList from "../product/ProductList";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import useStoreProducts from "hooks/store/useStoreProducts";
import { Dispatch, SetStateAction } from "react";
import sorryBean from "../../public/assets/image/beansorry.png";

interface filterCate {
  category_id: number;
  category_name: string;
}
interface StoreProductsProps {
  filterCate: filterCate;
  time_slot: string[];
  setFilterCate: Dispatch<SetStateAction<filterCate | undefined>>;
}

function StoreProducts({
  filterCate,
  time_slot,
  setFilterCate,
}: StoreProductsProps) {
  const {
    data: storeProducts,
    isLoading: storeProLoading,
    isError: storeProError,
  } = useStoreProducts({
    storeId: 150,
    params: {
      "category-id": filterCate.category_id,
      "time-slot": time_slot,
    },
  });
  const productsMasterAndExceptGift = storeProducts?.filter(
    (pro) => pro.product_type_id != 12 && pro.product_type_id != 0
  );
  return (
    <>
      {(storeProError || storeProLoading) && (
        <Box px="1rem">
          <Skeleton w={"35%"} h="4rem" my="1rem" />
          <Skeleton w={"100%"} h="20rem" />
        </Box>
      )}
      <Box>
        <Flex pt="2rem" pb="4rem" alignItems={"center"} gap={2}>
          <BiCategoryAlt size={"2rem"} color="#F5B340" />
          <Text paddingLeft={"0.5rem"} fontSize={"4xl"} fontWeight="semibold">
            {filterCate.category_name}
          </Text>
          <IconButton
            bg="transparent"
            aria-label="CancelFilter"
            color={"error"}
            _focus={{
              bg: "transparent",
              border: "none",
            }}
            _hover={{
              bg: "transparent",
              border: "none",
            }}
            icon={<MdOutlineCancel size={"2rem"} />}
            onClick={() => setFilterCate(undefined)}
          />
        </Flex>
        {productsMasterAndExceptGift &&
        productsMasterAndExceptGift.length > 0 ? (
          <ProductList products={productsMasterAndExceptGift} />
        ) : (
          <Box>
            <Image
              loading="lazy"
              alt={"bean sorry"}
              src={sorryBean.src}
              width="110px"
              mx="auto"
            />{" "}
            <Text fontSize={"2xl"} textAlign="center">
              Không có món {filterCate.category_name} nào vào lúc này
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
}

export default StoreProducts;

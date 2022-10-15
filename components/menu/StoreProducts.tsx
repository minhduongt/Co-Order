import { Box, Flex, IconButton, Image, Skeleton, Text } from "@chakra-ui/react";
import ProductList from "../product/ProductList";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import useStoreProducts from "hooks/store/useStoreProducts";
import { Dispatch, SetStateAction } from "react";
import sorryBean from "../../public/assets/image/beansorry.png";
import useCategoryProducts from "hooks/category/useCategoryProducts";

interface StoreProductsProps {
  filterCate: number | null;
  filterMenu: number | null;

  setFilterCate: Dispatch<SetStateAction<number | null>>;
}

function CategoryProduct({
  filterCate,
  filterMenu,
  setFilterCate,
}: StoreProductsProps) {
  const {
    data: products,
    isLoading: productLoading,
    isError: productError,
  } = useCategoryProducts({
    menuId: filterMenu,
    categoryId: filterCate,
  });
  console.log("products", products);

  return (
    <>
      {(productError || productLoading) && (
        <Box px="1rem">
          <Skeleton w={"35%"} h="4rem" my="1rem" />
          <Skeleton w={"100%"} h="20rem" />
        </Box>
      )}
      <Box>
        <Flex mb="2rem" alignItems={"center"} gap={2}>
          <BiCategoryAlt size={"2rem"} color="#F5B340" />
          <Text paddingLeft={"0.5rem"} fontSize={"4xl"} fontWeight="semibold">
            Danh sách sản phẩm
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
            onClick={() => setFilterCate(null)}
          />
        </Flex>
        {products && products.length > 0 ? (
          <ProductList products={products} />
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
              Không có món cho danh mục này
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
}

export default CategoryProduct;

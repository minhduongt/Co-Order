import { Box, Flex, IconButton, Image, Skeleton, Text } from "@chakra-ui/react";
import ProductList from "../product/ProductList";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import useStoreProducts from "hooks/store/useStoreProducts";
import { Dispatch, SetStateAction } from "react";
import sorryBean from "../../public/assets/image/beansorry.png";
import useCategoryProducts from "hooks/category/useCategoryProducts";
import { TCategory } from "types/category";
import { TMenu } from "types/menu";

interface StoreProductsProps {
  filterCate: TCategory | null;
  filterMenu: TMenu | null;
  setFilterCate: Dispatch<SetStateAction<TCategory | null>>;
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
    menuId: filterMenu ? filterMenu?.id : null,
    categoryId: filterCate ? filterCate.id : null,
  });
  // console.log("products", products);

  return (
    <>
      {(productError || productLoading) && (
        <Flex px="1rem" flexDirection={"column"}>
          <Skeleton w={"40%"} h="4rem" my="1rem" />
          <Skeleton w={"100%"} h="20rem" />
        </Flex>
      )}
      <Box>
        <Flex
          mb="2rem"
          alignItems={"center"}
          gap={2}
          paddingLeft={"0.5rem"}
          fontSize={"4xl"}
          fontWeight="semibold"
        >
          <BiCategoryAlt size={"2rem"} color="#F5B340" />

          <Text>Danh sách sản phẩm </Text>
          <Text color="primary.main">{filterCate ? filterCate.name : ""}</Text>

          {filterCate ? (
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
          ) : (
            <></>
          )}
        </Flex>
        {products && products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <Box>
            {/* <Image
              loading="lazy"
              alt={"bean sorry"}
              src={sorryBean.src}
              width="110px"
              mx="auto"
            />{" "} */}
            <Text fontSize={"2xl"} textAlign="center">
              Danh mục {filterCate?.name} hiện không có sản phẩm vào lúc này 😓
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
}

export default CategoryProduct;

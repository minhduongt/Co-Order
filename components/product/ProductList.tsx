import { Box, Grid } from "@chakra-ui/react";
import { TProduct } from "types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products?: TProduct[];
  from?: any;
}

export default function ProductList({ products, from }: ProductListProps) {
  const proList = [...Array(12)].map((_, i) => {
    return {
      product_id: i,
      product_name: "test sp " + i,
      pic_url: "",
      price: 20000,
      product_type_id: 2,
      product_in_menu_id: i + 1,
    };
  });

  return (
    <Grid
      templateColumns={{
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(5, 1fr)",
      }}
      gap={{ md: 10, xl: 5 }}
      width="100%"
      paddingY={"0.5rem"}
      alignItems="center"
    >
      {proList.map((pro, index) => (
        <Box key={index}>
          <ProductCard product={pro} />
        </Box>
      ))}
    </Grid>
  );
}

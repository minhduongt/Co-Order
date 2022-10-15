import { Box, Grid } from "@chakra-ui/react";
import { TProduct } from "types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products?: TProduct[];
  from?: any;
}

export default function ProductList({ products, from }: ProductListProps) {
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
      {products?.map((pro, index) => (
        <Box key={index}>
          <ProductCard product={pro} />
        </Box>
      ))}
    </Grid>
  );
}

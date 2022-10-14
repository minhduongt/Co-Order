import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Text,
  Stack,
  Button,
  Image,
  SimpleGrid,
  Flex,
  VStack,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { Extra, TProduct } from "../../types/product";
import AddToCartWrapper from "components/cart/AddToCartWrapper";
import NoImage from "../../public/assets/image/noimage.png";

interface ProductDetailViewProps {
  product: TProduct;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const proExtras = product.extras;
  const proAttrs = product.attributes?.size;
  //states
  const [sizeValue, setSizeValue] = useState<string>(
    proAttrs ? proAttrs.split(",")[0] : "M"
  );
  const [extraList, setExtraList] = useState<Extra[]>([]);
  //
  //
  const handleCheckExtra = (newExtra: Extra) => {
    const checkExtraIndex = extraList.findIndex(
      (ex) => ex.product_id === newExtra.product_id
    );

    if (checkExtraIndex > -1) {
      setExtraList(
        extraList.filter((ex) => ex.product_id != newExtra.product_id)
      );
    } else {
      setExtraList([...extraList, newExtra]);
    }
  };

  const isMaster = product.product_type_id == 6 ? true : false;
  const childItem =
    isMaster &&
    product.child_products?.find((pro) => pro.attributes.size == sizeValue);

  return (
    <SimpleGrid columns={2} spacing={10} py={10}>
      <Flex>
        <Image
          rounded={"md"}
          alt={product.product_name_en}
          src={product?.pic_url}
          objectFit={"cover"}
          align={"center"}
          w={"100%"}
          h={{ md: "300px", lg: "500px" }}
          fallbackSrc={NoImage.src}
        />
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }} justifyContent="space-between">
        <Flex flexDirection={"column"} gap={10}>
          <Heading lineHeight={1.1} fontWeight={"semibold"} fontSize={"3xl"}>
            {product?.product_name}
          </Heading>
          <Text color={"secondary.main"} fontWeight={"bold"} fontSize={"3xl"}>
            {isMaster
              ? (childItem ? childItem.price : product.price).toLocaleString()
              : product.price.toLocaleString()}
            {" đ"}
          </Text>

          <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
            <VStack spacing={{ base: 4, sm: 6 }}></VStack>
            {product.description && (
              <Box>
                <Text fontSize={"xl"} fontWeight={"semibold"} mb={"4"}>
                  Mô tả:
                </Text>
                <Text fontSize={"xl"} mb={"4"}>
                  {product.description}
                </Text>
              </Box>
            )}

            {/* Select extra if any */}
            {proExtras && (
              <CheckboxGroup colorScheme="green" size={"lg"}>
                {proExtras.map((ex) => (
                  <Flex key={ex.product_id} justifyContent={"space-between"}>
                    <Flex>
                      <Checkbox onChange={() => handleCheckExtra(ex)}>
                        <Text fontSize={"xl"}>{ex.product_name}</Text>
                      </Checkbox>
                    </Flex>
                    <Text color="secondary.main" fontSize={"2xl"}>
                      {ex.price.toLocaleString()} {" đ"}
                    </Text>
                  </Flex>
                ))}
              </CheckboxGroup>
            )}
          </Stack>

          {/* Select size if any */}

          {product.product_type_id == 6 && (
            <Flex direction={"column"} gap={3}>
              <Text fontSize={"xl"} fontWeight="semibold">
                Chọn size:
              </Text>
              <RadioGroup
                value={sizeValue!}
                onChange={(e) => setSizeValue(e)}
                size="lg"
                colorScheme={"green"}
                color={"secondary.main"}
              >
                <Stack direction="row">
                  {product.attributes &&
                    product.attributes.size &&
                    product.attributes.size.split(",").map((size, index) => (
                      <Radio key={index} value={size}>
                        <Text fontSize={"xl"}>{"Size " + size}</Text>
                      </Radio>
                    ))}
                </Stack>
              </RadioGroup>
            </Flex>
          )}
        </Flex>
        <AddToCartWrapper
          extraList={extraList}
          size={sizeValue!}
          product={product}
        >
          <Button
            w={"full"}
            mt={8}
            size={"lg"}
            bg={"primary.main"}
            color={"light"}
            //textTransform={"uppercase"}
            _hover={{
              boxShadow: "lg",
            }}
          >
            Thêm vào giỏ
          </Button>
        </AddToCartWrapper>
      </Stack>
    </SimpleGrid>
  );
}

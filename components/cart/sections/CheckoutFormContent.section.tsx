import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineLike } from "react-icons/ai";
import useStoreLocations from "hooks/store/useStoreLocations";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CustomerInfo, OrderResponse } from "types/cart";
import { FormProvider, useForm } from "react-hook-form";
import CheckoutNotifyModal from "../CheckoutNotifyModal";
import useCheckout from "hooks/cart/useCheckout";
import { PostResponse } from "types/request";
import { mapCartModelToOrderRequest } from "hooks/cart/helper";
import useCartPrice from "hooks/cart/useCartPrice";
import useCartContext from "hooks/useCartContext";
import ChangeTimeModal from "../ChangeTimeModal";
import useAreaContext from "hooks/useAreaContext";

interface CheckoutFormContentProps {
  setStep: Dispatch<SetStateAction<number>>;
}

interface Suppliers {
  id: number;
  name: string;
}
interface CheckoutForm {
  supplier_id: number;
  content: string;
}

export default function CheckoutFormContent({
  setStep,
}: CheckoutFormContentProps) {
  //hooks
  const toast = useToast();
  const cartContext = useCartContext();
  const areaContext = useAreaContext();
  const currentCart = cartContext.cart;
  const { data: storeLocations } = useStoreLocations({ id: 150 });
  const { data: cartPrepare, error: prepareError } = useCartPrice(
    mapCartModelToOrderRequest(currentCart)
  );
  const { checkOut, errorRes } = useCheckout(currentCart);
  const [checkoutResMsg, setCheckoutResMsg] =
    useState<PostResponse<OrderResponse>>();
  //states
  const { selectedLocation } = areaContext;
  const [supplierList, setSupplierList] = useState<Suppliers[]>();
  const [isOpenNotify, setIsOpenNotify] = useState(false);
  //
  const { handleSubmit } = useForm<CheckoutForm>();
  const onCloseCheckoutNotify = () => {
    setIsOpenNotify(!isOpenNotify);
  };

  const onSubmit = (form: CheckoutForm) => {
    setIsOpenNotify(!isOpenNotify);
    setTimeout(async () => {
      const checkoutRes = await checkOut();
      if (checkoutRes) {
        setCheckoutResMsg(checkoutRes);
      }
      if (errorRes) {
        toast({
          title: errorRes.error?.code,
          status: "error",
          position: "bottom",
          isClosable: false,
          duration: 2000,
        });
      }
    }, 1000);
  };

  return (
    <ModalContent
      fontFamily={"beanoi"}
      bg={"primary.transparent"}
      justifyContent={"center"}
    >
      <ModalCloseButton />
      <Container maxW="3xl" border={"solid"} bg="light">
        {/* Review Cart */}
        <ModalHeader fontSize="3xl">
          Đơn hàng
          <Alert status="success" justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <AlertIcon />
              <Text fontSize={"2xl"}>
                {/* {"Bạn sẽ nhận vào lúc " + arrivedTimeRange} */}
              </Text>
            </Flex>
            <ChangeTimeModal>
              <Link>
                <Text fontSize={"xl"} color="link">
                  Đổi thời gian nhận
                </Text>
              </Link>
            </ChangeTimeModal>
          </Alert>
        </ModalHeader>

        <ModalBody pb={6}>
          <Divider borderColor={"dark"} />
          <Flex alignItems="center" gap={1} py={3}>
            <Text color="secondary.main" fontSize={"lg"}>
              Cùng xem lại đơn của bạn
            </Text>
            <AiOutlineLike />
          </Flex>

          <Flex flexDirection={"column"} fontSize={"2xl"} gap={1}>
            <Flex justifyContent="space-between" fontSize={"xl"}>
              <Text fontWeight={"semibold"}>Họ và tên:</Text>
              {/* <Text>{customer.name}</Text> */}
            </Flex>

            <Flex justifyContent="space-between" fontSize={"xl"}>
              <Text fontWeight={"semibold"}>Số điện thoại:</Text>
              {/* <Text>{customer.phone}</Text> */}
            </Flex>
            <Flex justifyContent="space-between" fontSize={"xl"}>
              <Text fontWeight={"semibold"}>Email:</Text>
              {/* <Text>{customer.email}</Text> */}
            </Flex>
          </Flex>

          <FormControl>
            <Divider borderColor={"dark"} mt={3} />
            <FormLabel fontSize="2xl">Sản phẩm trong giỏ:</FormLabel>
            {currentCart.items.map((item) => (
              <Box key={item.product.id}>
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  width="100%"
                  paddingY={"0.5rem"}
                >
                  <Flex gap={5}>
                    <Text fontSize={"lg"}>{item.quantity + " x "}</Text>
                    <Text fontSize={"xl"}>{item.product.product.name}</Text>
                  </Flex>

                  <Text textAlign={"right"} fontSize={"xl"}>
                    {item.product.price.toLocaleString()} đ
                  </Text>
                </Grid>
              </Box>
            ))}

            <Divider borderColor={"dark"} my={3} />

            {/* {cartPrepare ? ( */}
            <Flex flexDirection={"column"} gap={1}>
              <Flex justifyContent="space-between" fontSize={"xl"}>
                <Text>Tạm tính</Text>
                <Text>
                  {/* {cartPrepare.total_amount.toLocaleString()}  */}25000 đ
                </Text>
              </Flex>
              {/* {cartPrepare.other_amounts.map((other, index) => ( */}
              <Flex
                // key={index}
                justifyContent="space-between"
                fontSize={"xl"}
              >
                <Text>{/* {other.name} */}Phí giao</Text>
                <Text>{/* {other.amount.toLocaleString()} */}10000 đ</Text>
              </Flex>
              {/* ))} */}
              <Divider borderColor={"dark"} my={3} />
              <Flex
                justifyContent="space-between"
                fontSize={"3xl"}
                fontWeight="bold"
              >
                <Text>Tổng cộng:</Text>
                <Text>
                  {/* {cartPrepare.final_amount.toLocaleString()} */}100000 đ
                </Text>
              </Flex>
            </Flex>
            {/* ) : (
               <>
                 <SkeletonText h="20vh" noOfLines={4} spacing="10" />
               </>
             )} */}
          </FormControl>
          <Divider />
        </ModalBody>

        <ModalFooter>
          <Flex gap={3}>
            <Button
              //backgroundColor="light"
              //colorScheme={"dark"}
              fontSize="xl"
              onClick={() => setStep(1)}
            >
              Quay lại
            </Button>
            <CheckoutNotifyModal
              onClose={onCloseCheckoutNotify}
              open={isOpenNotify}
              checkoutRes={checkoutResMsg}
              receivedDestination={selectedLocation!}
              errorRes={errorRes}
            >
              <Button
                backgroundColor="primary.main"
                colorScheme={"primary.main"}
                fontSize="xl"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Chốt đơn
              </Button>
            </CheckoutNotifyModal>
          </Flex>
        </ModalFooter>
      </Container>
    </ModalContent>
  );
}

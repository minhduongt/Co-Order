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
  Select,
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
import useUserContext from "hooks/useUserContext";
import useTimeSlots from "hooks/menu/useTimeSlotMenu";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
interface CheckoutFormContentProps {
  // setStep: Dispatch<SetStateAction<number>>;
  onClose: VoidFunction;
}

interface Suppliers {
  id: number;
  name: string;
}
interface CheckoutForm {
  timeSlotId: string;
}
const checkoutSchema = yup.object().shape({
  name: yup.string().required("Hãy chọn giờ nhận hàng"),
});
export default function CheckoutFormContent({
  onClose,
}: CheckoutFormContentProps) {
  //hooks
  const toast = useToast();
  const cartContext = useCartContext();
  const areaContext = useAreaContext();
  const { user: currentUser, accessToken } = useUserContext();
  const currentCart = cartContext.cart;
  const menuId = areaContext.selectedMenu?.id;
  const locationId = areaContext.selectedLocation?.id;
  console.log("areaContext", areaContext);

  const { checkOut, errorRes } = useCheckout(currentCart);
  const { data: timeSlots } = useTimeSlots(menuId!);
  const [checkoutResMsg, setCheckoutResMsg] =
    useState<PostResponse<OrderResponse>>();
  //states
  const { selectedLocation } = areaContext;
  const [supplierList, setSupplierList] = useState<Suppliers[]>();
  const [isOpenNotify, setIsOpenNotify] = useState(false);
  //
  const checkoutForm = useForm<CheckoutForm>({
    resolver: yupResolver(checkoutSchema),
  });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>();
  const onCloseCheckoutNotify = () => {
    setIsOpenNotify(!isOpenNotify);
  };
  const onSubmit = (form: CheckoutForm) => {
    console.log("form", form);

    setIsOpenNotify(!isOpenNotify);
    setTimeout(async () => {
      const checkoutRes = await checkOut(
        form.timeSlotId,
        menuId!,
        locationId!,
        accessToken!
      );
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
      fontFamily={"coorder"}
      bg={"primary.transparent"}
      justifyContent={"center"}
    >
      <FormProvider {...checkoutForm}>
        <ModalCloseButton />
        <Container maxW="3xl" border={"solid"} bg="light">
          {/* Review Cart */}
          <ModalHeader fontSize="3xl">
            Đơn hàng
            <Alert status="success" justifyContent={"space-between"}>
              <Flex alignItems={"center"}>
                <AlertIcon />
                <Text fontSize={"2xl"}>{"Bạn sẽ nhận vào lúc: "}</Text>
              </Flex>
              <Flex w={"40%"}>
                <Select
                  // placeholder="Chọn giờ giao"
                  {...register("timeSlotId")}
                  sx={{ fontSize: "xl", borderColor: "primary.main" }}
                >
                  {timeSlots?.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.startTime.toString().slice(11, 19) +
                        " - " +
                        slot.endTime.toString().slice(11, 19)}
                    </option>
                  ))}
                  {errors.timeSlotId && (
                    <Alert status="error">
                      <AlertIcon />
                      <Text fontSize="xl">{errors.timeSlotId.message}</Text>
                    </Alert>
                  )}
                  {/* <option value="option2">Option 2</option>
                <option value="option3">Option 3</option> */}
                </Select>
              </Flex>

              {/* <ChangeTimeModal>
              <Link>
                <Text fontSize={"xl"} color="link">
                  Chọn thời gian nhận
                </Text>
              </Link>
            </ChangeTimeModal> */}
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
                <Text>{currentUser?.name}</Text>
              </Flex>

              <Flex justifyContent="space-between" fontSize={"xl"}>
                <Text fontWeight={"semibold"}>Số điện thoại:</Text>
                <Text>{currentUser?.phoneNumber}</Text>
              </Flex>
              <Flex justifyContent="space-between" fontSize={"xl"}>
                <Text fontWeight={"semibold"}>Email:</Text>
                <Text>{currentUser?.email}</Text>
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
                      {(item.product.price * item.quantity).toLocaleString()} đ
                    </Text>
                  </Grid>
                </Box>
              ))}

              <Divider borderColor={"dark"} my={3} />

              {/* {cartPrepare ? ( */}
              <Flex flexDirection={"column"} gap={1}>
                <Flex justifyContent="space-between" fontSize={"xl"}>
                  <Text fontWeight={600}>Tạm tính</Text>
                  <Text>{currentCart.total.toLocaleString()} đ</Text>
                </Flex>
                {/* {cartPrepare.other_amounts.map((other, index) => ( */}
                <Flex
                  // key={index}
                  justifyContent="space-between"
                  fontSize={"xl"}
                >
                  <Text fontWeight={600}>Phí giao</Text>
                  <Text>
                    {areaContext.selectedArea?.shippingFee.toLocaleString()} đ
                  </Text>
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
                    {(
                      currentCart.total + areaContext.selectedArea?.shippingFee!
                    ).toLocaleString()}{" "}
                    đ
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
                onClick={() => onClose()}
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
      </FormProvider>
    </ModalContent>
  );
}

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
  Select,
  Skeleton,
  SkeletonText,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineLike } from "react-icons/ai";
import React, { Dispatch, useEffect, useState } from "react";
import { OrderResponse } from "types/cart";
import { FormProvider, useForm } from "react-hook-form";
import CheckoutNotifyModal from "../CheckoutNotifyModal";
import useCheckout from "hooks/cart/useCheckout";
import { PostResponse, SecondResponse } from "types/request";
import useCartContext from "hooks/useCartContext";
import useAreaContext from "hooks/useAreaContext";
import useUserContext from "hooks/useUserContext";
import useTimeSlots from "hooks/menu/useTimeSlotMenu";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import useOrder from "hooks/order/useOrder";
import usePartyOrder from "hooks/order/usePartyOrder";
import { TOrderDetail, TPartyOrderDetail } from "types/order";
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
export default function CheckoutFormContent({
  onClose,
}: CheckoutFormContentProps) {
  //hooks
  const toast = useToast();
  const router = useRouter();
  const cartContext = useCartContext();
  const areaContext = useAreaContext();
  const { user: currentUser, accessToken } = useUserContext();
  const {
    cart: currentCart,
    SetPartyOrder,
    partyOrder,
    SetNewCart,
    SetIsHost,
  } = cartContext;
  const menuId = areaContext.selectedMenu?.id;
  const locationId = areaContext.selectedLocation?.id;

  const { checkOut, errorRes, createPartyOrder, joinPartyOrder } =
    useCheckout(currentCart);
  const { getOrderDetail } = useOrder();
  const { getPartyOrderDetail } = usePartyOrder();
  const { data: timeSlots } = useTimeSlots(menuId!);
  const [checkoutResMsg, setCheckoutResMsg] =
    useState<PostResponse<OrderResponse>>();
  const [orderDetail, setOrderDetail] = useState<TOrderDetail>();
  const [partyOrderDetail, setPartyOrderDetail] = useState<TPartyOrderDetail>();
  //states
  const { selectedLocation } = areaContext;
  const [supplierList, setSupplierList] = useState<Suppliers[]>();
  const [isOpenNotify, setIsOpenNotify] = useState(false);
  //
  const checkoutForm = useForm<CheckoutForm>();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>();
  const onCloseCheckoutNotify = () => {
    setIsOpenNotify(!isOpenNotify);
  };
  const currentTimeSlotId = watch("timeSlotId");
  useEffect(() => {
    console.log("currentTimeSlotId", currentTimeSlotId);
  }, [currentTimeSlotId]);

  const onSubmit = (form: CheckoutForm) => {
    try {
      if (!form.timeSlotId && !partyOrder) {
        toast({
          title: "Vui lòng chọn giờ nhận",
          status: "error",
          position: "top",
          isClosable: false,
          duration: 2000,
        });
        return;
      }
      setIsOpenNotify(!isOpenNotify);
      setTimeout(async () => {
        if (partyOrder) {
          const checkoutRes = await joinPartyOrder(
            partyOrder.id,
            partyOrder.shareLink,
            accessToken!
          );
          if (checkoutRes) {
            setCheckoutResMsg(checkoutRes);
            SetIsHost(true);
          }
          if (errorRes) {
            toast({
              title: errorRes?.message,
              status: "error",
              position: "bottom",
              isClosable: false,
              duration: 2000,
            });
          }
          // SetNewCart(null);
        } else {
          const checkoutRes = await checkOut(
            form.timeSlotId,
            menuId!,
            locationId!,
            accessToken!
          );
          if (checkoutRes) {
            const orderDetail = await getOrderDetail(
              checkoutRes.data.id,
              accessToken!
            );
            if (orderDetail) {
              console.log("orderDetail", orderDetail);
              setCheckoutResMsg(checkoutRes);
              setOrderDetail(orderDetail);
            }
          }
          if (errorRes) {
            toast({
              title: errorRes?.message,
              status: "error",
              position: "bottom",
              isClosable: false,
              duration: 2000,
            });
          }
          // SetNewCart(null);
        }
      }, 1000);
    } catch (error) {
      toast({
        title: error?.errorCode?.toString(),
        status: "error",
        position: "bottom",
        isClosable: false,
        duration: 2000,
      });
    }
  };
  const createParty = (form: CheckoutForm) => {
    try {
      if (!form.timeSlotId) {
        toast({
          title: "Vui lòng chọn giờ nhận",
          status: "error",
          position: "top",
          isClosable: false,
          duration: 2000,
        });
        return;
      }
      setIsOpenNotify(!isOpenNotify);
      setTimeout(async () => {
        const checkoutRes = await createPartyOrder(
          form.timeSlotId,
          menuId!,
          locationId!,
          accessToken!
        );
        if (checkoutRes?.data) {
          await SetPartyOrder(checkoutRes?.data);
          cartContext.onClose();
          router.push("/coorder");
        }
        if (errorRes) {
          toast({
            title: errorRes?.message,
            status: "error",
            position: "bottom",
            isClosable: false,
            duration: 2000,
          });
        }
        // SetNewCart(null);
      }, 1000);
    } catch (error) {
      toast({
        title: error?.errorCode?.toString(),
        status: "error",
        position: "bottom",
        isClosable: false,
        duration: 2000,
      });
    }
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
              {partyOrder ? (
                <Flex fontSize="xl">
                  {partyOrder?.timeSlot?.startTime.toString().slice(11, 19) +
                    " - " +
                    partyOrder?.timeSlot?.endTime.toString().slice(11, 19)}
                </Flex>
              ) : (
                <Flex w={"40%"}>
                  <Select
                    placeholder="Chọn giờ nhận"
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
                    {/* {errors.timeSlotId && (
                      <Alert status="error">
                        <AlertIcon />
                        <Text fontSize="xl">{errors.timeSlotId.message}</Text>
                      </Alert>
                    )} */}
                  </Select>
                </Flex>
              )}

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
            {partyOrder ? (
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
                  orderDetail={orderDetail}
                  partyOrder={partyOrder}
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
                    Chốt đơn vào phòng hiện tại
                  </Button>
                </CheckoutNotifyModal>
              </Flex>
            ) : (
              <Flex gap={3}>
                <Button
                  //backgroundColor="light"
                  //colorScheme={"dark"}
                  fontSize="xl"
                  onClick={() => onClose()}
                >
                  Quay lại
                </Button>
                <Button
                  backgroundColor="primary.main"
                  colorScheme={"primary.main"}
                  fontSize="xl"
                  type="submit"
                  onClick={handleSubmit(createParty)}
                >
                  Tạo phòng
                </Button>
                <CheckoutNotifyModal
                  onClose={onCloseCheckoutNotify}
                  open={isOpenNotify}
                  checkoutRes={checkoutResMsg}
                  orderDetail={orderDetail}
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
            )}
          </ModalFooter>
        </Container>
      </FormProvider>
    </ModalContent>
  );
}

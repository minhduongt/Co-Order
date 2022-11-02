import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Link,
  Select,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { mapCartModelToOrderRequest } from "hooks/cart/helper";
import useCartPrice from "hooks/cart/useCartPrice";
import useDeleteCartItem from "hooks/cart/useDeleteCartItem";
import useCartContext from "hooks/useCartContext";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { FaFire, FaShoppingCart } from "react-icons/fa";
import { CartItem, OrderResponse } from "types/cart";
import QuantityInput from "./QuantityInput";
import NoImage from "../../public/assets/image/noimage.png";
import useAreaContext from "hooks/useAreaContext";
import { FormProvider, useForm } from "react-hook-form";
import useUserContext from "hooks/useUserContext";
import useCheckout from "hooks/cart/useCheckout";
import useTimeSlots from "hooks/menu/useTimeSlotMenu";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PostResponse } from "types/request";
import CheckoutNotifyModal from "components/cart/CheckoutNotifyModal";
import { useRouter } from "next/router";
import usePartyOrder from "hooks/order/usePartyOrder";
import usePartyOrderDetail from "hooks/order/usePartyOrderDetail";

const items = [...Array(5)].map((_) => {
  return {
    title: "Cá hồi",
    price: 25000,
    image: "https://cloud.lunchon.ae/resized-images/560px/40291m.jpg",
    quantity: 5,
  };
});
const checkoutSchema = yup.object().shape({
  name: yup.string().required("Hãy chọn giờ nhận hàng"),
});
interface CheckoutForm {
  timeSlotId: string;
}
const Cart = () => {
  //hooks
  const toast = useToast();
  const router = useRouter();
  const cartContext = useCartContext();
  const areaContext = useAreaContext();
  const {
    cart: currentCart,
    partyOrder,
    SetPartyOrder,
    SetNewCart,
  } = cartContext;
  const totalCurrentCart = currentCart?.items.length;
  const { user: currentUser, accessToken } = useUserContext();
  const { selectedLocation } = areaContext;
  const { postId } = router.query;
  //states
  const [totalCartItems, setTotalCartItems] = useState<number>(0);

  const [checkoutResMsg, setCheckoutResMsg] =
    useState<PostResponse<OrderResponse>>();
  const { completePartyOrder, errorRes } = useCheckout(currentCart);
  const { data: partyDetail } = usePartyOrderDetail(
    partyOrder?.id!,
    accessToken!
  );
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
  useEffect(() => {
    setTotalCartItems(totalCurrentCart);
  }, [totalCurrentCart]);

  useEffect(() => {
    console.log("partyDetail", partyDetail);
  }, [partyDetail]);

  const deleteItem = useDeleteCartItem;

  const handleDeleteCartItem = async (cartItem: CartItem) => {
    try {
      const newCart = deleteItem(cartItem, currentCart);
      await cartContext.SetNewCart(newCart);
      toast({
        title: `Đã xóa ${cartItem.product?.product?.name} khỏi giỏ hàng`,
        status: "warning",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: `Có lỗi xảy ra`,
        status: "error",
        position: "top-right",
        isClosable: false,
        duration: 1000,
      });
    }
  };
  const handleCompletePartyOrder = () => {
    setTimeout(async () => {
      const res = await completePartyOrder(partyOrder?.id!, accessToken!);
      if (res) {
        toast({
          title: "Chốt đơn thành công",
          status: "success",
          position: "top",
          isClosable: false,
          duration: 2000,
        });
        SetPartyOrder(null);
        SetNewCart(null);
      }
      if (errorRes) {
        toast({
          title: errorRes?.message,
          status: "error",
          position: "top",
          isClosable: false,
          duration: 2000,
        });
      }
    }, 1000);
  };

  const copy = async () => {
    if (window) {
      await navigator.clipboard.writeText(
        `${window.location.origin}/coorder/${partyOrder?.shareLink!}`
      );
      toast({
        title: "Đã sao lưu vào bộ nhớ tạm",
        status: "success",
        position: "bottom",
        isClosable: false,
        duration: 2000,
      });
    } else {
      await navigator.clipboard.writeText(partyOrder?.shareLink!);
      toast({
        title: "Đã sao lưu vào bộ nhớ tạm",
        status: "success",
        position: "bottom",
        isClosable: false,
        duration: 2000,
      });
    }
  };
  return (
    <Box>
      <Flex flexDirection={"column"}>
        <Flex fontSize={"xl"}>
          <Text>Mã đơn: {partyOrder?.orderCode}</Text>
        </Flex>
        <Flex fontSize={"xl"}>
          <Text>
            Trạng thái:{" "}
            {partyOrder?.status == "WAITING" ? "Đang chờ" : "Hoàn thành"}
          </Text>
        </Flex>
        <Flex fontSize={"xl"}>
          <Text>Điểm giao: {partyDetail?.receiveAddress}</Text>
        </Flex>
        <Flex fontSize={"xl"}>
          <Text>Giờ nhận: {partyDetail?.receiveTime}</Text>
        </Flex>
        <Flex gap={3} fontSize={"xl"} p={4} alignItems="center">
          <Text>Mã phòng:</Text>
          <Box>
            <Tag sx={{ fontSize: "xl" }}>{partyOrder?.shareLink}</Tag>
          </Box>
          <Button onClick={copy}>Copy link</Button>
        </Flex>
      </Flex>
      <Container maxW="7xl" minH={"30vh"} border="groove" borderRadius={"12px"}>
        {partyDetail?.partyDetails.map((detail) => {
          return (
            <Flex
              key={detail.customerCode}
              justifyContent={"space-between"}
              alignItems="center"
              fontSize="xl"
              m={3}
            >
              <Flex alignItems="center" gap={3}>
                <Avatar
                  size={"lg"}
                  src={
                    "http://uxpanol.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                  }
                />
                <Text>{detail.customerCode}</Text>
              </Flex>

              <Flex>Các món đang chọn</Flex>
            </Flex>
          );
        })}
      </Container>
      <Flex justifyContent={"space-between"} paddingY="2rem">
        <Heading fontSize={"3xl"}>
          <Flex alignItems={"center"} gap={2}>
            <FaShoppingCart color="#2689E0" />
            <Text>Giỏ hàng của bạn</Text>
          </Flex>
        </Heading>
        {/* <Flex alignItems={"center"} color="secondary.main">
          <FaFire size="1.2rem" />
          <NextLink passHref href="/">
            <Link>Đặt thêm món</Link>
          </NextLink>
        </Flex> */}
      </Flex>
      {totalCartItems > 0 ? (
        currentCart?.items?.map((item, index) => (
          <Box key={index + item.product?.id} paddingY={"0.3rem"}>
            <Box
              key={index}
              width={"100%"}
              display={"flex"}
              // border="groove"
              px="1.5rem"
              backgroundColor="light"
              paddingY={"1rem"}
              borderStyle="solid"
              borderWidth={"5px"}
              borderRadius="12px"
            >
              {/* <NextLink passHref href={"#"}>
                <Link _hover={{ textDecoration: "none" }}> */}
              <Box
                overflow="hidden"
                borderRadius={"1rem"}
                maxHeight={{
                  xs: "5rem",
                  sm: "6rem",
                }}
                minHeight={{
                  xs: "5rem",
                  sm: "6rem",
                }}
                minWidth={{
                  xs: "7rem",
                  sm: "9rem",
                }}
                maxWidth={{
                  xs: "7rem",
                  sm: "9rem",
                }}
                backgroundColor={"gray.200"}
              >
                <Image
                  src={item.product.product?.imageUrl}
                  fallbackSrc={NoImage.src}
                  alt={"image"}
                  objectFit={"cover"}
                  transform="scale(1.0)"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                />
              </Box>
              {/* </Link>
              </NextLink> */}

              <Grid
                templateColumns="repeat(2, 1fr)"
                gap={6}
                width="100%"
                paddingX={"1rem"}
                paddingY={"0.5rem"}
                alignItems="center"
              >
                <Flex flexDirection={"column"}>
                  <Text
                    color="primary.darker"
                    fontSize="2xl"
                    alignSelf={"flex-start"}
                  >
                    {item.product.product?.name}
                  </Text>
                  <Text
                    color="primary.darker"
                    fontSize="xl"
                    alignSelf={"flex-start"}
                  >
                    x {item.quantity}
                  </Text>
                </Flex>

                <Text fontSize="xl" fontWeight={"600"}>
                  {(item.product?.price * item.quantity).toLocaleString()} đ
                </Text>
                <Box minWidth={"10rem"}>
                  {/* <QuantityInput quantity={item.quantity} /> */}
                </Box>

                {/* <IconButton
                    onClick={() => handleDeleteCartItem(item)}
                    justifySelf={"flex-end"}
                    width={"1rem"}
                    colorScheme="red"
                    aria-label="remove-item"
                    icon={<SmallCloseIcon />}
                  /> */}
              </Grid>
              {/*  Check out */}
            </Box>
          </Box>
        ))
      ) : (
        <Flex w="100%" h="100%" justifyContent={"center"} alignItems="center">
          <Box maxW="50%" textAlign={"center"}>
            <Text fontSize={"3xl"}>Giỏ hàng trống</Text>
            {/* <Image
                    loading="lazy"
                    alt={"empty cart"}
                    src={beanEmpty.src}
                    w="100%"
                    h="250px"
                  /> */}
            <Text>Hãy thêm món bạn thích vào nhé!</Text>
          </Box>
        </Flex>
      )}

      {totalCartItems > 0 && (
        <Flex
          minHeight={"20vh"}
          flexDirection="column"
          justifyContent={"space-between"}
          padding="1rem"
        >
          {/* {cartPrepareRes ? ( */}
          <>
            <Flex
              height={"auto"}
              border={"groove"}
              borderRadius={8}
              paddingX="1rem"
              paddingY="0.5rem"
              justifyContent={"space-between"}
              flexDirection="column"
            >
              {/* <Box>
                    <Flex justifyContent="space-between" fontSize={"xl"}>
                      <Text>{"Tạm tính:"}</Text>
                      <Text>
                        {cartPrepareRes.total_amount.toLocaleString()} đ
                      </Text>
                    </Flex>

                    {cartPrepareRes.other_amounts.map((other, index) => (
                      <Flex
                        key={index}
                        justifyContent="space-between"
                        fontSize={"xl"}
                      >
                        <Text>{other.name}</Text>
                        <Text> {other.amount.toLocaleString()} đ</Text>
                      </Flex>
                    ))}
                  </Box> */}
              <Flex
                justifyContent="space-between"
                fontSize={"xl"}
                // fontWeight="bold"
              >
                <Text>{"Tạm tính:"}</Text>
                <Text>{currentCart?.total.toLocaleString()} đ</Text>
              </Flex>
              <Flex
                justifyContent="space-between"
                fontSize={"xl"}
                // fontWeight="bold"
              >
                <Text>{"Phí giao hàng:"}</Text>
                <Text>
                  {areaContext?.selectedArea?.shippingFee.toLocaleString()} đ
                </Text>
              </Flex>
              <Divider my={1} />
              <Flex
                justifyContent="space-between"
                fontSize={"2xl"}
                fontWeight="bold"
              >
                <Text>{"Tổng cộng:"}</Text>
                <Text>
                  {(
                    currentCart?.total + areaContext?.selectedArea?.shippingFee!
                  ).toLocaleString()}{" "}
                  đ
                </Text>
              </Flex>
              <Flex
                width="100%"
                justifyContent={"space-between"}
                alignItems="center"
                pt={10}
                fontSize="xl"
              >
                {/* <Flex
                    width="40%"
                    justifyContent={"space-between"}
                    alignItems="center"
                  >
                    <Text minW={{ lg: "12rem" }}>Bạn sẽ nhận vào lúc:</Text>
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
                    </Select>
                  </Flex> */}
                <Flex w="40%">
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
                      w={"100%"}
                      onClick={handleCompletePartyOrder}
                    >
                      Chốt đơn nhóm
                    </Button>
                  </CheckoutNotifyModal>
                </Flex>
              </Flex>
            </Flex>
            {/*  Check out */}
          </>
          {/* ) : (
                <>
                  <SkeletonText h="20vh" noOfLines={4} spacing="7" mx="1rem" />
                  <Skeleton h="5vh" mx="1rem" mb="2rem" />
                </>
              )} */}
        </Flex>
      )}
    </Box>
  );
};

export default Cart;

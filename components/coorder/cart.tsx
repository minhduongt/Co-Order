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
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import useDeleteCartItem from "hooks/cart/useDeleteCartItem";
import useCartContext from "hooks/useCartContext";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { FaFire, FaShoppingCart } from "react-icons/fa";
import { CartItem, OrderResponse } from "types/cart";
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
import { getOrderStatus, OrderStatusEnum } from "types/constant";
import RecipientModal from "./sections/RecipientModal";
import { MdGroup } from "react-icons/md";
import useCompletePartyOrder from "hooks/order/useUpdatePartyOrder";
import useCustomer from "hooks/customer/useCustomer";
import Countdown from "react-countdown";
import { TCustomer } from "types/customer";
import { TPartyOrderDetail } from "types/order";

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
    SetIsHost,
    isHost,
  } = cartContext;
  const totalCurrentCart = currentCart?.items.length;
  const { user: currentUser, accessToken } = useUserContext();
  const { selectedLocation } = areaContext;
  const { orderId } = router.query;
  //states
  const [totalCartItems, setTotalCartItems] = useState<number>(0);
  const [customerList, setCustomerList] = useState<TCustomer[]>([]);
  const [partyDetailInterval, setPartyDetailInterval] = useState<any>();
  const [checkoutResMsg, setCheckoutResMsg] =
    useState<PostResponse<OrderResponse>>();
  const { errorRes } = useCheckout(currentCart);
  const {
    data: partyDetail,
    refetch: refetchPartyDetail,
    error: partyDetailError,
  } = usePartyOrderDetail(
    partyOrder ? partyOrder?.id!.toString() : (orderId! as string),
    accessToken!
  );
  const { getCustomerInfo } = useCustomer();
  const { finishPartyOrder } = usePartyOrder();
  const [isOpenNotify, setIsOpenNotify] = useState(false);
  //
  const checkoutForm = useForm<CheckoutForm>({
    resolver: yupResolver(checkoutSchema),
  });
  const copy = async () => {
    if (window) {
      await navigator.clipboard.writeText(
        `${
          window.location.origin
        }/joinparty?shareLink=${partyDetail?.shareLink!}`
      );
      toast({
        title: "Đã sao lưu vào bộ nhớ đệm",
        status: "success",
        position: "bottom",
        isClosable: false,
        duration: 2000,
      });
    } else {
      await navigator.clipboard.writeText(partyDetail?.shareLink!);
      toast({
        title: "Đã sao lưu vào bộ nhớ đệm",
        status: "success",
        position: "bottom",
        isClosable: false,
        duration: 2000,
      });
    }
  };

  const countdownRender = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      console.log("finish");
      setTimeout(() => {
        SetPartyOrder(null);
        SetNewCart(null);
        SetIsHost(false);
        router.push(`/`);
      }, 4000);

      // Render a completed state
      return (
        <Flex>
          <Text>Party đã hết hạn, tự động trở về trang chủ sau 3 giây</Text>
        </Flex>
      );
    } else {
      // Render a countdown
      return (
        <Flex color={"primary.dark"}>
          {hours < 10 ? "0" + hours : hours}:{" "}
          {minutes < 10 ? "0" + minutes : minutes}:{" "}
          {seconds < 10 ? "0" + seconds : seconds}
        </Flex>
      );
    }
  };

  const onCloseCheckoutNotify = () => {
    setIsOpenNotify(!isOpenNotify);
  };

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
  const handleFinishPartyOrder = async () => {
    try {
      const res = await finishPartyOrder(partyDetail?.id!, accessToken!);
      if (res) {
        toast({
          title: "Chốt đơn thành công",
          status: "success",
          position: "top",
          isClosable: false,
          duration: 2000,
        });
      } else {
        toast({
          title: "Có lỗi xảy ra",
          status: "error",
          position: "top",
          isClosable: false,
          duration: 2000,
        });
      }

      await SetPartyOrder(null);
      await SetNewCart(null);
      await SetIsHost(false);
      router.push(`/`);
    } catch (error) {
      toast({
        title: error?.message,
        status: "error",
        position: "top",
        isClosable: false,
        duration: 2000,
      });
    }
  };

  const getCustomerInfos = (partyDetail: TPartyOrderDetail) => {
    let newCustomerList: TCustomer[] = [];
    partyDetail.partyDetails.map((detail) => {
      const userInfoPromise = getCustomerInfo({
        params: { "customer-code": detail.customerCode },
      }).then((res: any) => {
        newCustomerList.push(res);
      });
    });
    setCustomerList(newCustomerList);
  };

  useEffect(() => {
    setTotalCartItems(totalCurrentCart);
  }, [totalCurrentCart]);
  // useEffect(() => {
  //   if (!orderId || orderId == "") router.replace("/");
  // }, [orderId]);

  useEffect(() => {
    if (partyDetail) {
      getCustomerInfos(partyDetail);
    }
  }, [partyDetail]);

  // useEffect(() => {
  //   if (orderId) {
  //     console.log("orderId", orderId);
  //   }
  // }, [orderId]);

  useEffect(() => {
    if (partyDetailError) {
      console.log("partyDetailError", partyDetailError);
      toast({
        title: partyDetailError.message,
        status: "error",
        position: "top",
        isClosable: false,
        duration: 1000,
      });
    }
    // clearInterval(partyDetailInterval);
  }, [partyDetailError]);

  //Call party order detail every 5s
  useEffect(() => {
    const newRefetchPartyInterval = setInterval(refetchPartyDetail, 5000);
    setPartyDetailInterval(newRefetchPartyInterval);
    return () => clearInterval(newRefetchPartyInterval);
  }, []);
  const finishTime = new Date(partyDetail?.endTime.slice(0, 19)!);

  return (
    <>
      {partyDetail ? (
        <Box>
          <Flex flexDirection={"column"}>
            <Flex fontSize={"xl"} gap={2}>
              <Text>Mã đơn: </Text>
              <Text fontWeight={600}>{partyDetail?.orderCode ?? "NaN"}</Text>
            </Flex>
            <Flex fontSize={"xl"} gap={2}>
              <Text>Trạng thái: </Text>
              <Text fontWeight={600}>
                {getOrderStatus(partyDetail?.status!)}
              </Text>
            </Flex>
            <Flex fontSize={"xl"} gap={2}>
              <Text>Điểm giao: </Text>
              <Text fontWeight={600}>
                {partyDetail?.receiveAddress ?? "NaN"}
              </Text>
            </Flex>
            <Flex fontSize={"xl"} gap={2}>
              <Text>Giờ nhận: </Text>
              <Text fontWeight={600}>{partyDetail?.receiveTime ?? "NaN"}</Text>
            </Flex>
            <Flex fontSize={"xl"} gap={2}>
              <Text>Party kết thúc sau: </Text>
              <Countdown date={finishTime} renderer={countdownRender} />
            </Flex>
            <Flex
              gap={2}
              fontSize={"xl"}
              p={6}
              alignItems="center"
              alignSelf={"center"}
            >
              <Text>Mã phòng:</Text>
              <Box>
                <Tag sx={{ fontSize: "xl" }}>
                  {partyDetail?.shareLink ?? "NaN"}
                </Tag>
              </Box>
              <Button onClick={copy} disabled={partyDetail == null}>
                Copy link
              </Button>
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"} paddingY="2rem">
            <Heading fontSize={"3xl"}>
              <Flex alignItems={"center"} gap={2}>
                <MdGroup color="#2689E0" />
                <Text>Party</Text>
              </Flex>
            </Heading>
            {/* <Flex alignItems={"center"} color="secondary.main">
          <FaFire size="1.2rem" />
          <NextLink passHref href="/">
            <Link>Đặt thêm món</Link>
          </NextLink>
        </Flex> */}
          </Flex>
          <Container
            maxW="7xl"
            minH={"30vh"}
            border="groove"
            borderRadius={"12px"}
          >
            <Flex flexDirection="column">
              <Grid
                templateColumns={{
                  md: "repeat(2, 1fr)",
                  lg: "repeat(2, 1fr)",
                  xl: "repeat(2, 1fr)",
                }}
                fontSize="xl"
                m={3}
                justifyContent={"space-between"}
                alignItems="center"
                fontWeight={600}
              >
                <Flex alignItems="center" gap={3} w="100%">
                  <Text fontSize={"2xl"}>Người dùng</Text>
                </Flex>
                <Flex justifyContent={"space-between"} w="100%">
                  <Flex flexDirection={"column"} alignItems={"flex-start"}>
                    <Text fontSize={"2xl"}>Các món</Text>
                  </Flex>
                  <Flex flexDirection={"column"} alignItems={"flex-end"}>
                    <Text fontSize={"2xl"}>Tạm tính</Text>
                  </Flex>
                </Flex>
              </Grid>
              {partyDetail ? (
                partyDetail?.partyDetails.map((detail, index) => {
                  return (
                    <Box key={index + detail.customerCode}>
                      <Grid
                        templateColumns={{
                          md: "repeat(2, 1fr)",
                          lg: "repeat(2, 1fr)",
                          xl: "repeat(2, 1fr)",
                        }}
                        fontSize="xl"
                        m={3}
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        {customerList?.length > 0 ? (
                          customerList?.map((cus) => {
                            if (cus.code == detail.customerCode)
                              return (
                                <Flex alignItems="center" gap={3} w="100%">
                                  <Avatar
                                    size={"lg"}
                                    src={
                                      "http://uxpanol.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                                    }
                                  />
                                  <Text>{cus.fullName}</Text>
                                </Flex>
                              );
                          })
                        ) : (
                          <Flex alignItems={"center"} gap={3}>
                            <SkeletonCircle
                              sx={{ height: "3.5rem", width: "10%" }}
                            />
                            <Skeleton w={"40%"} h={"2rem"} />
                          </Flex>
                        )}

                        <Flex w="100%" flexDirection={"column"}>
                          {detail.itemsList.map((item, index) => {
                            return (
                              <Flex
                                key={index + item.productName}
                                justifyContent={"space-between"}
                              >
                                <Flex
                                  fontSize="xl"
                                  alignItems={"flex-start"}
                                  // flexDirection={"column"}
                                >
                                  <Text>
                                    {"x" + item.quantity} {item.productName}
                                  </Text>
                                </Flex>
                                <Flex
                                  fontSize="xl"

                                  // flexDirection={"column"}
                                >
                                  <Text>
                                    {(
                                      item.unitPrice * item.quantity
                                    ).toLocaleString()}{" "}
                                    đ
                                  </Text>
                                </Flex>
                              </Flex>
                            );
                          })}
                        </Flex>
                      </Grid>

                      {index != partyDetail?.partyDetails.length - 1 ? (
                        <Divider sx={{ borderColor: "black" }} />
                      ) : (
                        <></>
                      )}
                    </Box>
                  );
                })
              ) : (
                <Flex
                  alignItems={"center"}
                  justifyContent="center"
                  fontSize={"2xl"}
                >
                  Trống
                </Flex>
              )}
              <Flex alignSelf={"center"} mt="1.5rem" p={3}>
                {partyDetail ? (
                  <RecipientModal recipients={partyDetail?.recipients!}>
                    <Button>Xem hóa đơn chia tiền</Button>
                  </RecipientModal>
                ) : (
                  <></>
                )}
              </Flex>
            </Flex>
          </Container>
          {/* <Flex justifyContent={"space-between"} paddingY="2rem">
        <Heading fontSize={"3xl"}>
          <Flex alignItems={"center"} gap={2}>
            <FaShoppingCart color="#2689E0" />
            <Text>Giỏ hàng của bạn</Text>
          </Flex>
        </Heading>
      </Flex> */}

          {/* <Box key={index + item.product?.id} paddingY={"0.3rem"}>
            <Flex
              key={index}
              width={"100%"}
              gap={3}
              // border="groove"
              px="1rem"
              backgroundColor="light"
              paddingY={"1rem"}
              borderStyle="solid"
              borderWidth={"5px"}
              borderRadius="12px"
            >
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

              <Grid
                templateColumns="repeat(2, 1fr)"
                gap={6}
                width="100%"
                paddingY={"0.5rem"}
                alignItems="center"
                justifyContent={"space-between"}
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

                <Text fontSize="xl" fontWeight={"600"} textAlign="right">
                  {(item.product?.price * item.quantity).toLocaleString()} đ
                </Text>

              </Grid>
            </Flex>
          </Box>


        <Flex w="100%" h="100%" justifyContent={"center"} alignItems="center">
          <Box maxW="50%" textAlign={"center"}>
            <Text fontSize={"3xl"}>Giỏ hàng trống</Text>
            {/* <Image
                    loading="lazy"
                    alt={"empty cart"}
                    src={beanEmpty.src}
                    w="100%"
                    h="250px"
                  /> 
            <Text>Hãy thêm món bạn thích vào nhé!</Text>
          </Box>
        </Flex> */}

          <Flex
            minHeight={"20vh"}
            flexDirection="column"
            justifyContent={"space-between"}
          >
            {/* {cartPrepareRes ? ( */}
            <>
              {/* <Flex
              height={"auto"}
              border={"groove"}
              borderRadius={8}
              paddingX="1rem"
              paddingY="0.5rem"
              justifyContent={"space-between"}
              flexDirection="column"
            >
              <Box>
                <Flex justifyContent="space-between" fontSize={"xl"}>
                  <Text>{"Tạm tính:"}</Text>
                  <Text>{cartPrepareRes.total_amount.toLocaleString()} đ</Text>
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
              </Box>
              <Flex
                justifyContent="space-between"
                fontSize={"xl"}
                // fontWeight="bold"
              >
                <Text>{"Tạm tính:"}</Text>
                <Text>{partyDetail?.totalAmount.toLocaleString()} đ</Text>
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
                <Text>{partyDetail?.finalAmount.toLocaleString()}đ</Text>
              </Flex>
              <Flex
                width="100%"
                justifyContent={"space-between"}
                alignItems="center"
                pt={10}
                fontSize="xl"
              >
                <Flex
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
                </Flex>
              </Flex>
            </Flex> */}
              {/* {isHost && ( */}
              <Flex w="100%" pt={"1rem"}>
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
                    h="5vh"
                    onClick={handleFinishPartyOrder}
                  >
                    Chốt đơn nhóm
                  </Button>
                </CheckoutNotifyModal>
              </Flex>
              {/* )} */}
              {/*  Check out */}
            </>
            {/* ) : (
                <>
                  <SkeletonText h="20vh" noOfLines={4} spacing="7" mx="1rem" />
                  <Skeleton h="5vh" mx="1rem" mb="2rem" />
                </>
              )} */}
          </Flex>
        </Box>
      ) : (
        <Flex>
          <Skeleton w="90vw" h="20rem" px="1rem" />
          <Skeleton w="90vw" h="20rem" px="1rem" />
        </Flex>
      )}
    </>
  );
};

export default Cart;

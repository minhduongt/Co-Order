import React, { Component, useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Alert,
  AlertIcon,
  PinInput,
  PinInputField,
  Spacer,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/router";
import useLocalStorage from "hooks/useLocalStorage";
import {
  signInWithGoogle,
  signInWithPhone,
  auth,
} from "../../firebase/authentication";
import { FcGoogle } from "react-icons/fc";
import Firebase from "../../firebase/firebase";
import firebase from "firebase/compat/app";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthorize from "hooks/auth/useAuth";
import useUserContext from "hooks/useUserContext";
interface AuthenForm {
  phone: string;
  otp: string;
}
const phoneRegExp = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;
const authenSchema1 = yup.object().shape({
  phone: yup
    .string()
    .required("Hãy điền vào Số Điện Thoại")
    .matches(phoneRegExp, "Hãy đúng dạng Số Điện Thoại"),
});
const authenSchema2 = yup.object().shape({
  otp: yup.string().required("Hãy điền vào OTP"),
});

function Authenticate() {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const { authorize } = useAuthorize();
  const [confirm, setConfirm] = useState<firebase.auth.ConfirmationResult>();
  const authenForm = useForm<AuthenForm>({
    resolver:
      step == 1 ? yupResolver(authenSchema1) : yupResolver(authenSchema2),
  });
  const { SetUser, SetAccessToken, SetRefreshToken } = useUserContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = authenForm;

  useEffect(() => {
    // init captcha object
    if (typeof window !== "undefined") {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "captchaContainer",
        {
          size: "invisible",
          callback: (res) => {
            console.log("recapcha res", res);
          },
        }
      );
    }
  }, []);

  const LoginWithPhone = async (form: AuthenForm) => {
    // get captcha object

    if (typeof window !== "undefined") {
      const appVerifier = window.recaptchaVerifier;
      try {
        const phoneNumber = form.phone.replace("0", "+84");
        const confirm = await firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier);
        setConfirm(confirm);
        setStep(2);
      } catch (error) {
        toast({
          title: "Có lỗi xảy ra",
          status: "error",
          position: "top-right",
          isClosable: false,
          duration: 2000,
        });
        console.log("error", error);
      }
    } else {
      const phoneNumber = form.phone.replace("0", "+84");
      console.log("phoneNumber", phoneNumber);
      setStep(2);
    }
  };

  const VerifyCode = async () => {
    await confirm
      ?.confirm(otp)
      .then(async function (result) {
        // User signed in successfully.
        const user = result.user;
        if (user) {
          const res = await authorize(await user.getIdToken()!);
          if (res.status === 200) {
            setAccessToken(res.data.data.accessToken);
            SetRefreshToken(res.data.data.refreshToken);
            console.log("accessToken", res.data.data.accessToken);

            toast({
              title: "Đăng nhập thành công!",
              status: "success",
              position: "top-right",
              isClosable: false,
              duration: 2000,
            });
            console.log("authorize", res);
          } else {
            toast({
              title: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!",
              status: "error",
              position: "top-right",
              isClosable: false,
              duration: 2000,
            });
          }
          console.log(result);
        }
        // ...
      })
      .catch(function (error) {
        console.log(error);
        // User couldn't sign in (bad verification code?)
        // ...
        toast({
          title: "Sai mã xác thực",
          status: "error",
          position: "top-right",
          isClosable: false,
          duration: 2000,
        });
      });
  };

  const LoginWithGoogle = () => {
    signInWithGoogle()
      .then(async (result) => {
        console.log(result);
        const user = result.user;
        if (user) {
          try {
            const res = await authorize(await user.getIdToken()!);
            if (res.status === 200) {
              setAccessToken(res.data.data.accessToken);
              SetRefreshToken(res.data.data.refreshToken);
              console.log("accessToken", res.data.data.accessToken);

              toast({
                title: "Đăng nhập thành công!",
                status: "success",
                position: "top-right",
                isClosable: false,
                duration: 2000,
              });
              console.log("authorize", res);
              router.push("/");
            } else {
              toast({
                title: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!",
                status: "error",
                position: "top-right",
                isClosable: false,
                duration: 2000,
              });
            }
          } catch (error) {
            toast({
              title: "Có lỗi xảy ra!",
              status: "error",
              position: "top-right",
              isClosable: false,
              duration: 2000,
            });
            console.log("error", error);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Đăng nhập thất bại",
          status: "error",
          position: "top-right",
          isClosable: false,
          duration: 2000,
        });
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Chào mừng bạn đến Co-Order</Heading>
          <Flex flexDirection={"row"}>
            <Text fontSize={"xl"} color={"gray.600"}>
              Đặt món cùng nhau dễ dàng hơn ✌️
              {/* <Text color={"blue.400"}></Text> */}
            </Text>
          </Flex>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormProvider {...authenForm}>
              <FormControl>
                {step == 1 && (
                  <>
                    <FormLabel>Số điện thoại</FormLabel>
                    <Input
                      sx={{ mt: 4 }}
                      placeholder="Ex: +84939456738"
                      {...register("phone")}
                    />
                    {/* <Spacer></Spacer> */}

                    {errors.phone && (
                      <Alert
                        status="error"
                        sx={{ maxH: "2em", marginY: "1em" }}
                      >
                        <AlertIcon />
                        <Text fontSize="md">{errors.phone.message}</Text>
                      </Alert>
                    )}
                    <Stack sx={{ my: 4 }} spacing={10}>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        onClick={handleSubmit(LoginWithPhone)}
                      >
                        Tiếp theo
                      </Button>
                    </Stack>
                  </>
                )}
                {step == 2 && (
                  <>
                    <FormLabel>Mã OTP</FormLabel>
                    {/* <Input {...register("otp")} /> */}
                    <PinInput onChange={(value) => setOtp(value)}>
                      {[...Array(6)].map((_, i) => (
                        <PinInputField sx={{ mx: 4 }} key={i} />
                      ))}
                    </PinInput>
                    {/* {errors.otp && (
                      <Alert
                        status="error"
                        sx={{ maxH: "2em", marginY: "1em" }}
                      >
                        <AlertIcon />
                        <Text fontSize="md">{errors.otp.message}</Text>
                      </Alert>
                    )} */}
                    <Stack sx={{ mt: 8 }} spacing={10}>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        onClick={VerifyCode}
                      >
                        Xác nhận
                      </Button>
                    </Stack>
                  </>
                )}
              </FormControl>
            </FormProvider>
          </Stack>
          <div id="captchaContainer" />
        </Box>
        <Flex sx={{ fontSize: "1em", justifyContent: "center" }}>
          Hoặc bạn có thể:
        </Flex>
        <Button
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          onClick={LoginWithGoogle}
        >
          <Flex gap={2} sx={{ alignItems: "center" }}>
            <FcGoogle />
            <Text>Đăng nhập với Google</Text>
          </Flex>
        </Button>
      </Stack>
    </Flex>
  );
}

export default Authenticate;

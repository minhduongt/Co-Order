import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Text,
} from "@chakra-ui/react";

import React, { SetStateAction, useState, Dispatch } from "react";

import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useStoreLocations from "hooks/store/useStoreLocations";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface CustomerForm {
  destination_location_id: number;
  email: string;
  name: string;
  phone: string;
}

interface CheckoutModalButtonProps {
  onClose: VoidFunction;
  setStep: Dispatch<SetStateAction<number>>;
  setCustomerInfo: Dispatch<SetStateAction<CustomerForm>>;
}

const phoneRegExp = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;
const checkoutSchema = yup.object().shape({
  destination_location_id: yup.number().positive().integer().required(),
  name: yup
    .string()
    .required("Hãy điền vào Họ và Tên")
    .min(2, "Ít nhất 2 ký tự"),
  phone: yup
    .string()
    .required("Hãy điền vào Số Điện Thoại")
    .matches(phoneRegExp, "Hãy đúng dạng Số Điện Thoại"),
  email: yup
    .string()
    .required("Hãy điền vào Email")
    .email("Hãy đúng dạng email"),
});

export default function CustomerFormContent({
  onClose,
  setCustomerInfo,
  setStep,
}: CheckoutModalButtonProps) {
  const storeId = 150;
  //hooks
  const customerForm = useForm<CustomerForm>({
    defaultValues: {
      destination_location_id: 23,
    },
    resolver: yupResolver(checkoutSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = customerForm;

  const onSubmit = async (customer: CustomerForm) => {
    setCustomerInfo(customer);
    setStep(2);
  };
  const { data: storeLocations } = useStoreLocations({ id: storeId });
  //states
  //

  const storeLocation = storeLocations?.map((storeLoc) => storeLoc);

  return (
    <FormProvider {...customerForm}>
      <ModalContent
        fontFamily={"beanoi"}
        bg="primary.transparent"
        justifyContent={"center"}
      >
        <ModalCloseButton />
        <Container maxW="3xl" border={"solid"} bg="light">
          {/* Customer infomation */}
          <ModalHeader fontSize="3xl">
            <Text fontSize={"3xl"} fontWeight="semibold">
              Vui lòng nhập thông tin người nhận cho CoOrder nhé
            </Text>
          </ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <Flex flexDirection={"column"} gap={5}>
                <Box>
                  <Text fontSize="2xl">Họ và tên</Text>
                  <Input
                    type={"text"}
                    height={"3rem"}
                    fontSize="2xl"
                    focusBorderColor="primary.main"
                    placeholder="Ex: Nguyễn Văn Trung"
                    {...register("name")}
                  />
                  {errors.name && (
                    <Alert status="error">
                      <AlertIcon />
                      <Text fontSize="xl">{errors.name.message}</Text>
                    </Alert>
                  )}
                </Box>
                <Box>
                  <Text fontSize="2xl">Số điện thoại</Text>
                  <Input
                    {...register("phone")}
                    height={"3rem"}
                    fontSize="2xl"
                    focusBorderColor="primary.main"
                    type={"number"}
                  />
                  {errors.phone && (
                    <Alert status="error">
                      <AlertIcon />
                      <Text fontSize="xl">{errors.phone.message}</Text>
                    </Alert>
                  )}
                </Box>
                <Box>
                  <Text fontSize="2xl">Email</Text>
                  <Input
                    {...register("email")}
                    height={"3rem"}
                    fontSize="2xl"
                    focusBorderColor="primary.main"
                    type={"email"}
                    placeholder="Ex: nguyenvantrung123@gmail.com"
                  />
                  {errors.email && (
                    <Alert status="error">
                      <AlertIcon />
                      <Text fontSize="xl">{errors.email.message}</Text>
                    </Alert>
                  )}
                </Box>
                <Box>
                  <Text fontSize="2xl">Chọn địa điểm giao</Text>
                  <Select
                    {...register("destination_location_id")}
                    fontSize="xl"
                    borderColor="primary.main"
                    focusBorderColor="primary.main"
                    variant="outline"
                    height={"3rem"}
                  >
                    {/* {storeLocation?.map((storeLoc) =>
                      storeLoc.locations.map((loc) => (
                        <option
                          key={loc.destination_id}
                          value={loc.destination_location_id}
                        >
                          {storeLoc.address + " - " + loc.name}
                        </option>
                      ))
                    )} */}
                    <option value={23}>{"FPT University"}</option>
                  </Select>
                  {errors.destination_location_id && (
                    <Alert status="error">
                      <AlertIcon />
                      <Text color={"error"} fontSize="xl">
                        {errors.destination_location_id.message}
                      </Text>
                    </Alert>
                  )}
                </Box>
              </Flex>
            </FormControl>
          </ModalBody>

          <Divider borderColor={"dark"} my={3} />
          {/* Review Cart */}

          <ModalFooter>
            <Flex gap={3}>
              <Button fontSize="xl" onClick={onClose}>
                Quay lại
              </Button>
              <Button
                backgroundColor="primary.main"
                colorScheme={"primary.main"}
                fontSize="xl"
                type="submit"
                rightIcon={<ArrowForwardIcon />}
                onClick={handleSubmit(onSubmit)}
              >
                Tiếp theo
              </Button>
            </Flex>
          </ModalFooter>
        </Container>
      </ModalContent>
    </FormProvider>
  );
}

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

interface OrderRoomForm {
  destination_location_id: number;
  email: string;
  name: string;
  phone: string;
}

interface CheckoutModalButtonProps {
  onClose: VoidFunction;
  setStep: Dispatch<SetStateAction<number>>;
  setCustomerInfo: Dispatch<SetStateAction<OrderRoomForm>>;
}

export default function OrderRoomContent({
  onClose,
  setCustomerInfo,
  setStep,
}: CheckoutModalButtonProps) {
  const storeId = 150;
  //hooks
  const orderRoomForm = useForm<OrderRoomForm>({
    defaultValues: {
      destination_location_id: 23,
    },
    // resolver: yupResolver(checkoutSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = orderRoomForm;

  const onSubmit = async (order: OrderRoomForm) => {
    setCustomerInfo(order);
    setStep(2);
  };
  const { data: storeLocations } = useStoreLocations({ id: storeId });
  //states
  //

  return (
    <FormProvider {...orderRoomForm}>
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
              Phòng hiện tại của bạn
            </Text>
          </ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <Flex flexDirection={"column"} gap={5}></Flex>
            </FormControl>
          </ModalBody>

          <Divider borderColor={"dark"} my={3} />
          {/* footer */}

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

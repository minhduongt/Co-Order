import { Box, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomerFormContent from "./sections/CustomerFormContent.section";
import CheckoutFormContent from "./sections/CheckoutFormContent.section";
import OrderRoomContent from "./sections/OrderRoomContent.section";

interface CheckoutModalButtonProps {
  children: any;
  arrivedTimeRange: string;
}

interface CustomerForm {
  destination_location_id: number;
  email: string;
  name: string;
  phone: string;
}

export default function CartModal({
  children,
  arrivedTimeRange,
}: CheckoutModalButtonProps) {
  //hooks
  const { isOpen, onOpen, onClose } = useDisclosure();

  //states
  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState<CustomerForm>({
    destination_location_id: 23,
    email: "",
    name: "",
    phone: "",
  });
  //

  return (
    <>
      <Box w="100%" onClick={onOpen}>
        {children}
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
        closeOnOverlayClick={false}
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        {step == 1 && (
          <OrderRoomContent
            setCustomerInfo={setCustomerInfo}
            setStep={setStep}
            onClose={onClose}
          />
        )}
        {step == 2 && (
          <CheckoutFormContent
            setStep={setStep}
            arrivedTimeRange={arrivedTimeRange}
            customer={customerInfo}
          />
        )}
      </Modal>
    </>
  );
}

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
}

export default function CartModal({ children }: CheckoutModalButtonProps) {
  //hooks
  const { isOpen, onOpen, onClose } = useDisclosure();

  //states
  const [step, setStep] = useState(1);
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
        {/* {step == 1 && (
          <OrderRoomContent
            setCustomerInfo={setCustomerInfo}
            setStep={setStep}
            onClose={onClose}
          />
        )} */}
        {step == 1 && <CheckoutFormContent onClose={onClose} />}
      </Modal>
    </>
  );
}

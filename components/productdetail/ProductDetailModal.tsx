import React from "react";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { TProduct, TProductInMenu } from "../../types/product";
import ProductDetailView from "./ProductDetailView";

interface ProductDetailModalProps {
  product: TProductInMenu;
  children: any;
}

export default function ProductDetailModal({
  children,
  product,
}: ProductDetailModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontSize={"3xl"}>Chi tiết</Text>
          </ModalHeader>

          <ModalBody>
            <ProductDetailView product={product} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

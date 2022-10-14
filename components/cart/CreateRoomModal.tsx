import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import useCartContext from "hooks/useCartContext";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface RoomForm {
  id: string;
  name: string;
}

interface CreateRoomModalProps {
  children: any;
}
const createRoomSchema = yup.object().shape({
  id: yup.string().required("Hãy điền vào id phòng").min(2, "Ít nhất 2 ký tự"),
  name: yup
    .string()
    .required("Hãy điền vào tên phòng")
    .min(2, "Ít nhất 2 ký tự"),
});

export default function CreateRoomModal({ children }: CreateRoomModalProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const cartContext = useCartContext();
  const { SetNewRoom } = cartContext;
  //hooks
  const createRoomForm = useForm<RoomForm>({
    defaultValues: {
      id: "",
      name: "",
    },
    resolver: yupResolver(createRoomSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = createRoomForm;

  const onSubmit = async (customer: RoomForm) => {
    SetNewRoom(customer);
  };

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"md"}
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />

        <FormProvider {...createRoomForm}>
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
                  Tạo phòng
                </Text>
              </ModalHeader>
              <ModalBody pb={6}>
                <FormControl>
                  <Flex flexDirection={"column"} gap={5}>
                    <Box>
                      <Text fontSize="2xl">ID</Text>
                      <Input
                        type={"text"}
                        height={"3rem"}
                        fontSize="2xl"
                        focusBorderColor="primary.main"
                        // placeholder="Ex: Nguyễn Văn Trung"
                        {...register("id")}
                      />
                      {errors.id && (
                        <Alert status="error">
                          <AlertIcon />
                          <Text fontSize="xl">{errors.id.message}</Text>
                        </Alert>
                      )}
                    </Box>
                    <Box>
                      <Text fontSize="2xl">Tên phòng</Text>
                      <Input
                        {...register("name")}
                        height={"3rem"}
                        fontSize="2xl"
                        focusBorderColor="primary.main"
                        type={"number"}
                      />
                      {errors.name && (
                        <Alert status="error">
                          <AlertIcon />
                          <Text fontSize="xl">{errors.name.message}</Text>
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
                    Đóng
                  </Button>
                  <Button
                    backgroundColor="primary.main"
                    colorScheme={"primary.main"}
                    fontSize="xl"
                    type="submit"
                    // rightIcon={<ArrowForwardIcon />}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Tạo phòng
                  </Button>
                </Flex>
              </ModalFooter>
            </Container>
          </ModalContent>
        </FormProvider>
      </Modal>
    </>
  );
}

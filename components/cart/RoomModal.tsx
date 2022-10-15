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
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import useCartContext from "hooks/useCartContext";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TRoom } from "types/room";

interface RoomForm {
  id: string;
  name: string;
}

interface RoomModalProps {
  children: any;
  isCreate?: boolean;
}
const CreateRoomSchema = yup.object().shape({
  id: yup.string().required("Hãy điền vào id phòng").min(2, "Ít nhất 2 ký tự"),
  name: yup
    .string()
    .required("Hãy điền vào tên phòng")
    .min(2, "Ít nhất 2 ký tự"),
});
const JoinRoomSchema = yup.object().shape({
  id: yup.string().required("Hãy điền vào id phòng").min(2, "Ít nhất 2 ký tự"),
});

export default function RoomModal({ children, isCreate }: RoomModalProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const cartContext = useCartContext();
  const { cart: currentCart, room: currentRoom, SetNewRoom } = cartContext;
  //hooks
  const createRoomForm = useForm<RoomForm>({
    defaultValues: {
      id: "",
      name: "",
    },
    resolver: yupResolver(isCreate ? CreateRoomSchema : JoinRoomSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = createRoomForm;

  const onSubmit = async (customer: RoomForm) => {
    SetNewRoom(customer);
  };

  const handleCreateRoom = async (room: TRoom) => {
    try {
      await cartContext.SetNewRoom(newRoom);
      toast({
        title: `Đã vào phòng ${room.name}`,
        status: "success",
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

  const newRoom = {
    id: "abcd-1234",
    name: "Hội người lười chảy thây",
  };

  const handleJoinRoom = async (room: TRoom) => {
    try {
      const newRoom = {
        id: "abcd-1234",
        name: "Hội những người lười chảy thây",
      };
      await cartContext.SetNewRoom(newRoom);
      toast({
        title: `Đã vào phòng ${room.name}`,
        status: "success",
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
                  {isCreate ? "Tạo phòng" : "Vào phòng"}
                </Text>
              </ModalHeader>
              <ModalBody pb={6}>
                {isCreate ? (
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
                          type={"text"}
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
                ) : (
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
                    </Flex>
                  </FormControl>
                )}
              </ModalBody>

              <Divider borderColor={"dark"} my={3} />
              {/* Review Cart */}

              <ModalFooter>
                <Flex gap={3}>
                  <Button fontSize="xl" onClick={onClose}>
                    Đóng
                  </Button>
                  {isCreate ? (
                    <Button
                      backgroundColor="primary.main"
                      colorScheme={"primary.main"}
                      fontSize="xl"
                      type="submit"
                      // rightIcon={<ArrowForwardIcon />}
                      onClick={handleSubmit(onSubmit)}
                    >
                      {"Tạo phòng"}
                    </Button>
                  ) : (
                    <Button
                      backgroundColor="primary.main"
                      colorScheme={"primary.main"}
                      fontSize="xl"
                      type="submit"
                      // rightIcon={<ArrowForwardIcon />}
                      onClick={() => handleJoinRoom(newRoom)}
                    >
                      {"Vào phòng"}
                    </Button>
                  )}
                </Flex>
              </ModalFooter>
            </Container>
          </ModalContent>
        </FormProvider>
      </Modal>
    </>
  );
}

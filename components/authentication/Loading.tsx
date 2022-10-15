import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../../public/assets/image/logofinal.png";
function Loading() {
  return (
    <Flex
      gap={2}
      justifyContent={"center"}
      alignItems={"center"}
      height="100vh"
      flexDirection={"column"}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Flex alignItems={"center"} gap={5}>
        {" "}
        <Image
          alt="logo"
          sx={{ width: "50px", marginLeft: "20px" }}
          src={logo.src}
        ></Image>
        <Text fontSize={"2xl"}>Cooperative Order</Text>
      </Flex>
    </Flex>
  );
}

export default Loading;

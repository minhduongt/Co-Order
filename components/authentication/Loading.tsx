import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

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
      <Text fontSize={"2xl"}>Cooperative Order</Text>
    </Flex>
  );
}

export default Loading;

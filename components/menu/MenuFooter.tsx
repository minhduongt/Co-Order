import { Box, Divider, Flex, Text } from "@chakra-ui/react";

const weekday = [
  { name: "Thứ Hai", value: "Mon" },
  { name: "Thứ Ba", value: "Tue" },
  { name: "Thứ Tư", value: "Wed" },
  { name: "Thứ Năm", value: "Thu" },
  { name: "Thứ Sáu", value: "Fri" },
  { name: "Thứ Bảy", value: "Sat" },
];

const MenuFooter = () => {
  return (
    <Flex
      alignItems={"center"}
      flexDirection="column"
      pt="20vh"
      borderBottom={"groove"}
      borderBottomColor="primary.main"
      borderBottomWidth={"10px"}
    >
      <Text fontSize={"xl"} textAlign="center">
        Bạn đã xem hết rồi <br />
      </Text>
      <Divider borderColor={"primary.main"} borderWidth={2} />
      <Box py="1rem">
        <Text>©2022 CoOrder. All rights reserved.</Text>
      </Box>
    </Flex>
  );
};

export default MenuFooter;

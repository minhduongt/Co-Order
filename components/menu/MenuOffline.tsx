import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { FaRegHandPointRight } from "react-icons/fa";
import infoBean from "../../public/assets/image/beaninfo.png";

const MenuOffline = () => {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      p="3rem"
      h="25rem"
      alignItems="center"
      justifyContent={"center"}
    >
      <Image alt="infomation bean" src={infoBean.src} w="250px" h="100%" />
      <Text fontSize={"2xl"}>
        Hôm nay BeanOi tạm thời chưa thể phục vụ, bạn vui lòng quay lại sau nhé!
      </Text>
      <Button
        onClick={() => window.open("https://www.facebook.com/beanoivn")}
        size={"lg"}
        fontSize={"2xl"}
        bg="primary.lighter"
        leftIcon={<FaRegHandPointRight />}
      >
        Thăm ngay trang của Bean để tìm hiểu thêm
      </Button>
    </Flex>
  );
};

export default MenuOffline;

import NextLink from "next/link";
import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  Heading,
  IconButton,
  useColorModeValue,
  Image,
  Icon,
  Flex,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../public/assets/image/logofinal.png";

const Logo = () => <Image alt="logo" src={logo.src} />;

const Links = [
  { name: "Đặt món", href: "/" },
  // { name: "Tải app", href: "/download" },
  // { name: "Bảo mật", href: "/privacy" },
  // { name: "Blog", href: "/blog" },
];

const FootLink: any = () => {
  return Links.map((link) => (
    <NextLink key={link.name} href={link.href} passHref>
      <Link
        color={"secondary.main"}
        fontSize="1.3rem"
        _hover={{
          textDecoration: "none",
          color: "primary.main",
          fontWeight: "bold",
        }}
        _focus={{ boxShadow: "none" }}
        width="8rem"
        pl={{ xs: "1rem", lg: 0 }}
      >
        {link.name}
      </Link>
    </NextLink>
  ));
};

// const SocialButton = ({ children, label, href }) => {
//   return (
//     <chakra.button
//       bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
//       rounded={"full"}
//       w={8}
//       h={8}
//       cursor={"pointer"}
//       as={"a"}
//       href={href}
//       display={"inline-flex"}
//       alignItems={"center"}
//       justifyContent={"center"}
//       transition={"background 0.3s ease"}
//       _hover={{
//         bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
//       }}
//     >
//       <VisuallyHidden>{label}</VisuallyHidden>
//       {children}
//     </chakra.button>
//   );
// };

export default function MainFooter() {
  return (
    <Box bg={"white"} color={useColorModeValue("gray.700", "gray.200")}>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{
            md: "2fr 2fr 2fr 0fr",
          }}
          spacing={"2rem"}
        >
          <Stack
            mt={{ md: "3rem" }}
            color="secondary.main"
            display={{ xs: "none", md: "flex" }}
          >
            <Box
              fontWeight={"500"}
              fontSize={{ xs: "1rem", md: "1.3rem" }}
              mb={2}
            >
              {/* <Text> Mạng xã hội :</Text>
              <Link
                textDecoration={"underline"}
                href=" https://www.facebook.com/beanoivn"
              >
                https://www.facebook.com/beanoivn
              </Link> */}
              <Box py="1rem">
                <Text>©2022 CoOrder. All rights reserved.</Text>
              </Box>
            </Box>
            <Stack
              align={"flex-start"}
              direction={"row"}
              spacing={{ lg: "2rem" }}
            ></Stack>
          </Stack>

          {/* Mobile display */}
          <Box display={{ xs: "block", md: "none" }} color="primary.main">
            <SimpleGrid
              templateColumns={{
                xs: "1fr 1fr",
              }}
              //spacing={"2rem"}
            >
              <Stack
                align={"flex-start"}
                justifyContent="center"
                mt={{ md: "3rem" }}
              >
                <FootLink />
              </Stack>

              <Box
                fontWeight={"500"}
                fontSize={{ xs: "1rem", md: "1.3rem" }}
                //maxW="13rem"
              >
                {/* <Text pb="1rem"> Mạng xã hội :</Text>
                <Link
                  textDecoration={"underline"}
                  href=" https://www.facebook.com/beanoivn"
                >
                  https://
                  <br />
                  www.facebook.com/
                  <br />
                  beanoivn
                </Link> */}
                <Box py="1rem">
                  <Text>©2022 CoOrder. All rights reserved.</Text>
                </Box>
              </Box>
            </SimpleGrid>
            <Stack
              align={"flex-start"}
              direction={"row"}
              pt="2rem"
              spacing={{ sm: "1.5rem" }}
            ></Stack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

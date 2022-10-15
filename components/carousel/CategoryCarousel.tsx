import React, { Dispatch, SetStateAction } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Image,
  Skeleton,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// And react-slick as our Carousel Lib
// import Slider from "react-slick";
import styles from "../../components/assets/css/slick-dot.module.css";
import useCategories from "hooks/category/useCategories";
import Slider from "react-slick";
import NoImage from "../../public/assets/image/noimage.png";

interface CategoryCarouselProps {
  setFilterCate: Dispatch<SetStateAction<number | null>>;
}

export default function CategoryCarousel({
  setFilterCate,
}: CategoryCarouselProps) {
  // const [isDesktop] = useMediaQuery("(min-width: 1024px)");
  const { data: categories, isLoading, isError } = useCategories();
  console.log("categories", categories);

  const settings = {
    arrows: false,
    infinite: false,
    autoplay: false,
    speed: 500,
    dots: false,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 3,
        },
      },
    ],
  };
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>();

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({
    base: "50%",
    md: "55%",
    lg: "65%",
    xl: "95%",
  });
  const right = useBreakpointValue({
    base: "50%",
    xs: "-80%",
    md: "-90.5%",
    xl: "-91.5%",
  });
  const left = useBreakpointValue({ base: "50%", xs: "1%", md: "1%" });

  return (
    <Box w={"100vw"} pt={{ xs: "3rem", xl: "5rem" }} mx={{ xs: 0, lg: "7rem" }}>
      {/* CSS files for react-slick */}
      {/* 
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <IconButton
        borderRadius={"full"}
        minH="3vw"
        aria-label="left-arrow"
        variant="unstyled"
        position="relative"
        background="transparent"
        color="primary.main"
        left={left}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
        _focus={{ boxShadow: "none" }}
        border={"solid"}
        borderWidth="3px"
        borderColor={"#48BB7880"}
      >
        <BsArrowLeft size={"2.5vw"} />
      </IconButton>
      <IconButton
        borderRadius={"full"}
        minH="3vw"
        aria-label="right-arrow"
        variant="unstyled"
        position="relative"
        background="transparent"
        color="primary.main"
        right={right}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
        _focus={{ boxShadow: "none" }}
        border={"solid"}
        borderWidth="3px"
        borderColor={"#48BB7880"}

        // visibility="hidden"
      >
        <BsArrowRight size="2.5vw" />
      </IconButton> */}
      <Grid
        templateColumns={{
          xs: "repeat(3, 1fr)",
          md: "repeat(5, 1fr)",
        }}
        gap={{ md: 5, xl: 10 }}
        width="100%"
        paddingY={"0.5rem"}
        alignItems="center"
        mx={{ xs: 2, lg: 5 }}
      >
        {/* <Slider {...settings} ref={(slider) => setSlider(slider)}> */}
        {categories?.map((cate) => (
          <Flex key={cate.id} textAlign={"center"}>
            <Button
              bg={"primary.transparent"}
              key={cate.id}
              w={{ xs: "6rem", lg: "12rem" }}
              h={{ xs: "6rem", lg: "12rem" }}
              border={"solid"}
              borderColor="primary.main"
              borderRadius={"15px"}
              _hover={{
                // transform: "translateY(-2px)",
                boxShadow: "lg",
                bg: "primary.light",
              }}
              onClick={() => setFilterCate(cate.id)}
            >
              <Flex flexDirection={"column"} alignItems={"center"}>
                <Image
                  w={{ xs: "3rem", xl: "8rem" }}
                  h={{ xs: "3rem", xl: "8rem" }}
                  borderRadius={"100%"}
                  src={cate.imageUrl}
                  fallbackSrc={NoImage.src}
                  alt={`Picture of ${cate.name}`}
                />
                <Text
                  pt={"15px"}
                  fontSize="xl"
                  fontWeight="semibold"
                  lineHeight="tight"
                  textAlign={"center"}
                  wordBreak={"break-all"}
                  color="primary.darker"
                >
                  {cate.name}
                </Text>
              </Flex>
            </Button>
          </Flex>
        ))}
        {/* </Slider> */}
      </Grid>
      <Skeleton
        isLoaded={!isLoading || isError}
        w={"100%"}
        h="10rem"
        py="5rem"
      />
    </Box>
  );
}

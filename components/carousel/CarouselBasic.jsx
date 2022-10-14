import React from "react";
import NextLink from "next/link";
import {
  Box,
  CircularProgress,
  Container,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import { BlogTags } from "../sections/blog/BlogTags.jsx";
import { BlogViewsDate } from "../sections/blog/BlogViewsDate.jsx";
import styles from "../../components/assets/css/slick-dot.module.css";
import usePosts from "../../hooks/post/usePosts.js";

export default function CarouselMultiItems() {
  const [isDesktop] = useMediaQuery("(min-width: 1024px)");
  const { data: posts, isLoading } = usePosts();
  // Settings for the slider
  // const settings = isDesktop
  //   ? {
  //       dots: false,
  //       arrows: false,
  //       infinite: true,
  //       autoplay: true,
  //       slidesToShow: 3,
  //       speed: 500,
  //       dotsClass: styles.dots_bar,
  //     }
  //   : {
  //       dots: true,
  //       arrows: false,
  //       infinite: true,
  //       autoplay: true,
  //       slidesToShow: 1,
  //       speed: 500,
  //       dotsClass: styles.dots_bar,
  //     };
  const settings = {
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    dotsClass: styles.dots_bar,
    responsive: [
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 3,
          dots: false,
        },
      },
    ],
  };
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "40%" });
  const side = useBreakpointValue({ base: "30%", md: "1%" });

  return (
    <Box
      color="#FFFFFF"
      position={"relative"}
      height={{
        xs: "25rem",
        sm: "30rem",
        md: "43rem",
        lg: "28rem",
        xl: "33rem",
      }}
      width={{ xs: "100%", lg: "100%" }}
      overflow={"hidden"}
      //maxW={"7xl"}
      margin="0"
    >
      {/* CSS files for react-slick */}
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

      <Box display={{ xs: "none", lg: "block" }}>
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="unstyled"
          position="absolute"
          background="transparent"
          color="secondary.main"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
          _focus={{ boxShadow: "none" }}
        >
          <BsArrowLeft size="35px" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="unstyled"
          position="absolute"
          background="transparent"
          color="secondary.main"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
          _focus={{ boxShadow: "none" }}
        >
          <BsArrowRight size="35px" />
        </IconButton>
      </Box>
      {/* Slider */}

      <Box px={{ xs: "0", xl: "3rem" }}>
        {isLoading ? (
          <Container sx={{ textAlign: "center" }} pt="12rem">
            <CircularProgress isIndeterminate />
          </Container>
        ) : (
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {posts?.slice(9, 15).map((item) => (
              <Box
                key={item.postId}
                px={{ xs: "1rem", md: "2rem", lg: "2.5rem", xl: "1rem" }}
              >
                <Box w={"100%"} maxW={{ xs: "30rem", md: "40rem", lg: "100%" }}>
                  <NextLink href={`/blog/${item.postId}`} passHref>
                    <Link _hover={{ textDecoration: "none" }}>
                      <Box
                        borderRadius="1rem"
                        overflow="hidden"
                        maxW={{ lg: "16rem", xl: "25rem" }}
                        minW={{ lg: "16rem", xl: "25rem" }}
                        maxH={{
                          xs: "10rem",
                          sm: "14rem",
                          md: "24rem",
                          lg: "10rem",
                          xl: "16rem",
                        }}
                        minH={{
                          xs: "10rem",
                          sm: "14rem",
                          md: "24rem",
                          lg: "10rem",
                          xl: "16rem",
                        }}
                        objectFit="cover"
                        backgroundColor={"gray.200"}
                      >
                        <Image
                          transform="scale(1.0)"
                          src={item.imageUrl}
                          alt="some text"
                          objectFit="cover"
                          transition="0.3s ease-in-out"
                          _hover={{
                            transform: "scale(1.05)",
                          }}
                        />
                      </Box>
                    </Link>
                  </NextLink>
                  <BlogTags
                    tags={item.tags.split(",")}
                    paddingY={{ xs: "0.5rem", md: "1rem" }}
                    size={isDesktop ? "md" : "sm"}
                  />
                  <Heading fontSize={{ xs: "md", md: "lg" }} marginTop="1rem">
                    <NextLink href={`/blog/${item.postId}`} passHref>
                      <Link
                        textDecoration="none"
                        _hover={{ textDecoration: "none" }}
                      >
                        {item.title}
                      </Link>
                    </NextLink>
                  </Heading>
                  <BlogViewsDate
                    viewnums="49 luot xem"
                    date={item.createDate}
                    color="gray.200"
                  />
                  <Text
                    fontSize={{ xs: "xs", md: "md" }}
                    marginTop="2"
                    noOfLines={2}
                    dangerouslySetInnerHTML={{ __html: item.sapo }}
                  />
                </Box>
              </Box>
            ))}
          </Slider>
        )}
      </Box>
    </Box>
  );
}

import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import talkingBean from "../../public/assets/image/talkingbean.png";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

// Settings for the slider
const settings = {
  dots: false,
  arrows: false,
  fade: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
};

export default function TextCarousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the images used in the slide
  const slogans = [
    "Đặt ngay chờ chi!",
    'Đói bụng "ới" Bean là có BeanOi',
    'Chọn món BeanOi, không lo đợi lâu "trời ơi"',
    "Đậu lại BeanOi, ăn gì đỗ nấy",
  ];

  return (
    <Flex width={"100%"} justifyContent="right">
      {/* css */}
      {/* <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      /> */}
      <Box borderBottom={"solid"} borderBottomWidth="2rem">
        <Image
          position={"absolute"}
          alt="talkingbean"
          src={talkingBean.src}
          zIndex={1}
          width={{ xs: "300px", md: "400px", lg: "500px", xl: "32vw" }}
          top={{ md: "-10px", lg: "-35px", xl: "-2.5vw" }}
          right={{ xs: "0", md: "-10px", lg: "35px", xl: "6vw" }}
          loading="lazy"
        />
      </Box>
      {/* Slider */}
      <Box maxW="50vw" zIndex={2}>
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {slogans.map((slogan, index) => (
            <Box key={index}>
              <Text
                fontSize={{ md: "xl", lg: "2xl", xl: "1.3vw" }}
                width={{ md: "15rem", xl: "20rem" }}
                pt={{ xl: "1vw" }}
                mx={"auto"}
                textAlign="center"
              >
                {slogan}
              </Text>
            </Box>
          ))}
        </Slider>
      </Box>
    </Flex>
  );
}

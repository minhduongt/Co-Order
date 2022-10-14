import React from "react";
import { Box } from "@chakra-ui/react";

// And react-slick as our Carousel Lib
import Slider from "react-slick";

// Settings for the slider
const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CarouselNoArrow() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState(null);

  // These are the images used in the slide
  const cards = [
    "../assets/image/bannernav2.png",
    "../assets/image/bannernav2.png",
    "../assets/image/bannernav2.png",
  ];

  return (
    <Box maxHeight={562} width={"100%"} pb="2rem">
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
      {/* Left Icon */}
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((url, index) => (
          <Box
            key={index}
            height={{ base: "35.rem", xs: "10rem", md: "20rem", lg: "35.5rem" }}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize={"cover"}
            backgroundImage={`url(${url})`}
          ></Box>
        ))}
      </Slider>
    </Box>
  );
}

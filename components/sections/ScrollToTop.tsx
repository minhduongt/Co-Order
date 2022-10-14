import { Button, Icon, IconButton } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
// @ts-ignore

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  top?: number;
  smooth?: boolean;
  svgPath?: string;
  viewBox?: string;
  component?: any;
  width?: string;
  height?: string;
};

function scrollToTop(smooth: boolean = false) {
  if (smooth) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    document.documentElement.scrollTop = 0;
  }
}

const ScrollToTop = ({
  top = 20,
  color = "white",
  smooth = false,
  width = "20",
  height = "28",
  ...props
}: Props) => {
  const [visible, setVisible] = useState(false);
  const onScroll = () => {
    setVisible(document.documentElement.scrollTop > top);
  };
  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    // Remove listener on unmount
    return () => document.removeEventListener("scroll", onScroll);
  });

  return (
    <>
      {visible && (
        <IconButton
          onClick={() => scrollToTop(smooth)}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          right={10}
          bottom={5}
          position="fixed"
          zIndex={2}
          border-radius={7}
          backgroundColor="primary.main"
          sx={{
            transition: "opacity 1s ease-in-out",
            _focus: { bg: "secondary.main" },
            _hover: { bg: "secondary.main" },
          }}
          h="50px"
          variant="outline"
          aria-label="Lên trên"
          size={"lg"}
          icon={<AiOutlineArrowUp size={"2rem"} color="white" />}
        />
      )}
    </>
  );
};

export default ScrollToTop;

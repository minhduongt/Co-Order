import { Box } from "@chakra-ui/react";
import * as React from "react";

interface AnimationProps {
  appear?: boolean;
  isTransition?: boolean | undefined;
  isAnimationOnScroll?: boolean;
}

const Animation: React.FC<AnimationProps> = ({
  children,

  appear = false,
  isTransition,
}) => {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (appear) setIsActive(true);
  }, [appear]);

  React.useEffect(() => {
    if (isTransition !== undefined) {
      setIsActive(isTransition);
    }
  }, [isTransition]);

  return (
    <Box
      ref={ref}
      opacity={isActive? 0 : 100}
    >
      {children}
    </Box>
  );
};

export default Animation;

import React from "react";
import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";

export default function QuantityInput(props) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: props.quantity,
      max: 100,
      min: 1,
      precision: 0,
      isRequired: true,
      keepWithinRange: true,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="320px">
      <Button {...dec}>-</Button>
      <Input {...input} />
      <Button {...inc}>+</Button>
    </HStack>
  );
}

import { Box } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import MenuList from "../components/menu/MenuList";

function MenuPage() {
  return (
    <Box fontFamily="coorder">
      <MenuList />
    </Box>
  );
}

export default MenuPage;

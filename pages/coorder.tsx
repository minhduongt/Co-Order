import { Box } from "@chakra-ui/react";
import MainFooter from "components/foot";
import MainHeader from "components/nav";
import { useEffect, useState, useCallback } from "react";
import MyCoOrder from "../components/coorder/index";

function CoorderPage() {
  return (
    <Box fontFamily="coorder">
      <MainHeader />
      <MyCoOrder />
      <MainFooter />
    </Box>
  );
}

export default CoorderPage;

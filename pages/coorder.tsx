import { Box } from "@chakra-ui/react";
import AuthCheck from "components/authentication/AuthCheck";
import MainFooter from "components/foot";
import MainHeader from "components/nav";
import { useEffect, useState, useCallback } from "react";
import MyCoOrder from "../components/coorder/index";

function CoorderPage() {
  return (
    <Box fontFamily="coorder">
      <AuthCheck>
        <MainHeader isCartPage={true} />
        <MyCoOrder />
        <MainFooter />
      </AuthCheck>
    </Box>
  );
}

export default CoorderPage;

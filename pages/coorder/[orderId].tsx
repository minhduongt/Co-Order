import { Box } from "@chakra-ui/react";
import AuthCheck from "components/authentication/AuthCheck";
import MainFooter from "components/foot";
import MainHeader from "components/nav";
import PartyOrderHeader from "components/PartyOrderNav";
import { useEffect, useState, useCallback } from "react";
import MyCoOrder from "../../components/coorder/index";

function CoorderDetailPage() {
  return (
    <Box fontFamily="coorder">
      <AuthCheck>
        <PartyOrderHeader />
        <MyCoOrder />
        <MainFooter />
      </AuthCheck>
    </Box>
  );
}

export default CoorderDetailPage;

import React from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import MenuList from "../components/menu/MenuList";
import MainHeader from "components/nav";
import MainFooter from "components/foot";
import AuthCheck from "components/authentication/AuthCheck";

function Home() {
  return (
    <Box fontFamily="coorder">
      <AuthCheck>
        <MainHeader />
        <MenuList />
        <MainFooter />
      </AuthCheck>
    </Box>
  );
}

export default Home;

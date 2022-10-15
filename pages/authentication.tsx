import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Authenticate from "components/authentication";
import { signIn, signOut } from "next-auth/react";
import MainHeader from "components/nav";
import AuthCheck from "components/authentication/AuthCheck";
import { useRouter } from "next/router";
import useUserContext from "hooks/useUserContext";
import useAuthContext from "hooks/useAuthContext";

function AuthenticationPage() {
  return (
    <Box fontFamily="coorder">
      <AuthCheck>
        <Authenticate />
      </AuthCheck>
    </Box>
  );
}

export default AuthenticationPage;

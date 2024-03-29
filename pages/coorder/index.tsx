import { Box } from "@chakra-ui/react";
import AuthCheck from "components/authentication/AuthCheck";
import MainFooter from "components/foot";
import PartyOrderHeader from "components/PartyOrderNav";
import MyCoOrder from "../../components/coorder/index";

function CoorderPage() {
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

export default CoorderPage;

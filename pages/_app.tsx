import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "contexts/AuthContext";
import { CartContextProvider } from "contexts/CartContext";
import { UserContextProvider } from "contexts/UserContext";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "../components/assets/css/font.css";
import theme from "../theme";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: any) {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <CartContextProvider>
              <Component {...pageProps} />
            </CartContextProvider>
          </QueryClientProvider>
        </ChakraProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;

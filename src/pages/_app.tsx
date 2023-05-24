import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/theme";
import { AuthContextProvider } from "@/firebase/context/AuthContext";

const noAuthRequired = [
  "/",
  "/home",
  "/about",
  "/store",
  "/signup",
  "/products/[name]",
  "/HowItWorks",
];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      ) : (
        <ProtectedRoute>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

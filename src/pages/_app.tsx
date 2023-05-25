import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/theme";
import { AuthContextProvider } from "@/firebase/context/AuthContext";
import { Transition } from "@/components/animations/Transition";
import { AnimatePresence } from "framer-motion";

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
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </ChakraProvider>
      ) : (
        <ProtectedRoute>
          <ChakraProvider theme={theme}>
            <AnimatePresence mode="wait">
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </ChakraProvider>
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

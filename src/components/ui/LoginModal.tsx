import {
  useDisclosure,
  Divider,
  Stack,
  Button,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Link,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { useRef, useState } from "react";
import { login } from "@/firebase/auth";

function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const handleLogin = async () => {
    try {
      await login(email, password);
      toast({
        title: "Logged in successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      const typedError = error as { code?: string; message: string };
      console.error(typedError);
      let errorMessage = "An error occurred";

      if (typedError.code) {
        switch (typedError.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address";
            break;
          case "auth/user-disabled":
            errorMessage = "User account is disabled";
            break;
          case "auth/user-not-found":
            errorMessage = "User not found";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many requests. Try again later";
            break;
          case "auth/network-request-failed":
            errorMessage = "Network error. Try again later";
            break;
          default:
            errorMessage = typedError.message;
        }
      }
      toast({
        title: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen}>Sign in</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wellcome back to Refil</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Email"
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <Stack spacing="6">
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                or continue with
              </Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup />
          </Stack>
          <Text textAlign="center" my={4}>
            dont have an account? <Link href="/signup">sign up now</Link>
          </Text>
          <ModalFooter justifyContent="center">
            <Button
              colorScheme="blue"
              mr={3}
              width="full"
              onClick={handleLogin}
              isDisabled={!email || !password}
            >
              Login
            </Button>

            <Button onClick={onClose} width="full">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;

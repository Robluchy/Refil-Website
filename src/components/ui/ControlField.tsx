import { signUp } from "@/firebase/auth";
import { forwardRef, useRef, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Progress,
  InputProps,
  useDisclosure,
  useMergeRefs,
  Checkbox,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
export const ControlField = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const router = useRouter();
    const toast = useToast();
    const [error, setEmailError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);
    const mergeRef = useMergeRefs(inputRef, ref);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchPercentage, setPasswordMatchPercentage] = useState(0);

    const calculatePasswordMatch = (
      password: string,
      confirmPassword: string
    ): number => {
      const minLength = Math.min(password.length, confirmPassword.length);

      for (let i = 0; i < minLength; i++) {
        if (password[i] !== confirmPassword[i]) {
          return (i / password.length) * 100;
        }
      }

      return (minLength / password.length) * 100;
    };

    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      try {
        await signUp(email, password);
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        router.push("/");
      } catch (error) {
        const typedError = error as { code?: string; message: string };
        console.error(typedError);
        let errorMessage = "An error occurred";

        if (typedError.code) {
          switch (typedError.code) {
            case "auth/email-already-in-use":
              errorMessage = "Email address already in use";
              setEmailError(errorMessage);
              break;
            case "auth/invalid-email":
              errorMessage = "Invalid email address";
              break;
            case "auth/operation-not-allowed":
              errorMessage = "Operation not allowed";
              break;
            case "auth/weak-password":
              errorMessage = "Weak password";
              break;
            default:
              errorMessage = typedError.message;
          }
        } else {
          setEmailError(null);
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

    const isSubmitDisabled =
      !email || !password || password !== confirmPassword;

    return (
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              style={error ? { borderColor: "red" } : {}}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormLabel mt={4} htmlFor="password">
            Password
          </FormLabel>
          <InputGroup>
            <Input
              id="password"
              ref={mergeRef}
              name="password"
              type={isOpen ? "text" : "password"}
              autoComplete="current-password"
              required
              {...props}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          <FormControl mt={4}>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type={isOpen ? "text" : "password"}
              autoComplete="current-password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordMatchPercentage(
                  calculatePasswordMatch(password, e.target.value)
                );
              }}
            />
            <Checkbox
              mt={2}
              onChange={onClickReveal}
              isChecked={isOpen}
              colorScheme="blue"
            >
              Show password
            </Checkbox>

            <Progress
              mt={2}
              value={passwordMatchPercentage}
              colorScheme={password === confirmPassword ? "green" : "red"}
            />
          </FormControl>
          <Button
            type="submit"
            variant="primary"
            mt={4}
            w="full"
            _hover={{
              color: "F5F5F5",
            }}
            isDisabled={isSubmitDisabled}
          >
            Sign up
          </Button>
        </FormControl>
      </form>
    );
  }
);

ControlField.displayName = "ControlField";

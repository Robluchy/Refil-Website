import {
  Flex,
  Heading,
  Button,
  Stack,
  Text,
  Box,
  Container,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import Lottie from "lottie-react";
import { useRouter } from "next/router";
export default function Hero() {
  const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

  const router = useRouter();
  return (
    <Stack h={"100%"} direction={{ base: "column", xl: "row" }} mt={10}>
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", lg: "row" }}
          textAlign={"center"}
        >
          <Stack
            flex={1}
            spacing={{ base: 5, md: 10 }}
            order={{ base: 1, md: 0 }}
          >
            <Heading
              fontSize={{ base: "6xl", md: "8xl" }}
              fontWeight={"black"}
              color={"primary.Heading"}
            >
              What?? Coins??
            </Heading>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color={"primary.Paragraph"}
            >
              Recycle and Earn Reward Coins! At ReFil, we believe in rewarding
              your sustainable efforts. Every time you recycle, receive coins
              that can be redeemed for{" "}
              <Text as="span" color={"goldenrod"}>
                exciting prizes
              </Text>
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
              justifyContent={"center"}
              zIndex={1}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                bg={"primary.Button"}
                _hover={{ bg: "black", textColor: "white" }}
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Get started
              </Button>
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                onClick={() => {
                  router.push("/about");
                }}
              >
                How It Works
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
            order={{ base: 0, md: 1 }}
          >
            <Box
              bg={"transparent"}
              position={"relative"}
              height={"auto"}
              rounded={"2xl"}
              width={"full"}
              _hover={{
                transform: {
                  base: "scale(2) rotate(10deg)",
                  lg: "scale(3) rotate(10deg)",
                },
                transition: "all 0.4s ease-in-out",
              }}
              transition={"all 0.4s ease-in-out 0.2s"}
              animation={`${fadeIn} 1s ease-in`}
            >
              <Lottie animationData={require("public/coins.json")} />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Stack>
  );
}

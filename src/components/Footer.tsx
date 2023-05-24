import { Container, Stack, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Container
      userSelect={"none"}
      as={Stack}
      maxW={"8xl"}
      my={4}
      justify={{ base: "center" }}
      align={{ base: "center", md: "center" }}
    >
      <Text> © 2023 Refil. All rights reserved </Text>
    </Container>
  );
}

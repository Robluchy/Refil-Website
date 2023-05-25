import { Container, Link, Stack, Text } from "@chakra-ui/react";

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
      <Text>
        © 2023 Refil. All rights reserved{" "}
        <Link href="https://www.notion.so/roblu/ReFill-Filamento-3D-hecho-con-materiales-reciclados-39442cf615ff47deb782f6637485c886?pvs=4">
          Notion
        </Link>{" "}
      </Text>
    </Container>
  );
}

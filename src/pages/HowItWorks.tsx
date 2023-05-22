import { Layout } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Box,
  Heading,
  Container,
  Stack,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";

export default function HowItWorks() {
  return (
    <Layout title="How It Works">
      <Container maxW={"8xl"} h={"full"} mb={"36"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={10}
        ></Stack>
        <Container maxW={"8xl"}>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: "5", md: "6" }}
            w={"full"}
            h={"full"}
          ></SimpleGrid>
        </Container>
      </Container>
    </Layout>
  );
}

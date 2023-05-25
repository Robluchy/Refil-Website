import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { OAuthButtonGroup } from "@/components/ui/OAuthButtonGroup";
import { ControlField } from "@/components/ui/ControlField";
import { Layout } from "@/components/Layout";

export default function SignUp() {
  return (
    <Layout title="Sign up">
      <Container
        maxW="xl"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={"2xl"}>Sign up to Refil 🚀</Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Just a one step for a big change</Text>
              </HStack>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={"bg-surface"}
            boxShadow={"dark-lg"}
            borderRadius={"xl"}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <ControlField />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Layout>
  );
}

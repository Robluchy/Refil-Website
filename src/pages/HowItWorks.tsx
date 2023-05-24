import { Layout } from "@/components/Layout";
import Data from "@/components/data/HowItWorksDto";
import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { GooglePlayLogo, Recycle, CoinVertical, Crown } from "phosphor-react";

interface Icons {
  [key: number]: JSX.Element;
}

const icons: Icons = {
  1: <GooglePlayLogo size={48} weight="duotone" />,
  2: <Recycle size={48} weight="duotone" color="#00FF00" />,
  3: <CoinVertical size={48} weight="duotone" color="#FFD700" />,
  4: <Crown size={48} weight="duotone" color="#FFEE58" />,
};

export default function HowItWorks() {
  return (
    <Layout title="How It Works">
      <Container maxW={"8xl"} h={"full"} mb={"36"}>
        <SimpleGrid
          columns={{ base: 1, md: 4, lg: 4 }}
          spacing={10}
          gap={{ base: "5", md: "6" }}
        >
          {Data.map((item) => (
            <Box
              key={item.id}
              px={{ base: "4", md: "6" }}
              py={{ base: "5", md: "6" }}
              bg="bg-surface"
              borderRadius="lg"
              boxShadow="xl"
            >
              <Box justifyContent={"center"} display={"flex"} mb={"4"}>
                {icons[item.id]}
              </Box>

              <Text size={"lg"} fontWeight={"bold"} textAlign={"center"}>
                {item.title}
              </Text>
              <Text size={"sm"} textAlign={"center"}>
                {item.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}

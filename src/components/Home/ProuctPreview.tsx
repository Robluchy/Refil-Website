import { ProductList } from "@/interfaces";
import {
  Box,
  Text,
  Image,
  Container,
  SimpleGrid,
  Stack,
  Heading,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import { useRouter } from "next/router";

interface ProductCardProps {
  products: ProductList[];
}
const style = {
  height: 40,
};
export default function ProuctPreview({ products }: ProductCardProps) {
  const router = useRouter();

  return (
    <Box as="section" py={20}>
      <Container maxW="8xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} gap={"6"}>
          {products.map((product) => (
            <Box
              h={"100%"}
              key={product.name}
              bg="bg-surface"
              rounded={"lg"}
              border={"1px"}
              borderColor="black"
              boxShadow={"6px 6px 0 #90CDF4"}
              _hover={{
                boxShadow: "12px 12px 0 #90CDF4",
                transform: "translate(-10px, -10px)",
              }}
              transition={"all .2s ease-in-out"}
              cursor={"pointer"}
            >
              <Box mb={5} h={{ base: "auto", md: "25rem" }}>
                <Image
                  src={product.image[0]}
                  alt={product.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  onClick={() => router.push(`/products/${product.name}`)}
                />
              </Box>
              <Stack
                direction={"row"}
                align={"center"}
                overflow={"clip"}
                justify={"space-between"}
                px={6}
                pb={6}
              >
                <Heading
                  size={{ base: "sm", md: "md" }}
                  color="muted"
                  overflow={"clip"}
                >
                  {product.name}
                </Heading>
                <Heading
                  size={{ base: "sm", md: "md" }}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={0}
                >
                  {product.points}
                  <Lottie
                    animationData={require("public/coins.json")}
                    style={style}
                  />
                </Heading>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

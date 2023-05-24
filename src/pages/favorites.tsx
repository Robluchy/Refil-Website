import { Layout } from "@/components/Layout";
import { useAuth } from "@/firebase/context/AuthContext";
import {
  Box,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getFavorites } from "@/firebase/firestore";
import { useState, useEffect } from "react";
import { ProductList } from "@/interfaces";
import { getProductByName } from "@/firebase/utils/getProducts";
import Lottie from "lottie-react";
import router from "next/router";

export default function Favorites() {
  const { user } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState<ProductList[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites(user.uid);
      const favoriteProductsData = await Promise.all(
        favorites.map((productId) => getProductByName(productId))
      );
      setFavoriteProducts(favoriteProductsData);
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);
  const style = {
    height: 40,
  };
  return (
    <Layout title="Favorites">
      <Box bg="secondary.background" h={"100%"}>
        <Container maxW={"8xl"} h={"full"} pb={"36"}>
          <Text
            fontSize={{ base: "6xl", md: "8xl" }}
            textTransform={"uppercase"}
            fontWeight={"bold"}
            color={"primary.Heading"}
            mb={"10"}
            textAlign={"center"}
          >
            Favorites
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} gap={"6"}>
            {favoriteProducts.map((product) => (
              <Box
                key={product.name}
                rounded={"2xl"}
                border={"1px"}
                borderColor="black"
                boxShadow={"6px 6px 0 #90CDF4"}
                _hover={{
                  boxShadow: "12px 12px 0 #90CDF4",
                  transform: "translate(-10px, -10px)",
                }}
                transition={"all .2s ease-in-out"}
                bg={"white"}
                cursor={"pointer"}
              >
                <Box mb={5} h={{ base: "auto", md: "25rem" }}>
                  <Image
                    src={product.image[0]}
                    alt={product.name}
                    rounded={"2xl"}
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
    </Layout>
  );
}

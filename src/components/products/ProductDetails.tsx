import { ProductList } from "@/interfaces";
import { useAuth } from "@/firebase/context/AuthContext";
import {
  Box,
  Container,
  Text,
  Image,
  Grid,
  GridItem,
  Button,
  Link,
  Tooltip,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import CheckShippingInfo from "./CheckShippingInfo";
import { getFavorites, updateFavorite } from "@/firebase/firestore";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface ProductCardProps {
  pro: ProductList;
}

export default function ProductDetails({ pro }: ProductCardProps) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const favorites = await getFavorites(user.uid);
        setIsFavorite(favorites.includes(pro.name));
      }
    };
    fetchFavorites();
  }, [user, pro.name]);
  const style = {
    height: 60,
  };
    const style2 = {
      height: 40,
    };
  return (
    <Box bg={"#D8EEFE"} h={"100%"} w={"100%"}>
      <Container
        maxW={"8xl"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={32}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10} h={"100%"}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"full"}
            h={"100%"}
          >
            <Heading
              fontSize={{ base: "5xl", md: "7xl", lg: "6xl", xl: "7xl" }}
              fontWeight={"black"}
              textAlign={"center"}
              textTransform={"uppercase"}
              color={"primary.Heading"}
            >
              {pro.name}
            </Heading>
          </Box>

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            h={"100%"}
          >
            <SimpleGrid columns={1} gap={"6"}>
              <GridItem colSpan={2}>
                <Box my={8}>
                  <Image
                    src={pro.image[0]}
                    alt={pro.name}
                    w={"fit-content"}
                    h={"fit-content"}
                    m={"auto"}
                    borderRadius={"xl"}
                    boxShadow="dark-lg"
                    border={"1px solid"}
                    objectFit="cover"
                  />
                </Box>
                <SimpleGrid gap={10} columns={{ base: 1, md: 2 }}>
                  {pro.image
                    .flat()
                    .slice(1)
                    .map((img, index) => (
                      <GridItem
                        key={index}
                        m="auto"
                        w="fit-content"
                        h="fit-content"
                        mt={4}
                      >
                        <Image
                          src={img}
                          borderRadius={"xl"}
                          boxShadow="dark-lg"
                          boxDecorationBreak={"slice"}
                          alt={img}
                          border={"1px solid"}
                          w={"fit-content"}
                          h={"fit-content"}
                          objectFit="cover"
                        />
                      </GridItem>
                    ))}
                </SimpleGrid>
              </GridItem>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Container>
      <Container maxW={"7xl"} pb={20}>
        <Box
          display={"flex"}
          w={"full"}
          h={"full"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {user ? (
            user.points < pro.points ? (
              <Box display={"flex"} mt={10} mb={10} w={"full"} h={"full"}>
                <Tooltip label="You don't have enough points" hasArrow>
                  <Button
                    isDisabled={user.points < pro.points}
                    fontSize="2xl"
                    boxShadow="dark-lg"
                    borderRadius={"xl"}
                    bg={"transparent"}
                    _hover={{ bg: "transparent" }}
                  >
                    {pro.points}
                    <Lottie
                      animationData={require("public/coins.json")}
                      style={style}
                    />
                  </Button>
                </Tooltip>
              </Box>
            ) : (
              <CheckShippingInfo pro={pro} user={user} />
            )
          ) : (
            <Link href="/signup">
              <Button
                fontSize="2xl"
                boxShadow="dark-lg"
                borderRadius={"xl"}
                bg={"transparent"}
                _hover={{ bg: "transparent" }}
              >
                {pro.points}
              </Button>
            </Link>
          )}
          {user && (
            <Box
              m={"auto"}
              p={2}
              bg={"#D8EEFE"}
              borderRadius={"xl"}
              boxShadow="dark-lg"
            >
              <Button
                onClick={() => {
                  updateFavorite(user.uid, pro.name, isFavorite);
                  setIsFavorite(!isFavorite);
                }}
                _hover={{ bg: "transparent" }}
                w={"fit-content"}
                h={"fit-content"}
                bg="transparent"
              >
                {isFavorite ? (
                  <Lottie
                    animationData={require("public/heart.json")}
                    style={style2}
                  />
                ) : (
                  <Lottie
                    animationData={require("public/black-heart.json")}
                    style={style2}
                  />
                )}
              </Button>
            </Box>
          )}
        </Box>

        {pro.description && (
          <Box
            my={10}
            textAlign={"center"}
            w={"full"}
            h={"full"}
            p={10}
            bg={"#D8EEFE"}
            borderRadius={"xl"}
            boxShadow="dark-lg"
          >
            <Text fontSize={"2xl"} fontWeight={"bold"} m={4}>
              Description
            </Text>
            <Text fontSize={"xl"} m={4}>
              {pro.description}
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
}

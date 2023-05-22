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
} from "@chakra-ui/react";
import CheckShippingInfo from "./CheckShippingInfo";

interface ProductCardProps {
  pro: ProductList;
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function ProductDetails({ pro }: ProductCardProps) {
  const { user } = useAuth();

  const Form1 = () => {
    return (
      <>
        <Text
          fontSize={"2xl"}
          fontWeight="semibold"
          mb="4%"
          textAlign="center"
          textTransform={"uppercase"}
        >
          End user license agreement for refil store
        </Text>
        <Text fontSize={"md"} mb="4%">
          By clicking on the Next button, I accept the
          <Link href={"/"} color="blue">
            terms and conditions
          </Link>
          of the license agreement for the use of the refil store software
          product, which is a legally binding agreement between me and the refil
          store software product.
        </Text>
      </>
    );
  };
  return (
    <Container maxW={"8xl"} mt={20}>
      <Text as={"h1"} fontSize={"4xl"} fontWeight={"bold"} mb={4}>
        {pro.name}
      </Text>
      <Grid gap={4} alignItems={"center"} templateColumns={"repeat(3, 1fr)"}>
        <GridItem colSpan={2}>
          <Box>
            <Image src={pro.image[0]} w={"33%"} h={"33%"} alt={pro.name} />
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"} m={4}>
              {pro.name}
            </Text>
          </Box>
          <Box>
            {user ? (
              user.points < pro.points ? (
                <Tooltip label="You don't have enough points" hasArrow>
                  <Button isDisabled={user.points < pro.points}>
                    {pro.points}
                  </Button>
                </Tooltip>
              ) : (
                <CheckShippingInfo pro={pro} user={user} />
              )
            ) : (
              <Link href="/signup">
                <Button>{pro.points}</Button>
              </Link>
            )}
          </Box>
        </GridItem>
        {pro.description && (
          <GridItem colSpan={3}>
            <Box>
              <Text fontSize={"2xl"} fontWeight={"bold"} m={4}>
                Description
              </Text>
              <Text fontSize={"xl"} m={4}>
                {pro.description}
              </Text>
            </Box>
          </GridItem>
        )}
      </Grid>
    </Container>
  );
}

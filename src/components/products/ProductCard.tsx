import {
  Box,
  Image,
  Stack,
  Heading,
  SimpleGrid,
  Container,
  Input,
  Button,
} from "@chakra-ui/react";
import { ProductList } from "@/interfaces";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import { useState } from "react";
interface ProductCardProps {
  pro: ProductList[];
}
const style = {
  height: 40,
};

export const ProductCard = ({ pro }: ProductCardProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = pro.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredProducts.length / pageSize);

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <Box as="section" pb={8}>
        <Container maxW={"9xl"} px={8}>
          <Stack
            spacing={4}
            display={"inline-flex"}
            justify={"center"}
            align={"center"}
            w={"full"}
          >
            <Input
              placeholder="Search ..."
              rounded={"full"}
              value={searchTerm}
              onChange={handleSearch}
              mb={12}
              w={{ base: "xs", md: "sm", lg: "md" }}
              border={"2px"}
              borderColor="black"
              _focus={{
                bg: "gray.200",
                outline: "none",
              }}
            />
          </Stack>
          <SimpleGrid gap={10} columns={{ base: 1, md: 2, lg: 3 }}>
            {visibleProducts.map((product) => (
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
                  transform: "translate(-18px, -18px)",
                }}
                transition={"all .2s ease-in-out"}
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
          <Stack direction="row" mt={6} justify={"center"} align={"center"}>
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: pageCount }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <Button
                  key={pageNumber}
                  isActive={pageNumber === currentPage}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}
            <Button
              disabled={currentPage === pageCount}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

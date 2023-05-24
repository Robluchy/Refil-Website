import { Box, Heading, Text, Stack, SimpleGrid } from "@chakra-ui/react";
import { CrudProducts } from "@/components/products/CrudProducts";
import AddProduct from "@/components/products/AddProduct";
import { ProductList } from "@/interfaces";
import { GetStaticProps } from "next";
import { useState } from "react";
import { getProducts } from "@/firebase/utils/getProducts";
import { Layout } from "../Layout";

interface Props {
  products: ProductList[];
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: 10,
  };
};

export default function Products({ products }: Props) {
  const [productList, setProductList] = useState<ProductList[]>(products);
  const handleAddProduct = (newProduct: ProductList) => {
    setProductList([...productList, newProduct]);
  };

  return (
    <Layout title="Admin Products">
      <SimpleGrid
        gridAutoFlow="dense"
        justifyContent="center"
        alignItems="center"
        templateColumns={{
          md: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <Box
          order={{ base: 2, xl: 0 }}
          rounded={"lg"}
          mx={"auto"}
          maxW={{ base: "md", md: "xl", xl: "2xl" }}
          w={"full"}
          boxShadow={"lg"}
          p={8}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Register a new product to the store 🛒
            </Heading>
            <Text fontSize={"xs"} color={"gray.600"} py={8}>
              remember to fill all the fields if you want to add a new product
            </Text>
          </Stack>
          <AddProduct handleAddProduct={handleAddProduct} />
        </Box>

        <Stack align={"center"} order={{ base: 1, md: 1 }}>
          <CrudProducts product={productList} />
        </Stack>
      </SimpleGrid>
    </Layout>
  );
}

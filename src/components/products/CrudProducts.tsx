import { useState } from "react";
import { ProductList } from "@/interfaces";
import { db } from "@/firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Checkbox,
  CheckboxGroup,
  Box,
  Stack,
} from "@chakra-ui/react";

interface product {
  product: ProductList[];
}

export const CrudProducts = ({ product }: product) => {
  const [productList, setProductList] = useState(product);

  const deleteProduct = (name: string) => {
    const productRef = doc(db, "products", name);
    deleteDoc(productRef);
    setProductList(productList.filter((product) => product.name !== name));
  };

  return (
    <TableContainer maxW={{ base: "sm", md: "lg", xl: "2xl" }}>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>Category</Th>
            <Th>Points</Th>
            <Th> Available | New </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody >
          {productList.map(({ name, category, points, available, isNew }) => (
            <Tr key={name}>
              <Td overflow={"clip"} maxW={"36"}>
                {name}{" "}
              </Td>
              <Td overflow={"hidden"}> {category} </Td>
              <Td> {points} </Td>
              <Td>
                <CheckboxGroup colorScheme="green">
                  <Stack
                    direction={["row"]}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-evenly"
                  >
                    <Checkbox size="md" isChecked={available} />
                    <Checkbox size="md" isChecked={isNew} />
                  </Stack>
                </CheckboxGroup>
              </Td>
              <Td>
                <Button
                  fontSize={"sm"}
                  bg={"transparent"}
                  _hover={{ bg: "transparent" }}
                >
                  🛠
                </Button>
                <Button
                  bg={"transparent"}
                  fontSize={"sm"}
                  _hover={{ bg: "transparent" }}
                  onClick={() => deleteProduct(name)}
                >
                  ❌
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

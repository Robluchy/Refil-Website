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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const deleteProduct = async (name: string) => {
    const productRef = doc(db, "products", name);
    await deleteDoc(productRef);
    setProductList(productList.filter((product) => product.name !== name));
  };

  const pageCount = Math.ceil(productList.length / pageSize);

  const visibleProducts = productList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
        <Tbody>
          {visibleProducts.length > 0 ? (
            visibleProducts.map(
              ({ name, category, points, available, isNew }) => (
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
              )
            )
          ) : (
            <Tr>
              <Td colSpan={5}>
                <Box textAlign="center">No products found.</Box>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <Stack direction="row" mt={6} justify="center" align="center">
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
    </TableContainer>
  );
};

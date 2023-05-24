import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Stack,
} from "@chakra-ui/react";
import { UserInfo } from "@/interfaces";
import { GetStaticProps } from "next";
import { Layout } from "./Layout";
import { getUsers } from "@/firebase/utils/getUsers";
import { useState } from "react";

interface Props {
  users: UserInfo[];
}

export const getStaticProps: GetStaticProps = async () => {
  const users = await getUsers();
  return { props: { users } };
};

export default function Admin({ users }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageCount = Math.ceil(users.length / pageSize);

  const visibleUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Layout title="Admin Products">
      <Box maxW={"7xl"} mx={"auto"} py={12} px={6}>
        <Heading>Users</Heading>
        <Text my={8}>
          A list of users retrieved from a Firebase Cloud Firestore collection.
        </Text>
        <Table
          mt={6}
          variant="simple"
          bg={"white"}
          boxShadow={"md"}
          maxW={"7xl"}
          mx={"auto"}
          py={12}
          px={6}
          shadow={"2xl"}
          rounded={"lg"}
          overflow={"hidden"}
        >
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Points</Th>
              <Th>Purchase History</Th>
              <Th> Bottles Recycled</Th>
            </Tr>
          </Thead>
          <Tbody>
            {visibleUsers.length > 0 ? (
              visibleUsers.map((user) => (
                <Tr key={user.uid}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.points}</Td>
                  <Td>
                    <Button
                      size="sm"
                      bg="transparent"
                      onClick={() => {
                        console.log("View user history");
                      }}
                    >
                      📜
                    </Button>
                  </Td>
                  <Td>{user.bottles}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={3}>No users found.</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {pageCount > 1 && (
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
        )}
      </Box>
    </Layout>
  );
}

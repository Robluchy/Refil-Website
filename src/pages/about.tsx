import { Layout } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Box,
  Text,
  Heading,
  Container,
  Stack,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import Team from "@/components/data/teamDto";
import Lottie from "lottie-react";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 3 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: i * 0.3 },
  }),
};

const cardHover = {
  hover: { scale: 1.05, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
};

const blurEffect = {
  blurred: { filter: "blur(3px)" },
  normal: { filter: "blur(0px)" },
};

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <Layout title="About">
      <Container maxW={"8xl"} h={"full"} mb={"36"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={10}
        >
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
              fontFamily={"Montserrat_Alternates"}
              textTransform={"uppercase"}
              py={4}
            >
              We are a small team but we have big dreams
            </Heading>
          </motion.div>
        </Stack>

        <Container maxW={"7xl"}>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: "5", md: "6" }}
            w={"full"}
            h={"full"}
          >
            <AnimatePresence>
              {Team.map((member, index) => (
                <motion.div
                  key={member.name}
                  custom={index}
                  variants={slideUp}
                  initial="hidden"
                  animate="visible"
                  onMouseEnter={() => setHoveredCard(member.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <motion.div
                    variants={
                      hoveredCard && hoveredCard !== member.name
                        ? blurEffect
                        : cardHover
                    }
                    initial="normal"
                    animate={
                      hoveredCard && hoveredCard !== member.name
                        ? "blurred"
                        : "normal"
                    }
                    whileHover="hover"
                    transition={{ duration: 0.2 }}
                  >
                    <Box key={member.name} shadow="dark-lg" rounded="2xl">
                      <Box
                        p="6"
                        roundedTop="lg"
                        bg="gray.50"
                        textAlign="center"
                      >
                        <Box
                          as="img"
                          w="32"
                          h="32"
                          mx="auto"
                          mb="4"
                          rounded="full"
                          objectFit="cover"
                          src={member.image}
                          alt={member.name}
                        />
                        <Heading
                          fontSize="lg"
                          fontWeight="bold"
                          fontFamily={"Montserrat_Alternates"}
                        >
                          {member.name}
                        </Heading>
                        <Heading
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.500"
                          mt="1"
                        >
                          {member.role}
                        </Heading>
                      </Box>

                      <Box p="6" w="100%" bg="white">
                        <Stack spacing="4">
                          <Box>
                            <Box
                              as="p"
                              my="1"
                              fontSize="sm"
                              color="gray.500"
                              lineHeight="tall"
                            >
                              {member.about}
                            </Box>
                          </Box>

                          <Stack direction="row" spacing="4" align="center">
                            <Link
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener"
                            >
                              <Lottie
                                animationData={require("public/linkedin.json")}
                                style={{ width: 42, height: 42 }}
                                loop={false}
                              />
                            </Link>
                            <Link
                              href={member.github}
                              target="_blank"
                              rel="noopener"
                            >
                              <Lottie
                                animationData={require("public/github.json")}
                                style={{ width: 32, height: 32 }}
                              />
                            </Link>
                          </Stack>
                        </Stack>
                      </Box>
                    </Box>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </SimpleGrid>
        </Container>
      </Container>
    </Layout>
  );
}

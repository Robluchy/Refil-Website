import { Flex, Heading, Stack, Text, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function Hero() {
  const line1 = "ReFill";
  const line2 = "Redefining Sustainability in 3D Printing";
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.1,
      },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  const introVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };
  return (
    <Stack>
      <motion.div
        className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={introVariants}
      >
        <Container maxW={"8xl"}>
          <Flex justify={"center"}>
            <Heading
              overflow={"auto"}
              textAlign={"center"}
              userSelect={"none"}
              zIndex={-1}
            >
              <motion.div
                variants={sentence}
                initial="hidden"
                animate="visible"
              >
                {line1.split("").map((char, index) => {
                  return (
                    <motion.span key={char + "-" + index} variants={letter}>
                      <Text
                        fontFamily={"Rampart_One"}
                        textTransform={"uppercase"}
                        as={"span"}
                        fontSize={{ sm: "8rem", md: "13rem", lg: "17rem" }}
                      >
                        {char}
                      </Text>
                    </motion.span>
                  );
                })}
                <br />
                {line2.split("").map((char, index) => {
                  return (
                    <motion.span key={char + "-" + index} variants={letter}>
                      <Text
                        fontFamily={"Rampart_One"}
                        textTransform={"uppercase"}
                        textUnderlineOffset={"0.2rem"}
                        as={"span"}
                        fontSize={{ sm: "3rem", md: "5rem", lg: "9rem" }}
                      >
                        {char}
                      </Text>
                    </motion.span>
                  );
                })}
              </motion.div>
            </Heading>
          </Flex>
        </Container>
      </motion.div>
    </Stack>
  );
}

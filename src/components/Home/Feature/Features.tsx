import { Heading, Stack, Box, Text, Flex } from "@chakra-ui/react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import data from "./dataFeature";
import { useRef } from "react";
export default function Features() {
  const style = {
    height: 400,
  };
  const bottles = useRef<LottieRefCurrentProps>(null);
  const coins = useRef<LottieRefCurrentProps>(null);
  const recicler = useRef<LottieRefCurrentProps>(null);
  type RefKeys = "bottles" | "coins" | "recicler";
  const refs: Record<RefKeys, React.RefObject<LottieRefCurrentProps>> = {
    bottles,
    coins,
    recicler,
  };
  return (
    <Box bg={"secondary.background"}>
      <Flex
        flexDirection={{ base: "column" }}
        maxW={"8xl"}
        w={"full"}
        py={20}
        mx="auto"
        justify={"center"}
        userSelect={"none"}
      >
        {data.map((item, index) => (
          <Stack
            key={index}
            flexDirection={{ base: "column", lg: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            rounded={"xl"}
            my={5}
            h={"auto"}
            mx={["auto", 10]}
            overflow={"hidden"}
            bg="white"
            border={"1px"}
            borderColor="black"
            boxShadow={"6px 6px 0 #094067"}
          >
            <Box
              w={"auto"}
              h={"auto"}
              justifyContent={"center"}
              alignItems={"center"}
              flex={1}
              order={item.order}
            >
              <Lottie
                lottieRef={refs[item.ref as RefKeys]}
                animationData={require(`public/${item.image}`)}
                style={style}
                onEnterFrame={(e) => {
                  refs[item.ref as RefKeys].current?.setSpeed(0.5);
                }}
                loop
              />
            </Box>
            <Box p={10} flex={1} w={"auto"}>
              <Box
                display={"inline-block"}
                px={2}
                py={1}
                color="white"
                mb={2}
                bg={"#3da9fc"}
              >
                <Text fontSize={"xs"} fontWeight="medium">
                  Mission {index + 1}
                </Text>
              </Box>
              <Heading color={"#094067"} fontSize={"4xl"}>
                {item.title}
              </Heading>
              <Text color={"gray.500"} fontSize={"lg"} mt={2}>
                {item.description}
              </Text>
            </Box>
          </Stack>
        ))}
      </Flex>
    </Box>
  );
}

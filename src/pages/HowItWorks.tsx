import { Layout } from "@/components/Layout";
import Data from "@/components/data/HowItWorksDto";
import {
  Box,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { GooglePlayLogo, Recycle, CoinVertical, Crown } from "phosphor-react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";

interface Icons {
  [key: number]: JSX.Element;
}

const icons: Icons = {
  1: <GooglePlayLogo size={48} weight="duotone" />,
  2: <Recycle size={48} weight="duotone" color="#00FF00" />,
  3: <CoinVertical size={48} weight="duotone" color="#FFD700" />,
  4: <Crown size={48} weight="duotone" color="#FFEE58" />,
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 3 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: i * 0.5 },
  }),
};

export default function HowItWorks() {
  return (
    <Layout title="How It Works">
      <Container maxW={"8xl"} h={"100%"} mb={"36"}>
        <SimpleGrid
          columns={{ base: 1, md: 4, lg: 4 }}
          spacing={10}
          pt={{ base: "10", md: "20" }}
          gap={{ base: "10", md: "6" }}
          h={"100%"}
        >
          {Data.map((item) => (
            <motion.div
              key={item.id}
              custom={item.id}
              variants={slideUp}
              initial="hidden"
              animate="visible"
            >
              <Box
                px={{ base: "4", md: "6" }}
                py={{ base: "5", md: "6" }}
                bg="bg-surface"
                borderRadius="lg"
                boxShadow="xl"
              >
                <Box justifyContent={"center"} display={"flex"} mb={"4"}>
                  {icons[item.id]}
                </Box>

                <Text size={"lg"} fontWeight={"bold"} textAlign={"center"}>
                  {item.title}
                </Text>
                <Text size={"sm"} textAlign={"center"}>
                  {item.description}
                </Text>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
        <Box mt={"10"} textAlign={"center"} fontSize={"sm"} h={"100%"}>
          <Text>
            <Text as={"span"} fontWeight={"bold"}>
              Note:
            </Text>{" "}
            The above mentioned steps are for the first time users only. Once
            you have completed the above steps, you can directly login to the
            app using your credentials.
          </Text>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={10}
          pt={{ base: "10", md: "20" }}
          gap={{ base: "5", md: "6" }}
          h={"100%"}
        >
          <Box mt={"10"} textAlign={"center"} fontSize={"md"} h={"100%"}>
            <Text fontSize={"md"}>
              <Text as={"span"} fontWeight={"bold"}>
                QR Code:
              </Text>{" "}
              Scan the QR code below to download the app RecyclerMachine.apk
              this app is for the recycler machine to receive the bottles
            </Text>
            <Box
              mt={"5"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                src={"/RecyclerMachine.png"}
                alt={"RecyclerMachine.apk"}
                boxSize={"200px"}
              />
            </Box>
          </Box>

          <Box mt={"10"} textAlign={"center"} fontSize={"md"} h={"100%"}>
            <Text>
              <Text as={"span"} fontWeight={"bold"}>
                QR Code:
              </Text>{" "}
              Scan the QR code below to download the app
              BottlesAdministrator.apk this app is for the administrator to
              manage the bottles
            </Text>
            <Box
              mt={"5"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                src={"/BottlesAdministrator.png"}
                alt={"BottlesAdministrator.apk"}
                boxSize={"200px"}
              />
            </Box>
          </Box>

          <Box mt={"10"} textAlign={"center"} fontSize={"md"} h={"100%"}>
            <Text>
              <Text as={"span"} fontWeight={"bold"}>
                QR Code:
              </Text>{" "}
              Scan the QR code below to download the user app BottlesUser.apk
              this app is for the user to redeem the prizes
            </Text>
            <Box
              mt={"5"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                src={"/RefillAppLog.png"}
                alt={"BottlesUser.apk"}
                boxSize={"220px"}
              />
            </Box>
          </Box>
        </SimpleGrid>

        <Box
          mt={"20"}
          textAlign={"center"}
          fontSize={"md"}
          h={"100%"}
          mb={"5"}
          gap={10}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading as={"h2"} size={"lg"} mb={"5"}>
            How to use the app
          </Heading>
          <Box display={"flex"} alignItems={"center"} mb={"10"}>
            <Text>
              <Text as={"span"} fontWeight={"bold"}>
                Step 1:
              </Text>{" "}
              Login to the app using your credentials
            </Text>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Text>
              <Text as={"span"} fontWeight={"bold"} my={4}>
                Step 2:
              </Text>{" "}
              Click on the scan button to scan the QR code on the bottle
            </Text>
            <Lottie
              animationData={require("/public/1.json")}
              style={{ width: "300px", height: "300px" }}
            />
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Text>
              <Text as={"span"} fontWeight={"bold"}>
                Step 3:
              </Text>{" "}
              Once the QR code is scanned, the bottle will be added to your
              account{" "}
            </Text>{" "}
            <Lottie
              animationData={require("/public/2.json")}
              style={{ width: "300px", height: "300px" }}
            />
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Text>
              <Text as={"span"} fontWeight={"bold"}>
                Step 4:
              </Text>{" "}
              Once you have added the bottles to your account, you can click on
              the redeem button to redeem the bottles
            </Text>
            <Lottie
              animationData={require("/public/scrolling-phone.json")}
              style={{ width: "300px", height: "300px" }}
            />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

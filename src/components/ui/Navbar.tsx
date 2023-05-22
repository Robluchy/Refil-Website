import {
  Box,
  Flex,
  Show,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  Text,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { List, Moon, SlidersHorizontal, Star, Sun, X } from "phosphor-react";
import { useAuth } from "@/firebase/context/AuthContext";
import LoginModal from "./LoginModal";
import { logout } from "@/firebase/auth";
import { useRouter } from "next/router";
import CustomAvatar from "../CustomAvatar";
import Lottie from "lottie-react";

const handleLogout = async () => {
  await logout();
};

function formatPoints(points: number): string {
  if (points >= 1000000) {
    return (points / 1000000).toFixed(1) + "M";
  } else if (points >= 1000) {
    return (points / 1000).toFixed(1) + "K";
  } else {
    return points.toString();
  }
}

const Links = [
  { text: "home", href: "/" },
  { text: "store", href: "/store" },
  { text: "about", href: "/about" },
  { text: "How It Works", href: "/HowItWorks" },
];

const NavLink = ({ link }: { link: { text: string; href: string } }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "cyan.200",
    }}
    href={link.href}
  >
    {link.text}
  </Link>
);

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const gold =
    "0.2px 0.2px 1px #FDD835, -0.2px -0.2px 1px #FDD835, 0.2px -0.2px 1px #FDD835, -0.2px 0.2px 1px #FDD835";

  return (
    <>
      <Box
        px={4}
        blur={10}
        pos="sticky"
        top={0}
        zIndex={10}
        bg="transparent"
        backdropBlur={10}
        backdropFilter="blur(10px)"
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          pos="sticky"
          top={0}
          left={0}
          right={0}
          zIndex={10}
        >
          <IconButton
            size={"md"}
            background="trasparent"
            icon={
              isOpen ? (
                <X weight="fill" size={35} />
              ) : (
                <List weight="fill" size={35} />
              )
            }
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Link href="/">
            <Box display={{ base: "none", md: "block" }}></Box>
          </Link>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              fontWeight={"bold"}
              textTransform="uppercase"
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.text} link={link} />
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"} gap={2}>
            {user && (
              <Show above="md">
                <Flex minWidth="max-content" alignItems="center" gap="2">
                  <Text
                    fontFamily={"body"}
                    fontWeight="bold"
                    textShadow={gold}
                    color={"black"}
                    colorScheme=""
                  >
                    {formatPoints(user.points)}
                  </Text>
                  <Lottie
                    animationData={require("public/coin.json")}
                    style={{ height: 20 }}
                  />
                </Flex>
              </Show>
            )}
            <Menu>
              {user && (
                <MenuButton rounded={"full"} cursor={"pointer"} minW={0}>
                  <CustomAvatar name={user.name || ""} />
                </MenuButton>
              )}
              {!user && <LoginModal />}
              {user && (
                <MenuList>
                  <Stack px={4} py={2} spacing={4}>
                    <Button
                      onClick={toggleColorMode}
                      bg={"transparent"}
                      m={0}
                      _hover={{
                        textDecoration: "none",
                      }}
                    >
                      {colorMode === "light" ? (
                        <Moon size={32} weight="fill" />
                      ) : (
                        <Sun size={32} weight="fill" />
                      )}
                    </Button>
                  </Stack>
                  <MenuItem>{user.email}</MenuItem>
                  <Show below="md">
                    <MenuItem textAlign={"center"}>
                      {formatPoints(user.points)}
                    </MenuItem>
                  </Show>
                  <MenuItem gap={4} onClick={() => router.push("/settings")}>
                    <SlidersHorizontal size={32} weight="bold" />
                    <span>Settings</span>
                  </MenuItem>
                  <MenuItem gap={4} onClick={() => router.push("/favorites")}>
                    <Star size={32} weight="bold" />
                    <span>Favorites</span>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem gap={4} onClick={handleLogout}>
                    👋 Sign Out
                  </MenuItem>
                </MenuList>
              )}
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4} textTransform="uppercase">
              {Links.map((link) => (
                <NavLink key={link.text} link={link} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

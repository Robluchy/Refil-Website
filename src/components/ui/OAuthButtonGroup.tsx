import { signInWithGoogle } from "@/firebase/auth";
import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import Lottie from "lottie-react";
const handleGoogleLogin = async () => {
  await signInWithGoogle();
};

const providers = [
  {
    name: "Google",
    icon: (
      <Lottie
        animationData={require("public/google.json")}
        style={{ width: "80px", height: "80px" }}
      />
    ),
    onClick: handleGoogleLogin,
  },
];

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="outline" spacing="4" px={4} width="full">
    {providers.map(({ onClick, name, icon }) => (
      <Button
        key={name}
        width="fit-content"
        onClick={onClick}
        border={"none"}
        m={"auto"}
        _hover={{ bg: "transparent" }}
      >
        <VisuallyHidden>{name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
);

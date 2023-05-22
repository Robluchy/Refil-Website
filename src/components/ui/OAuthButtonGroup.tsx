import { signInWithGithub, signInWithGoogle } from "@/firebase/auth";
import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { FacebookLogo, GithubLogo, GoogleLogo } from "phosphor-react";
const handleGithubLogin = async () => {
  await signInWithGithub();
};

const handleGoogleLogin = async () => {
  await signInWithGoogle();
};

const handleFacebookLogin = async () => {
  await signInWithGoogle();
};

const providers = [
  {
    name: "Google",
    icon: <GoogleLogo size={32} />,
    onClick: handleGoogleLogin,
  },
  {
    name: "GitHub",
    icon: <GithubLogo size={32} />,
    onClick: handleGithubLogin,
  },
  {
    name: "Facebook",
    icon: <FacebookLogo size={32} />,
    onClick: handleFacebookLogin,
  },
];

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="outline" spacing="4" px={4} width="full">
    {providers.map(({ onClick, name, icon }) => (
      <Button key={name} width="full" onClick={onClick}>
        <VisuallyHidden>{name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
);

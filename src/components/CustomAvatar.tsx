import { Box, Text } from "@chakra-ui/react";

interface CustomAvatarProps {
  name: string;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ name }) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <Box
      borderRadius="full"
      bgGradient="linear(to-l, #3B82F6 , #A78BFA)"
      width={10}
      height={10}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontFamily={"Alfa_Slab_One"}>{initial}</Text>
    </Box>
  );
};

export default CustomAvatar;

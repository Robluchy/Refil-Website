import { useState, useEffect } from "react";
import { UserInfo, ProductList } from "@/interfaces";
import { buyProduct, hasShippingInfo } from "@/firebase/firestore";
import ShippingModal from "./ShippingModal";
import { Button, useToast } from "@chakra-ui/react";
import confetti from "canvas-confetti";
import Lottie from "lottie-react";
interface CheckShippingInfoProps {
  user: UserInfo;
  pro: ProductList;
}

const CheckShippingInfo: React.FC<CheckShippingInfoProps> = ({ user, pro }) => {
  const [userHasShippingInfo, setUserHasShippingInfo] = useState(false);
  const toast = useToast();
  const style = {
    height: 60,
  };
  useEffect(() => {
    const checkShippingInfo = async () => {
      const result = await hasShippingInfo(user.uid);
      setUserHasShippingInfo(result);
    };

    checkShippingInfo();
  }, [user.uid]);

  const createConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      particleSize: 30,
    };
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  };

  const handleBuyProduct = async () => {
    try {
      await buyProduct(user, pro.points, pro.name);
      createConfetti();
      toast({
        title: "Woohoo!",
        description: "You have successfully redeemed your product!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error!",
        description: "Something went wrong, please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {userHasShippingInfo ? (
        <Button
          fontSize="2xl"
          boxShadow="dark-lg"
          borderRadius={"xl"}
          bg={"transparent"}
          _hover={{ bg: "transparent" }}
          onClick={() => handleBuyProduct()}
        >
          {pro.points}
          <Lottie animationData={require("public/coins.json")} style={style} />
        </Button>
      ) : (
        <ShippingModal pro={pro} />
      )}
    </>
  );
};

export default CheckShippingInfo;

import { useState, useEffect } from "react";
import { UserInfo, ProductList } from "@/interfaces";
import { buyProduct, hasShippingInfo } from "@/firebase/firestore";
import ShippingModal from "./ShippingModal";
import { Button } from "@chakra-ui/react";

interface CheckShippingInfoProps {
  user: UserInfo;
  pro: ProductList;
}

const CheckShippingInfo: React.FC<CheckShippingInfoProps> = ({ user, pro }) => {
  const [userHasShippingInfo, setUserHasShippingInfo] = useState(false);

  useEffect(() => {
    const checkShippingInfo = async () => {
      const result = await hasShippingInfo(user.uid);
      setUserHasShippingInfo(result);
    };

    checkShippingInfo();
  }, [user.uid]);
  const handleBuyProduct = async () => {
    try {
      await buyProduct(user, pro.points, pro.name);
      alert("Compra realizada");
    } catch (e) {
      console.log(e);
    }
  };
  return userHasShippingInfo ? (
    <Button onClick={() => handleBuyProduct()}>{pro.points}</Button>
  ) : (
    <ShippingModal pro={pro} />
  );
};

export default CheckShippingInfo;

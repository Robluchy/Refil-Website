import { shippingData } from "@/firebase/firestore";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ProductList } from "@/interfaces";
import { useAuth } from "@/firebase/context/AuthContext";

interface props {
  pro: ProductList;
}

function ShippingModal({ pro }: props) {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [direction, setDirection] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const toast = useToast();

  const handleShipping = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      direction: direction,
      city: city,
      postalCode: postalCode,
      country: country,
      phoneNumber: phoneNumber,
    };
    try {
      await shippingData(user.uid, data);
      toast({
        title: "Shipping information saved.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
      window.location.reload();
    } catch (e) {
      toast({
        title: "An error occurred.",
        description: "Unable to save shipping information.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen}>{pro.points}</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shipping information</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <Flex>
                <FormControl mr="5%">
                  <FormLabel fontWeight={"normal"}>First name</FormLabel>
                  <Input
                    placeholder="First name"
                    isRequired={true}
                    type={"text"}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    zIndex={1}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight={"normal"}>Last name</FormLabel>
                  <Input
                    placeholder="First name"
                    isRequired={true}
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Flex>
            </FormControl>
            <FormControl my="5%">
              <FormLabel fontWeight={"normal"}>
                Direction (Street, number, apartment, etc.)
              </FormLabel>
              <Input
                type="text"
                value={direction}
                placeholder="Av. Alfonso X el Sabio, 37, 3ºA"
                isRequired={true}
                onChange={(e) => setDirection(e.target.value)}
              />
            </FormControl>
            <Flex>
              <FormControl mr="5%">
                <FormLabel fontWeight={"normal"}>City</FormLabel>
                <Input
                  placeholder="Alicante"
                  type="text"
                  value={city}
                  isRequired={true}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight={"normal"}>Postal code</FormLabel>
                <Input
                  placeholder="03008"
                  value={postalCode}
                  type="text"
                  maxLength={5}
                  minLength={5}
                  isRequired={true}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </FormControl>
            </Flex>
            <FormControl my="5%">
              <FormLabel fontWeight={"normal"}>Country</FormLabel>
              <Input
                placeholder="Spain"
                value={country}
                type="text"
                isRequired={true}
                onChange={(e) => setCountry(e.target.value)}
              />
            </FormControl>
            <FormControl my="5%">
              <FormLabel fontWeight={"normal"}>Phone number</FormLabel>
              <Input
                placeholder="Phone number"
                type="number"
                maxLength={9}
                minLength={9}
                value={phoneNumber}
                isRequired={true}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              colorScheme="blue"
              mr={3}
              width="full"
              onClick={handleShipping}
            >
              Save
            </Button>
            <Button onClick={onClose} width="full">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShippingModal;

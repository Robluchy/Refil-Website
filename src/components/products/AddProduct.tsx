import { useRef, useState } from "react";
import { addProduct } from "@/firebase/utils/addProduct";
import { ProductList } from "@/interfaces";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config";
import {
  FormControl,
  Stack,
  FormLabel,
  Input,
  Box,
  Text,
  Image,
  Textarea,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
interface Props {
  handleAddProduct: (newProduct: ProductList) => void;
}

export default function AddProduct({ handleAddProduct }: Props) {
  const [name, setName] = useState("Default name");
  const [description, setDescription] = useState("Default description");
  const [points, setPoints] = useState(0);
  const [category, setCategory] = useState("Default category");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      const previewURLs = files.map((file) => URL.createObjectURL(file));
      setImages(previewURLs);
    }
  };

  const handleUploadImage = async (
    file: File,
    index: number
  ): Promise<string | null> => {
    const imageName = `${name}_${index}`;
    const imageRef = ref(storage, `poducts/${imageName}`);
    await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imageUrls = await Promise.all(
      selectedFiles.map((file, index) => handleUploadImage(file, index))
    );
    const validImageUrls = imageUrls.filter((url) => url !== null) as string[];
    const product = {
      name: name,
      description: description,
      image: validImageUrls,
      available: true,
      category: category || "Uncategorized",
      points: points,
      isNew: true,
    };
    try {
      handleAddProduct(product);
      await addProduct(product);
      formRef.current?.reset();
      setImages([]);
      setSelectedFiles([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <FormControl isRequired mb="40px">
        <FormLabel>Name:</FormLabel>
        <Input
          type="text"
          name="name"
          placeholder="Name of the product..."
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl mb="40px">
        <FormLabel>Product description:</FormLabel>
        <Textarea
          placeholder="Enter a detailed description of the product..."
          name="productDescription"
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input
            style={{}}
            type="file"
            w={"50%"}
            fontSize="sm"
            borderWidth="0"
            fontWeight="semibold"
            py={{ base: 2, file: 2 }}
            px={{ base: 4, file: 4 }}
            mr={{ base: 0, file: 4 }}
            mt={{ base: 2, file: 0 }}
            mb={{ base: 4, file: 0 }}
            textTransform="uppercase"
            accept="image/*"
            onChange={handleChangeImage}
            multiple
          />
        </FormControl>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={{ base: "5", md: "6" }}
          justifyContent="center"
          alignItems="center"
          w={"100%"}
          justifyItems={"center"}
        >
          {images.map((imageUrl, index) => (
            <Box key={index}>
              <Box
                w="xs"
                rounded={"sm"}
                my={5}
                mx={[0, 5]}
                overflow={"hidden"}
                bg="white"
                border={"1px"}
                borderColor="black"
              >
                <Box h={"200px"} borderBottom={"1px"} borderColor="black">
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    w={"100%"}
                    h={"100%"}
                    objectFit={"cover"}
                  />
                </Box>
                <Box display={"flex"} justifyContent={"center"} p={5} gap={5}>
                  <Text
                    textAlign={"center"}
                    fontWeight={"bold"}
                    fontSize={"sm"}
                    noOfLines={2}
                  >
                    {selectedFiles[index].name}
                  </Text>
                  <Button onClick={() => handleDeleteImage(index)}>
                    Eliminar
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>

      <Stack
        direction={{ base: "column", sm: "row" }}
        align={"start"}
        justify={"space-between"}
      >
        <FormControl mb="40px">
          <FormLabel>Category:</FormLabel>
          <Input
            type="text"
            name="category"
            placeholder="Enter a category..."
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormControl>
        <FormControl mb="40px">
          <FormLabel>Points:</FormLabel>
          <Input
            type="number"
            name="points"
            defaultValue={0}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </FormControl>
      </Stack>
      <Box w={"100%"} display={"flex"} justifyContent={"center"}>
        <Button
          fontSize={"sm"}
          rounded={"full"}
          bg={"blue.400"}
          type="submit"
          w={"30%"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
        >
          Add product
        </Button>
      </Box>
    </form>
  );
}

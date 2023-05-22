import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { ProductList } from "@/interfaces";

export const addProduct = async (product: ProductList) => {
  const docRef = doc(collection(db, "products"), product.name);
  try {
    await setDoc(docRef, product);
  } catch (error) {
    console.error("Error adding product: ", error);
    throw new Error("Could not add product");
  }
};

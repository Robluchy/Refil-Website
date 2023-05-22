import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";

async function getProducts() {
  const productsRef = collection(db, "products");
  const productsSnapshot = await getDocs(productsRef);
  const products = productsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      available: data.available,
      description: data.description,
      category: data.category,
      image: [data.image],
      name: data.name,
      points: data.points,
      isNew: data.isNew,
    };
  });
  return products;
}

async function getProductByName(productName: string) {
  const productsRef = collection(db, "products");
  const queryRef = query(productsRef, where("name", "==", productName));
  const productSnapshot = await getDocs(queryRef);
  const product = productSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      available: data.available,
      description: data.description,
      category: data.category,
      image: [data.image],
      name: data.name,
      points: data.points,
      isNew: data.isNew,
    };
  })[0];

  return product;
}

export { getProducts, getProductByName };

import {
  setDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { UserInfo } from "@/interfaces";

export const createDefaultUser = async (
  userId: string,
  email: string | null
) => {
  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) {
    await setDoc(userRef, {
      name: email?.split("@")[0] ?? "User",
      uid: userId,
      email: email,
      points: 0,
      bottles: 0,
      favorites: [],
    });
  }
};

export const shippingData = async (userId: string, data: any) => {
  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    await setDoc(
      userRef,
      {
        ShippingInfo: data,
      },
      { merge: true }
    );
  }
};

export const updateFavorite = async (
  userId: string,
  productId: string,
  isFavorite: boolean
) => {
  const userRef = doc(db, "users", userId);
  if (isFavorite) {
    await updateDoc(userRef, {
      favorites: arrayRemove(productId),
    });
  } else {
    await updateDoc(userRef, {
      favorites: arrayUnion(productId),
    });
  }
};
export const getFavorites = async (userId: string): Promise<string[]> => {
  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    return userData?.favorites || [];
  }
  return [];
};

export const hasShippingInfo = async (userId: string): Promise<boolean> => {
  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    return !!userData?.ShippingInfo;
  }
  return false;
};

export const subtractPoints = async (userId: string, points: number) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    points: points,
  });
};

export const buyProduct = async (
  user: UserInfo,
  productPoints: number,
  productId: string
) => {
  const userRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    const newPoints = userData.points - productPoints;

    await updateDoc(userRef, {
      points: newPoints,
      PurchaseHistory: arrayUnion({
        productId: productId,
        points: productPoints,
        timestamp: new Date(),
      }),
    });
  }
};

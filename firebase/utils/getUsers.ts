// getUsers.ts
import { UserInfo } from "@/interfaces";

import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";

async function getUsers(): Promise<UserInfo[]> {
  const userCollection = collection(db, "users");
  const userSnapshot = await getDocs(userCollection);
  const users: UserInfo[] = userSnapshot.docs.map((doc) => {
    const data = doc.data();
    const purchaseHistory = data.PurchaseHistory
      ? data.PurchaseHistory.map((purchase: any) => {
          const products = purchase.products
            ? purchase.products.map((product: any) => ({
                ...product,
                timestamp: (product.timestamp as Timestamp)
                  .toDate()
                  .toISOString(),
              }))
            : [];

          return {
            ...purchase,
            timestamp: (purchase.timestamp as Timestamp).toDate().toISOString(),
            products,
          };
        })
      : [];

    return {
      uid: doc.id,
      email: data.email,
      name: data.name,
      points: data.points,
      bottles: data.bottles,
      ShippingInfo: data.ShippingInfo || null,
      PurchaseHistory: purchaseHistory,
      favorites: data.favorites || [],
    };
  }) as UserInfo[];
  return users;
}

async function getUserByEmail(userEmail: string): Promise<UserInfo | null> {
  const userCollection = collection(db, "users");
  const userQuery = query(userCollection, where("email", "==", userEmail));
  const userSnapshot = await getDocs(userQuery);
  if (userSnapshot.empty) {
    return null;
  }

  const userDoc = userSnapshot.docs[0];
  const user: UserInfo = {
    uid: userDoc.id,
    ...userDoc.data(),
  } as UserInfo;

  return user;
}

export { getUsers, getUserByEmail };

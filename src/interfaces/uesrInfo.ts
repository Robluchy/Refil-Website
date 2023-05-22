export interface UserInfo {
  email: string;
  name: string;
  points: number;
  ShippingInfo: {
    city: string;
    country: string;
    direction: string;
    firstName: string;
    lastName: string;
    postalCode: string;
    phone: string;
  };
  uid: string;
}

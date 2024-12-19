export interface PayementModel {
  id?: string;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  zip: string;
  date: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  amount: number;
}

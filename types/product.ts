export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  category: string;
  stock?: number;
};
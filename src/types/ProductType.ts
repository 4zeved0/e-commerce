export type ProductType = {
  id: string;
  price: number | null;
  name: string;
  quantity?: number | 1;
  description: string | null;
  image: string;
  currecy?: string;
}
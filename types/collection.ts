import { TProduct } from "./product";

export type TCollection = {
  id: number;
  name: string;
  description: string;
  type: number;
  position: number;
  show_on_home: boolean;
  products: TProduct[];
};

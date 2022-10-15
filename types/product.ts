import { TArea } from "./area";
import { TCategory } from "./category";
import { TMenu } from "./menu";

export type TProduct = {
  id: number;
  code: string;
  name: string;
  imageUrl: string;
  type: string;
  updatedDate: Date;
  createdDate: Date;
  active: boolean;
  supplierId: number;
  categoryId: number;
  category: TCategory;
  supplier: Supplier;
};

export interface Supplier {
  id: number;
  name: string;
  imageUrl: string;
  contact: string;
  address: string;
  type: string;
  updatedDate: Date;
  createdDate: Date;
  active: boolean;
  areaId: number;
  area: TArea;
}
export interface TProductInMenu {
  id: number;
  displayOrder: number;
  cost: number;
  price: number;
  discount: number;
  updatedDate: Date;
  createdDate: Date;
  isDiscount: boolean;
  active: boolean;
  menuId: number;
  productId: number;
  menu: TMenu;
  product: TProduct;
}

import { TMenu, TTimeSlot } from "./menu";
import { TProduct, TProductInMenu } from "./product";
import { TCustomer } from "./user";

export interface Cart {
  items: CartItem[];
  totalItem: number;
  total: number;
}

export type CartItem = {
  product: TProductInMenu;
  quantity: number;
  total: number;
  description: string;
  // product_extras?: Extra[];
};

export interface ProductChild {
  product_in_menu_id: number;
  quantity: number;
  description: string;
}

export interface ProductInMenuItem {
  id: number;
  quantity: number;
  description: string;
}

export interface SupplierNote {
  supplier_id: number;
  content: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

export interface OrderRequest {
  notes: string;
  endTime: string | null;
  menuId: number;
  locationId: number;
  timeSlotId: number;
  paymentMethod: string;
  productInMenus: ProductInMenuItem[];
}

export interface OrderResponse {
  id: number;
  orderCode: string;
  type: string;
  notes: string;
  totalAmount: number;
  finalAmount: number;
  discount: number;
  endTime: Date;
  status: string;
  createdDate: Date;
  active: boolean;
  customerId: number;
  menuId: number;
  locationId: number;
  shareLink: string;
  timeSlotId: number;
  customer: TCustomer;
  location: Location;
  menu: TMenu;
  timeSlot: TTimeSlot;
  orderDetails: OrderDetail[];
}
export interface OtherAmount {
  id: number;
  order_id: number;
  amount: number;
  name: string;
  description: string;
  meta_data: string;
  unit: string;
}

export interface OrderCompleteResponse {
  success: boolean;
  message: string;
  errorCode: number;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  createdDate: Date;
  active: boolean;
  areaId: number;
}

export interface Location2 {
  id: number;
  name: string;
  address: string;
  createdDate: Date;
  active: boolean;
  areaId: number;
}

export interface Area {
  id: number;
  name: string;
  shippingFee: number;
  description: string;
  createdDate: Date;
  active: boolean;
  locations: Location2[];
}

export type OrderDetail = {
  id: number;
  productInMenuId: number;
  customerCode: string;
  quantity: number;
  notes: string;
  unitPrice: number;
  unitCost: number;
  unitDiscount: number;
  createdDate: Date;
  active: boolean;
};

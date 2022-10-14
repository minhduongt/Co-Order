import { Extra, TProduct } from "./product";

export interface Cart {
  items: CartItem[];
  totalItem: number;
  total: number;
}

export type CartItem = {
  product: TProduct;
  quantity: number;
  description: string;
  product_extras?: Extra[];
};

export interface ProductChild {
  product_in_menu_id: number;
  quantity: number;
  description: string;
}

export interface ProductItem {
  master_product: number;
  quantity: number;
  description: string;
  product_childs?: ProductChild[];
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
  destination_location_id: number;
  payment: number;
  vouchers: string[];
  products_list: ProductItem[];
  supplier_notes?: SupplierNote[];
  customer_info: CustomerInfo;
}

export interface OrderResponse {
  other_amounts: OtherAmount[];
  invoice_id: string;
  order_id: number;
  total_amount: number;
  final_amount: number;
  discount: number;
  receive_bean: number;
  order_status: number;
  check_in_date: Date;
  message: Message;
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

export interface Message {
  content: string;
  action: string;
}

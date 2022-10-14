export type TProduct = {
  product_id: number;
  product_in_menu_id: number;
  product_name: string;
  product_name_en: string;
  bean: number;
  min_price: number;
  price: number;
  base_price: number;
  pic_url: string;
  product_type_id: number;
  product_type_name: string;
  has_extra: boolean;
  general_product_id: number;
  display_order: number;
  parent_product_id: number;
  category_id: number;
  category_name: string;
  description: string;
  supplier_id: number;
  supplier_name: string;
  default: number;
  min: number;
  max: number;
  group_id: number;
  product_code: string;
  is_and: boolean;
  is_available: boolean;
  is_default_child_product: number;
  menus: Menu[];
  attributes: Attributes;
  child_products: TProduct[];
  extras: Extra[];
  product_combination_models: ProductCombinationModel[];
  collection_id: number[];
  alternative_code: string;
  collections: Collection[];
  exclude_product_type: number[];
  show_children_products: boolean;
  text: string;
  text_en: string;
};

// export interface ChildProduct {
//   is_upgraded: boolean;
//   product_master_name: string;
//   product_master_name_en: string;
//   attributes: Attributes2;
//   extras: Extra[];
//   has_extra: boolean;
//   product_in_menu_id: number;
//   product_id: number;
//   product_name: string;
//   product_name_en: string;
//   product_type_id: number;
//   price: number;
//   pic_url: string;
//   general_product_id: number;
//   in_promotions: boolean;
// }

export interface Extra {
  default: number;
  is_base: boolean;
  min: number;
  max: number;
  has_extra: boolean;
  product_in_menu_id: number;
  product_id: number;
  product_name: string;
  product_name_en: string;
  attributes: Attributes3;
  product_type_id: number;
  price: number;
  pic_url: string;
  general_product_id: number;
  in_promotions: boolean;
}

export interface Extra2 {
  default: number;
  is_base: boolean;
  min: number;
  max: number;
  has_extra: boolean;
  product_in_menu_id: number;
  product_id: number;
  product_name: string;
  product_name_en: string;
  attributes: Attributes4;
  product_type_id: number;
  price: number;
  pic_url: string;
  general_product_id: number;
  in_promotions: boolean;
}

export interface Menu {
  product_in_menu_id: number;
  menu_id: number;
  menu_name: string;
  time_from_to: string[];
  time_from_db: number;
  time_to_db: number;
  product_name: string;
  cost: number;
  price: number;
  supplier_store_id: number;
}

export interface Attributes {
  base: string;
  size: string;
}

export interface Attributes2 {
  base: string;
  size: string;
}

export interface Attributes3 {
  base: string;
  size: string;
}

export interface Attributes4 {
  base: string;
  size: string;
}

export interface ProductCombinationModel {
  base_product_id: number;
  product_id: number;
  quantity: number;
  position: number;
  active: boolean;
  default: number;
  min: number;
  max: number;
  default_min_max: string;
  is_and: boolean;
  group_id: number;
  description: string;
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  banner_url: string;
  brand_id: number;
  type: number;
  position: number;
  active: boolean;
  show_on_home: boolean;
}

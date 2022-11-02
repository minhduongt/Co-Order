import { TLocation } from "./location";
import { TMenu } from "./menu";
import { TProduct, TProductInMenu } from "./product";
import { TTimeSlot } from "./timeslot";
import { TCustomer } from "./user";

// export type TOrder = {
//   invoice_id: string;
//   check_in_date: Date;
//   check_out_date: Date;
//   total_amount: number;
//   discount: number;
//   discount_order_detail: number;
//   final_amount: number;
//   order_status: number;
//   customer_id: number;
//   is_exported: boolean;
//   time_slot: string;
//   arrive_time: string;
//   dest_location_id: number;
//   batch_id: number;
//   unibean_metadata: string;
//   order_delivery_amount: number;
//   // batch:	Batch{...},
//   // customer:	Customer{...},
//   // dest_location:	DestinationLocation{...}
//   order_details: any[];
//   payment: any[];
//   store_notes: any[];
//   id: number;
//   active: boolean;
//   created_by: string;
//   updated_by: string;
//   created_at: Date;
//   updated_at: Date;
// };

export type TOrder = {
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
  location: TLocation;
  orderDetails: TOrderDetail[];
};
export type TOrderDetail = {
  id: number;
  orderCode: string;
  receiveAddress: string;
  notes: string;
  status: string;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  receiveTime: String;
  createdDate: Date;
  details: Detail[];
};

export interface PartyDetail {
  customerCode: string;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface TRecipient {
  customerCode: string;
  totalAmount: number;
  discount: number;
  shippingFee: number;
  finalAmount: number;
}

export type TPartyOrderDetail = {
  orderId: number;
  orderCode: string;
  receiveTime: string;
  receiveAddress: string;
  notes: string;
  status: string;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  createdDate: Date;
  partyDetails: PartyDetail[];
  recipients: TRecipient[];
};

export type Detail = {
  customerCode: string;
  productName: string;
  unitPrice: number;
  quantity: number;
};

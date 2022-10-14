export type TOrder = {
  invoice_id: string;
  check_in_date: Date;
  check_out_date: Date;
  total_amount: number;
  discount: number;
  discount_order_detail: number;
  final_amount: number;
  order_status: number;
  customer_id: number;
  is_exported: boolean;
  time_slot: string;
  arrive_time: string;
  dest_location_id: number;
  batch_id: number;
  unibean_metadata: string;
  order_delivery_amount: number;
  // batch:	Batch{...},
  // customer:	Customer{...},
  // dest_location:	DestinationLocation{...}
  order_details: any[];
  payment: any[];
  store_notes: any[];
  id: number;
  active: boolean;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
};

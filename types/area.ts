import { TLocation } from "./location";

export type TArea = {
  id: number;
  name: string;
  shippingFee: number;
  description: string;
  createdDate: Date;
  active: boolean;
  locations: TLocation[];
};

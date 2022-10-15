import { TArea } from "./area";

export type TSupplier = {
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
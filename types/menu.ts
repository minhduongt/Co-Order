import { TArea } from "./area";

export type TMenu = {
  id: number;
  name: string;
  dayFilter: string;
  hourFilter: string;
  type: string;
  displayOrder: number;
  updatedDate: Date;
  createdDate: Date;
  active: boolean;
  areaId: number;
  area: TArea;
};

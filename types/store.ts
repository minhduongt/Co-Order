import { TLocation } from "./location";
import { TTimeSlot } from "./timeslot";

export type TStore = {
  store_code: string;
  id: number;
  name: string;
  lat: string;
  lon: string;
  address: string;
  logo_url: string;
  manager_id: number;
  type: number;
  is_available: boolean;
  open_time: Date;
  close_time: Date;
  locations: TLocation[];
  time_slots: TTimeSlot[];
};

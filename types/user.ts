export type TUser = {
  name: string;
  imageUrl: string | null | undefined;
  phoneNumber: string;
  email: string;
};
export type TCustomer = {
  id: number;
  code: string;
  fullName: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date;
  imageUrl: string;
  createdDate: Date;
  updatedDate: Date;
  active: boolean;
};

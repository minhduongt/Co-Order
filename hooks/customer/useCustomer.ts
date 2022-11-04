import customerApi from "api/customer";

type Props = {
  shareLink: string;
  params?: any;
};
const useCustomer = () => {
  const getCustomerInfo = async (params: any) => {
    const res = await customerApi.getCustomer(params);
    return res;
  };

  return {
    getCustomerInfo,
  };
};
export default useCustomer;

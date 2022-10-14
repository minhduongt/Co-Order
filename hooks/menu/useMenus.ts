import MenuApi from "api/menu";
import { useQuery } from "react-query";

type Props = {
  params?: any;
};

const useMenus = ({ params }: Props = {}) => {
  const menus = useQuery(["menus", params], () => MenuApi.getMenus(params));

  return {
    ...menus,
    data: menus.data?.data,
    metadata: menus.data?.metadata,
  };
};

export default useMenus;

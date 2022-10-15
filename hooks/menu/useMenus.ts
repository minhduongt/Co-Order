import MenuApi from "api/menu";
import { useQuery } from "react-query";

type Props = {
  params?: any;
};

const useMenus = (areaId: number, { params }: Props = {}) => {
  const menus = useQuery(["menus", { "area-id": areaId }], () => MenuApi.getMenus({ "area-id": areaId }));

  return {
    ...menus,
    data: menus.data?.data,
    metadata: menus.data?.metadata,
  };
};

export default useMenus;

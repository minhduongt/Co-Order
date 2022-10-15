import MenuApi from "api/menu";
import { useQuery } from "react-query";

type Props = {
  params?: any;
};

const useMenus = (areaId: number, { params }: Props = {}) => {
  const menus = useQuery(["menus", { "area-id": areaId, "active": true }], () => MenuApi.getMenus({ "area-id": areaId, "active": true }));

  return {
    ...menus,
    data: menus.data?.data,
    metadata: menus.data?.metadata,
  };
};

export default useMenus;

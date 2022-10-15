import MenuApi from "api/menu";
import { useQuery } from "react-query";

type Props = {
  params?: any;
};

const useTimeSlots = (menuId: number, { params }: Props = {}) => {
  const timeslots = useQuery(["menus", menuId, params], () =>
    MenuApi.getTimeSlots(menuId)
  );

  return {
    ...timeslots,
    data: timeslots.data?.data,
    metadata: timeslots.data?.metadata,
  };
};

export default useTimeSlots;

export enum OrderStatusEnum {
    PENDING = "PENDING",
    WAITING = "WAITING",
    FINISHED = "FINISHED",
    CANCELED = "CANCELED",

};
export enum OrderTypeEnum {
    NORMAL = "NORMAL",
    PARTY = "PARTY",
}
export enum MenuDateFilterEnums {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
}

export enum MenuHourFilterEnums {
    BREAKFAST = "BREAKFAST",
    BRUNCH = "BRUNCH",
    LUNCH = "LUNCH",
    TEA = "TEA",
    DINNER = "DINNER",
}
export function getOrderStatus(status: String) {

    switch (status) {
        case OrderStatusEnum.WAITING.toString():
            return "Đang giao";
        case OrderStatusEnum.FINISHED.toString():
            return "Hoàn thành";
        case OrderStatusEnum.CANCELED.toString():
            return "Đã hủy";
        case OrderStatusEnum.PENDING.toString():
            return "Chờ xác nhận";
        default:
            return "Đang giao";
    }

}
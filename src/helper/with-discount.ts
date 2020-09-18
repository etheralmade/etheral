export const withDiscount = (price: number, percentage: number) =>
    (price * (100 - percentage)) / 100;

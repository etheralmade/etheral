export const formatPrice = (price: number | string) => {
    const value =
        typeof price === 'string'
            ? parseFloat(price.replace('IDR ', ''))
            : price;
    return new Intl.NumberFormat('id').format(value);
};

// We export those values as methods on a simple object to make them easy to extend and later translate
export default {
    orderLineGroupOptions(): { [key: string]: string } {
        return {
            _none: 'None',
            shipping: 'Shipping',
        };
    },
    orderLineTypeOptions(): { [key: string]: string } {
        return {
            product: 'Product',
            manual: 'Manual',
        };
    },
}

/**
 * @deprecated replaced with PriceLabel
 */
export default function (price: any) {
    // Keep price as-it if not a number, this allows passing vdom or hard-coded string
    if (price === parseInt(price)) {
        price = (price / Math.pow(10, app.forum.attribute('priceDecimals'))).toFixed(app.forum.attribute('priceDecimals'));
    }

    return [price, ' ' + app.forum.attribute('priceUnit')];
}

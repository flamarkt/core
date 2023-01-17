// The date format is hard-coded but exposed here, so it can be easily overridden with custom code
export default {
    // The default format to use
    defaultFormat(): string {
        return 'YYYY-MM-DD';
    },

    // The format used as part of titles to indicate which day an order is for
    orderDayFormat(): string {
        return this.defaultFormat();
    },

    // The format used in the list of payments to indicate which day a particular payment was made
    paymentDayFormat(): string {
        return this.defaultFormat();
    },
}

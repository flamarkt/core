export default function (options: { [key: string]: string }, value: string | undefined | null) {
    // If value is invalid, don't add it
    if (!value) {
        return options;
    }

    // If value is already a valid option, don't add it
    if (Object.keys(options).indexOf(value) !== -1) {
        return options;
    }

    // Add the value as an option
    return {
        ...options,
        [value]: value,
    };
}

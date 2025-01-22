export const toTitleCase = (str: string): string => {
    return str
        .toLowerCase()
        .split("_") // Split by underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" "); // Rejoin words with spaces
};
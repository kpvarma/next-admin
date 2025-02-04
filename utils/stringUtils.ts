import { underscore, pluralize as inflectPluralize } from "inflection";

/**
 * Converts camelCase, PascalCase, or snake_case to Title Case.
 * Example: "userDetail" -> "User Detail", "User_Detail" -> "User Detail"
 */
export const toTitleCase = (str: string): string => {
  return underscore(str) // Convert camelCase/PascalCase to snake_case
    .replace(/_/g, " ")  // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

/**
 * Converts camelCase, PascalCase, or snake_case to Pluralized Title Case.
 * Example: "userDetail" -> "User Details", "User_Detail" -> "User Details"
 */
export const toPluralTitleCase = (str: string): string => {
  return inflectPluralize(toTitleCase(str)); // Normalize first, then pluralize
};
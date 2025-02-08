// utils/chartUtils.ts

// Format X-Axis Date Values
export const formatXVal = (
  date_format: string | undefined, 
  value: string, 
  showYear?: boolean // parameter to force year display
): string => {
  if (!value) return "N/A";

  const parsedDate = new Date(value + "T00:00:00Z");
  if (isNaN(parsedDate.getTime())) return value;

  const day = parsedDate.toLocaleDateString("en-US", { day: "2-digit" });
  const month = parsedDate.toLocaleDateString("en-US", { month: "short" });
  const fullYear = parsedDate.getFullYear();
  const shortYear = fullYear.toString().slice(-2); // Short Year Format (24 for 2024)

  // If `showYear` is true, always include the full year
  if (showYear) {
    switch (date_format) {
      case "%b %d": return `${month} ${day}, ${fullYear}`;  // "Dec 01, 2024"
      case "%d %b": return `${day} ${month}, ${fullYear}`;  // "01 Dec, 2024"
      case "%b %d, %Y": return `${month} ${day}, ${fullYear}`; // "Dec 01, 2024"
      default: return `${day} ${month}, ${fullYear}`;  // Default: "01 Dec, 2024"
    }
  }

  // Default behavior (without year)
  switch (date_format) {
    case "%b %d": return `${month} ${day}`;  // "Dec 01"
    case "%d %b": return `${day} ${month}`;  // "01 Dec"
    case "%b %d, %Y": return `${month} ${day}, ${fullYear}`; // "Dec 01, 2024"
    default: return `${day} ${month}, ${shortYear}`;  // Default: "01 Dec, 24"
  }
};

// Format Y-Axis Values
export const formatYVal = (
  value_format: string | undefined, 
  decimal_places: number | undefined, 
  value: string | number | bigint
): string => {
  if (value === null || value === undefined) return "N/A";
  if (typeof value !== "number") return value.toString();

  const decimals = decimal_places !== undefined && decimal_places >= 0 ? decimal_places : 2;

  switch (value_format) {
    case "short":
      return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: decimals }).format(value);
    case "currency":
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: decimals }).format(value);
    case "percent":
      return `${value.toFixed(decimals)}%`;
    case "decimal":
      return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    default:
      return value.toString();
  }
};
// Defining the types for the Server
export interface CRUDifyServer {
  name: string | null;
  apiURL: string | null;
  apiKey: string | null;
  modelMetaData?: ModelMetaData[] | null; // Array to hold multiple model metadata
}

// Generic Error Response type
export interface ErrorResponse {
  data: any[] | null, 
  error: string
}

// Defining the types for the Model Menu
export interface ModelMenu {
    priority: string;
    label: string;
    parent: string;
}

// Defining the types for the Model Meta Data
export interface ModelMetaData {
    name: string;
    menu: ModelMenu;
    title: string;
    description: string;
    is_devise_model: boolean;
}
  
export interface ModelListData {
    data: any[] | null; // Array of records or null if there's an error
    currentPage: number; // Current page number
    perPage: number; // Number of items per page
    totalPages: number; // Total number of pages
    totalCount: number; // Total number of records
    error: string | null; // Error message or null
}

export interface TimeSeriesDataResponse {
    timeSeriesData: { date: string; created: number; updated: number }[];
    createdThisMonth: number;
    updatedThisMonth: number;
    createdThisWeek: number;
    updatedThisWeek: number;
    createdLastMonth: number;
    updatedLastMonth: number;
    createdLastWeek: number;
    updatedLastWeek: number;
}

// --------------
// Visualisations
// --------------
export interface DisplayPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}
  
export interface Highlight {
  title: string;
  caption?: string;
  value: string | number;
}

export interface Measure {
  label: string;
  hover?: string;
  value: string | number;
}

export interface Metric {
  name: string;
  visualisation: "single_metric" | "dual_metric" | "key_metric" | "timeseries";
  chart: "line" | "bar" | "area" | "pie" | "histogram" | "scatter" | "stackedbar";
  chart_config: {}
  title: string;
  caption: string;
  data: string | null;
  highlights: Highlight[];
  measures: Measure[];
}

export interface Collection {
  collection_type: string;
  title: string;
  caption: string;
  api_end_point: string;
  display: DisplayPosition;
  refresh_interval?: number;
  metrics: Metric[];
}

export interface WidgetData {
  name: string;
  title: string;
  description: string;
  visualisations: { [key: string]: Collection };
}

export interface ChartConfig {
  // Basic Chart Details
  title?: string; // Optional title for the chart
  caption?: string; // Optional subtitle or description

  // Chart Behavior & Display Settings
  legend?: boolean; // Show or hide the legend
  tooltip?: boolean; // Enable or disable tooltips
  grid?: boolean; // Show grid lines in the background
  animation?: boolean; // Enable animations
  responsive?: boolean; // Make the chart responsive

  // Data Formatting
  dateFormat?: string; // Format for displaying dates on X-axis (e.g., "MM/DD/YYYY")
  valueFormat?: "currency" | "percentage" | "number" | "custom"; // Format for Y-axis values
  decimalPlaces?: number; // Number of decimal places for values

  // Styling & Colors
  theme?: "light" | "dark"; // Chart theme
  colors?: string[]; // Custom colors for different data series
}
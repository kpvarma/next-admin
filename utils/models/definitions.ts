// -------
// Server
// -------

// Defining the types for the Server
export interface CRUDifyServer {
  name: string | null;
  apiURL: string | null;
  apiKey: string | null;
  metaData?: MetaData | null;
}

// ---------
// General
// ---------

// Generic Error Response type
export interface ErrorResponse {
  data: any[] | null, 
  error: string
}

// ---------
// Metadata
// ---------

export interface MetaData{
  nav_menu: NavMenu[],

  dashboards: Record<string, any>,
  summary_pages: Record<string, any>,
  index_pages: Record<string, any>,
  reports: Record<string, any>,
  
  models: ModelConfig[],
  visuals: Record<string, any>,
}

export interface ModelConfig {
  name: string;
  menu: ModelMenu;
  title: string;
  description: string;
  summary_page: string;
  is_devise_model: boolean;
  attributes: ModelAttribute[];
  associations: ModelAssociation[];
  columns: ModelColumn[];
  form_fields: { fields: any[] };  // Keeping as any[] for flexibility
  per_page: number[];
  scopes: { name: string; label: string; default: boolean }[];
  filters: any[];  // Keeping as any[] for flexibility
  api_end_points: string[];
  custom_member_actions: { action_name: string; method: string; logic: any }[];
  custom_collection_actions: { action_name: string; method: string; logic: any }[];
}

export interface VisualConfig {
  summary_title: string;
  summary_description: string;
  metrics: Metric[];
  collection_visualisations: Collection[];
  entity_visualisations: Collection[];
}

// Widget Config
// -------------

// Defines a widget structure
export interface Widget {
  name: string;
  model: string;
  collection: Collection;
  position: WidgetPosition;
  refresh_interval?: number;
}

// Defines the position of a widget
export interface WidgetPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Menu Config
// -----------

export interface NavMenu {
  type: string;       // Type of the menu item (e.g., "home", "page")
  name: string;       // Unique name identifier (e.g., "dashboard")
  label: string;      // Display label (e.g., "Dashboard")
  group: string | null;  // Optional grouping (nullable)
  parent: string | null; // Optional parent menu (nullable)
  priority: number;   // Priority level (higher = more important)
}

// Model Config
// ------------

export interface ModelAttribute {
  name: string;
  type: string;
  nullable: boolean;
  default: any;
}

export interface ModelAssociation {
  name: string;
  type: string;
  class_name: string;
  foreign_key: string;
  primary_key: string;
  optional: boolean;
  polymorphic?: string | null;
}

export interface ModelColumn {
  name: string;
  options: {
      label: string;
      type: string;
      include?: string;  // Optional include field for references
  };
  block: Record<string, any>; // Block logic can be any object
}

export interface ModelListData {
    data: any[] | null; // Array of records or null if there's an error
    currentPage: number; // Current page number
    perPage: number; // Number of items per page
    totalPages: number; // Total number of pages
    totalCount: number; // Total number of records
    error: string | null; // Error message or null
}

// Visual Config
// -------------

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
  title: string;
  caption: string;
  api_end_point: string;
  metrics: Metric[];
}

export interface WidgetData {
  name: string;
  page_type: string;
  title: string;
  description: string;
  widgets: Widget[] | [] | null;
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

// --------------
// Old
// --------------

export interface ModelMetaData {
  model: string;  // This corresponds to the model name (e.g., "Student")
  model_config: ModelConfig;  // Embedded model configuration
  visual_config?: VisualConfig; // Optional visual configuration
}

// Defining the types for the Model Menu
export interface ModelMenu {
  priority?: number;
  label: string;
  parent?: string | null;
}

export interface TimeSeriesDataResponse {
  data: { date: string; created: number; updated: number }[];
  createdThisMonth: number;
  updatedThisMonth: number;
  createdThisWeek: number;
  updatedThisWeek: number;
  createdLastMonth: number;
  updatedLastMonth: number;
  createdLastWeek: number;
  updatedLastWeek: number;
}

// Old structure
export interface DashboardWidget {
  name: string;
  model: string | null;
  collection: string | null;
  position: WidgetPosition | null;
}

// Defines the structure of each dashboard section
export interface DashboardConfig {
  title: string;
  description: string;
  widgets: DashboardWidget[];
}
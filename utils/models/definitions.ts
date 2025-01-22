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

// Defining the types for the Server
export interface CRUDifyServer {
    name: string | null;
    apiURL: string | null;
    apiKey: string | null;
    modelMetaData?: ModelMetaData[] | null; // Array to hold multiple model metadata
}
  
export interface ModelListData {
    data: any[] | null; // Array of records or null if there's an error
    currentPage: number; // Current page number
    perPage: number; // Number of items per page
    totalPages: number; // Total number of pages
    totalCount: number; // Total number of records
    error: string | null; // Error message or null
}
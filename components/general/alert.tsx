import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, CheckCircle, AlertTriangle } from "lucide-react";

interface AlertData {
  type?: "error" | "info" | "success" | null;
  heading?: string;
  description?: string;
}

// Function to determine alert styles based on type
const getAlertStyle = (type: string) => {
  switch (type) {
    case "error":
      return "border-red-500 bg-red-100 text-red-900";
    case "success":
      return "border-green-500 bg-green-100 text-green-900";
    case "info":
    default:
      return "border-blue-500 bg-blue-100 text-blue-900";
  }
};

// Function to determine which icon to show based on type
const getAlertIcon = (type: string) => {
  switch (type) {
    case "error":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "info":
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

// The CrudifyAlert component
const CrudifyAlert = ({ alertData }: { alertData?: AlertData }) => {
  // Ensure `alertData` is always defined with default values
  const { type, heading, description } = {
    type: alertData?.type || "info", // Default to "info"
    heading: alertData?.heading || "Notice",
    description: alertData?.description || "No additional details available.",
  };

  return (
    <Alert className={`border-l-4 ${getAlertStyle(type)} p-4 m-6`}>
      <div className="flex items-center space-x-2">
        {getAlertIcon(type)}
        <div>
          <AlertTitle>{heading}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default CrudifyAlert;
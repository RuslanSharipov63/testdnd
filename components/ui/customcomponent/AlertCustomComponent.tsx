import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { FC } from "react";

type AlertCustomComponentProps = {
  title: string;
  description: string;
};

const AlertCustomComponent: FC<AlertCustomComponentProps> = ({
  title,
  description,
}) => {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertCustomComponent;

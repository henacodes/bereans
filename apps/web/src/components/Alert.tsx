import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function AlertCard({
  title,
  description,
  variant,
}: {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}) {
  return (
    <Alert variant={variant || "default"}>
      <Terminal />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

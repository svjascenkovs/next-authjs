// Ja izvēlēts New-York style kad instalējām shadcn, tad iedodas "@radix-ui/react-icons"
// Ja izvēlamies defaulto style kad istalējām, tad iedodas "lucide-react"
// Mūsu gadījumā mēs izvēlējāmies New-York
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const FormError = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-w w-4" />
      <p>{message}</p>
    </div>
  );
};

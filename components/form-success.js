// Ja izvēlēts New-York style kad instalējām shadcn, tad iedodas "@radix-ui/react-icons"
// Ja izvēlamies defaulto style kad istalējām, tad iedodas "lucide-react"
// Mūsu gadījumā mēs izvēlējāmies New-York
import { CheckCircledIcon } from "@radix-ui/react-icons";

export const FormSuccess = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="h-w w-4" />
      <p>{message}</p>
    </div>
  );
};

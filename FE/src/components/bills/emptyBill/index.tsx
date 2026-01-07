import { Receipt } from "lucide-react";
import { Card } from "@/ui/card";

export type Props = {
  message: string
}
export const EmptyBill = ({ message } : Props) => {
  return (
    <Card className="p-12 text-center">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Receipt className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-gray-500">{ message }</p>
    </Card>
  );
};

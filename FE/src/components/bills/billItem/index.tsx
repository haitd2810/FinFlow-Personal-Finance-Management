import { FileText, Trash2 } from "lucide-react";
import { Card } from "@/ui/card";
import { useBillAction, useBillState } from "../BillContext";
import { useFormat } from "@/hooks/useFormat";
import { Bill } from "../type";
import { useActionState } from "react";

export type Props = {
  item: Bill;
};
export const BillItem = (props: Props) => {
  const { item } = props;
  const { selectedBill } = useBillState();
  const { setSelectedBill, deleteBill } = useBillAction();
  const { formatData } = useFormat();
  return (
    <Card
      key={item.id}
      className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
        selectedBill?.id === item.id ? "ring-2 ring-emerald-500" : ""
      }`}
      onClick={() => setSelectedBill(item)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-900">{item.fileName}</p>
            <p className="text-sm text-gray-500">
              {new Date(item.uploadDate).toLocaleDateString("vi-VN")} •{" "}
              {item.items.length} mục
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-emerald-600">{formatData({value: item.total})}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteBill(item.id);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};

import { FileText } from "lucide-react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { useBillState } from "../BillContext";
import { useFormat } from "@/hooks/useFormat";

export const BillDetail = () => {
  const { selectedBill } = useBillState();
  const { formatData } = useFormat();
  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-100 p-3 rounded-lg">
            <FileText className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-gray-900">{selectedBill?.fileName}</p>
            <p className="text-sm text-gray-500">
              {new Date(selectedBill?.uploadDate ?? "").toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <h3 className="text-gray-900">Các mục chi tiêu</h3>
        {selectedBill?.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
            <p className="text-gray-900">
              {formatData({ value: item.amount })}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-900">Tổng cộng</p>
          <p className="text-2xl text-emerald-600">
            {formatData({ value: selectedBill?.total ?? 0 })}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          Thêm Vào Hũ Chi Tiêu
        </Button>
        <Button variant="outline" className="w-full">
          Xuất Báo Cáo
        </Button>
      </div>
    </Card>
  );
};

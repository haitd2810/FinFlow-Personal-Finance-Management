import { Upload } from "lucide-react";
import { Card } from "@/ui/card";
import { useBillAction, useBillState } from "../BillContext";
import { useFormat } from "@/hooks/useFormat";
import { Bill, BillItem } from "../type";

export const BillUploadArea = () => {
  const { bills, isUploading, totalFromAllBills } = useBillState();
  const { setBills, setIsUploading, setSelectedBill } = useBillAction();

  const { formatData } = useFormat();
  // Simulate bill upload and OCR processing
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Simulate processing delay
    setTimeout(() => {
      // Mock extracted data from bill
      const mockItems: BillItem[] = [
        { id: "1", name: "Cơm gà", amount: 35000, category: "Ăn uống" },
        { id: "2", name: "Trà sữa", amount: 28000, category: "Ăn uống" },
        { id: "3", name: "Bánh mì", amount: 15000, category: "Ăn uống" },
      ];

      const total = mockItems.reduce((sum, item) => sum + item.amount, 0);

      const newBill: Bill = {
        id: Date.now().toString(),
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        items: mockItems,
        total,
      };

      setBills([...bills, newBill]);
      setIsUploading(false);
      setSelectedBill(newBill);

      // Save to localStorage
      const storedBills = [...bills, newBill];
      localStorage.setItem("finflow_bills", JSON.stringify(storedBills));
    }, 1500);
  };
  return (
    <Card className="p-8 mb-8">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-emerald-500 transition-colors">
        <input
          type="file"
          id="bill-upload"
          className="hidden"
          accept="image/*,.pdf"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <label htmlFor="bill-upload" className="cursor-pointer">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            {isUploading ? (
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-emerald-600" />
            )}
          </div>
          <p className="text-gray-900 mb-2">
            {isUploading ? "Đang xử lý..." : "Tải lên hóa đơn"}
          </p>
          <p className="text-sm text-gray-500">
            Hỗ trợ định dạng: JPG, PNG, PDF (tối đa 10MB)
          </p>
        </label>
      </div>

      {bills.length > 0 && (
        <div className="mt-6 bg-emerald-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            Tổng chi tiêu từ {bills.length} hóa đơn
          </p>
          <p className="text-2xl text-emerald-700">
            {formatData({value: totalFromAllBills})}
          </p>
        </div>
      )}
    </Card>
  );
};

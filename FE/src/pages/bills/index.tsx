import { Card } from "@/ui/card";
import { FileText } from "lucide-react";
import { BillUploadArea } from "@/components/bills/uploadArea";
import { BillList } from "@/components/bills/billList";
import { ReactElement } from "react";
import SidebarLayout from "../layouts/sidebar";
import { BillProvider } from "@/components/bills/BillContext";

export default function BillPage() {
  return (
    <BillProvider>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Upload & Quản Lý Bill</h1>
          <p className="text-gray-600">
            Tải lên hóa đơn và tự động phân tích chi tiêu
          </p>
        </div>

        {/* Upload Area */}
        <BillUploadArea />

        {/* Bills List */}
        <BillList />

        {/* Info Box */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <div className="flex gap-4">
            <div className="bg-blue-100 p-3 rounded-lg h-fit">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-blue-900 mb-2">Tính năng OCR thông minh</h3>
              <p className="text-sm text-blue-700">
                FinFlow VN sử dụng công nghệ OCR để tự động nhận diện và trích
                xuất thông tin từ hóa đơn của bạn. Hiện tại đang ở chế độ demo
                với dữ liệu mẫu. Để sử dụng tính năng OCR thực tế, vui lòng kết
                nối với dịch vụ backend.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </BillProvider>
  );
}

BillPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

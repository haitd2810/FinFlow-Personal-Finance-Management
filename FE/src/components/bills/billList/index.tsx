import { useBillState } from "../BillContext";
import { BillItem } from "../billItem";
import { EmptyBill } from "../emptyBill";
import { BillDetail } from "../billDetail";

export const BillList = () => {
  const { bills, selectedBill } = useBillState();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-gray-900 mb-4">Danh Sách Hóa Đơn</h2>
        {bills.length > 0 ? (
          <div className="space-y-3">
            {bills.map((bill) => (
              <BillItem item={bill} />
            ))}
          </div>
        ) : (
          <EmptyBill message="Chưa có hóa đơn nào"/>
        )}
      </div>

      {/* Bill Details */}
      <div>
        <h2 className="text-gray-900 mb-4">Chi Tiết Hóa Đơn</h2>
        {selectedBill ? (
          <BillDetail />
        ) : (
          <EmptyBill message="Chọn một hóa đơn để xem chi tiết"/>
        )}
      </div>
    </div>
  );
};

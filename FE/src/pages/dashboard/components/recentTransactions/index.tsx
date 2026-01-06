import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useFormat } from "../../../../hooks/useFormat";
export type Transaction = {
  id: string;
  type: string;
  amount: number;
  category: string;
  description: string;
  date: string;
};

export type Props = {
  item: Transaction
}
export const RecentTransaction = (props : Props) => {
  const { item } = props;
  const { formatData } = useFormat();
  return (
    <div
      key={item.id}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-2 rounded-lg ${
            item.type === "income" ? "bg-emerald-100" : "bg-red-100"
          }`}
        >
          {item.type === "income" ? (
            <ArrowUpCircle className="w-5 h-5 text-emerald-600" />
          ) : (
            <ArrowDownCircle className="w-5 h-5 text-red-600" />
          )}
        </div>
        <div>
          <p className="text-gray-900">{item.description}</p>
          <p className="text-sm text-gray-500">
            {item.category} • {new Date(item.date).toLocaleDateString("vi-VN")}
          </p>
        </div>
      </div>
      <p
        className={`${
          item.type === "income" ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {item.type === "income" ? "+" : "-"}
        {formatData({value: item.amount})}
      </p>
    </div>
  );
};

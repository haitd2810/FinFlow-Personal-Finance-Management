import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../../../ui/card";
import { useFormat } from "../../../hooks/useFormat";

export type monthIncome = {
   month: string, income: number, expense: number
}
export type Props = {
  dataChart: monthIncome[];
}
export const BarChartMonthly = (props : Props) => {
  const { dataChart } = props;
  const { formatData } = useFormat();
  return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataChart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value: string | number | undefined) =>
              formatData({value: Number(value)})
            }
          />
          <Legend />
          <Bar dataKey="income" name="Thu nhập" fill="#10b981" />
          <Bar dataKey="expense" name="Chi tiêu" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
  );
};

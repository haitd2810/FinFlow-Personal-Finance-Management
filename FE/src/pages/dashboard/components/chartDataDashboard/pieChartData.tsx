import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useFormat } from "../../../../hooks/useFormat";

export type Expense = {
  name: string;
  value: number;
};
export type Props = {
  dataExpenses: Expense[];
};
export const PieChartData = (props: Props) => {
  const { dataExpenses } = props;
  const { formatData } = useFormat();
  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={dataExpenses}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
          }
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {dataExpenses.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatData({ value: Number(value) })} />
      </PieChart>
    </ResponsiveContainer>
  );
};

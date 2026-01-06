import { ArrowDownCircle } from "lucide-react";
import { Card } from "../../../../ui/card";
import { ReactElement } from "react";
import { useFormat } from "../../../../hooks/useFormat";

export type Props = {
  totalCost: number;
  cardName: string;
  color: string;
  icon: ReactElement;
  unit?: string;
  type?: "currency" | "percent" | "decimal";
  minimumFractionDigits?: number;
};
export const CardDashboard = (props: Props) => {
  const {
    totalCost,
    cardName,
    color,
    icon,
    type = "currency",
    unit = "VND",
    minimumFractionDigits = 0,
  } = props;

  const { formatData } = useFormat();

  return (
    <Card className={`p-6 border-l-4 border-l-${color}-500`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{cardName}</p>
          <p className="text-2xl text-gray-900">
            {formatData({ value: totalCost})}
          </p>
        </div>
        <div className={`bg-${color}-100 p-3 rounded-lg`}>{icon}</div>
      </div>
    </Card>
  );
};

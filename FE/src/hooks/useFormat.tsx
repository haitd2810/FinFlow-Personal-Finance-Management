export type Props = {
  unit?: string;
  type?: "currency" | "percent" | "decimal";
  minimumFractionDigits?: number;
  value: number;
};

export const useFormat = () => {
  

  const formatData = (props : Props) => {
    const { type = "currency", unit = "VND", minimumFractionDigits = 0, value } = props;
    return new Intl.NumberFormat("vi-VN", {
      style: type,
      currency: unit,
      minimumFractionDigits: minimumFractionDigits,
    }).format(value);
  };

  return { formatData }
};

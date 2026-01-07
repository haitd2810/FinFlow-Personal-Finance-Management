import { ReactNode, useContext, useState, createContext } from "react";
import { Bill, BillActionType, BillStateType } from "./type";

const BillStateContext = createContext({} as BillStateType);
const BillActionContext = createContext({} as BillActionType);

export function BillProvider({ children }: { children: ReactNode }) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const deleteBill = (billId: string) => {
    const updatedBills = bills.filter((b) => b.id !== billId);
    setBills(updatedBills);
    localStorage.setItem("finflow_bills", JSON.stringify(updatedBills));
    if (selectedBill?.id === billId) {
      setSelectedBill(null);
    }
  };

  const totalFromAllBills = bills.reduce((sum, bill) => sum + bill.total, 0);
  return (
    <BillStateContext.Provider value = {{ bills, isUploading, selectedBill, totalFromAllBills}}>
      <BillActionContext.Provider value = {{ setBills, setIsUploading, setSelectedBill, deleteBill }}>
        { children }
      </BillActionContext.Provider>
    </BillStateContext.Provider>
  )
}
export const useBillState = () => {
  return useContext(BillStateContext);
};

export const useBillAction = () => {
  return useContext(BillActionContext);
}

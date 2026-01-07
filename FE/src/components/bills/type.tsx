export type BillItem = {
  id: string;
  name: string;
  amount: number;
  category: string;
};

export type Bill = {
  id: string;
  fileName: string;
  uploadDate: string;
  items: BillItem[];
  total: number;
}; 

export type BillStateType = {
  bills: Bill[],
  isUploading: boolean,
  selectedBill?: Bill | null,
  totalFromAllBills: number
};

export type BillActionType = {
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedBill: React.Dispatch<React.SetStateAction<Bill | null>>,
  deleteBill: (billId: string) => void
};
import React, { useState, useEffect, ReactElement } from "react";
import { Card } from "../../ui/card";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { CardDashboard } from "./components/dashboardComponents";
import { BarChartMonthly } from "./components/chartDataDashboard/barChartMonthly";
import { PieChartData } from "./components/chartDataDashboard/pieChartData";
import { RecentTransaction } from "./components/recentTransactions";
import SidebarLayout from "../layouts/sidebar";


export type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Load data from localStorage
    const storedTransactions = localStorage.getItem("finflow_transactions");
    if (storedTransactions) {
      const parsed = JSON.parse(storedTransactions);
      setTransactions(parsed);
      calculateTotals(parsed);
    } else {
      // Mock data for demo
      const mockData: Transaction[] = [
        {
          id: "1",
          type: "income",
          amount: 15000000,
          category: "Lương",
          description: "Lương tháng 12",
          date: "2025-12-01",
        },
        {
          id: "2",
          type: "expense",
          amount: 3000000,
          category: "Ăn uống",
          description: "Chi tiêu ăn uống",
          date: "2025-12-05",
        },
        {
          id: "3",
          type: "expense",
          amount: 5000000,
          category: "Nhà cửa",
          description: "Tiền thuê nhà",
          date: "2025-12-10",
        },
        {
          id: "4",
          type: "expense",
          amount: 1500000,
          category: "Giải trí",
          description: "Xem phim, cafe",
          date: "2025-12-15",
        },
        {
          id: "5",
          type: "income",
          amount: 2000000,
          category: "Phụ thu",
          description: "Làm thêm",
          date: "2025-12-20",
        },
        {
          id: "6",
          type: "expense",
          amount: 94000000,
          category: "Tiêu dùng",
          description: "Mua xe",
          date: "2025-12-15",
        },
      ];
      setTransactions(mockData);
      calculateTotals(mockData);
    }
  }, []);

  const calculateTotals = (txns: Transaction[]) => {
    const income = txns
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = txns
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    setTotalIncome(income);
    setTotalExpense(expense);
  };

  const balance = totalIncome - totalExpense;
  const savingsRate =
    totalIncome > 0 ? (balance / totalIncome).toFixed(5) : "0";

  // Prepare chart data
  const categoryExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(categoryExpenses).map(([name, value]) => ({
    name,
    value,
  }));

  const monthlyData = [
    { month: "T7", income: 14000000, expense: 8500000 },
    { month: "T8", income: 15000000, expense: 9000000 },
    { month: "T9", income: 14500000, expense: 8800000 },
    { month: "T10", income: 16000000, expense: 9200000 },
    { month: "T11", income: 15500000, expense: 9500000 },
    { month: "T12", income: totalIncome, expense: totalExpense },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard Thu Chi</h1>
        <p className="text-gray-600">Tổng quan tình hình tài chính của bạn</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CardDashboard
          cardName={"Tổng thu nhập"}
          totalCost={totalIncome}
          color="emerald"
          icon={<ArrowUpCircle className="w-6 h-6 text-emerald-600" />}
        />

        <CardDashboard
          cardName={"Tổng Chi Tiêu"}
          totalCost={totalExpense}
          color="red"
          icon={<ArrowDownCircle className="w-6 h-6 text-red-600" />}
        />

        <CardDashboard
          cardName={"Số Dư"}
          totalCost={balance}
          color="blue"
          icon={<Wallet className="w-6 h-6 text-blue-600" />}
        />

        <CardDashboard
          cardName={"Tỷ Lệ Tiết Kiệm"}
          totalCost={Number(savingsRate)}
          color="purple"
          icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
          type="percent"
          minimumFractionDigits={1}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Thu Chi Theo Tháng</h3>
          <BarChartMonthly dataChart={monthlyData} />
        </Card>

        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Chi Tiêu Theo Danh Mục</h3>
          <PieChartData dataExpenses={pieData}/>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Giao Dịch Gần Đây</h3>
        <div className="space-y-3">
          {transactions
            .slice(-5)
            .reverse()
            .map((txn) => (
              <RecentTransaction item={txn}/>
            ))}
        </div>
      </Card>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

"use client";

import { TransactionTable } from "@/components/transactions/TransactionTable";
import { useTransactions } from "@/hooks/transactions/useTransactions";

const SynopsisPage = () => {
  const { data: transactions } = useTransactions();
  return (
    <div className="h-full overflow-y-auto">
      {transactions && (
        <TransactionTable transactions={transactions} showAccount />
      )}
    </div>
  );
};

export default SynopsisPage;

"use client";

import { TransactionTable } from "@/components/transactions/TransactionTable";
import { useTransactions } from "@/hooks/transactions/useTransactions";

const SynopsisPage = () => {
  const { data: transactions } = useTransactions();
  return (
    <>
      {transactions && (
        <TransactionTable transactions={transactions} showAccount />
      )}
    </>
  );
};

export default SynopsisPage;

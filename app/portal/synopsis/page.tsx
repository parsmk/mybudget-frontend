"use client";

import { TransactionTable } from "@/components/TransactionTable";
import { useTransactions } from "@/hooks/transactions/useTransactions";

const SynopsisPage = () => {
  const { data: transactions, isLoading } = useTransactions();
  return (
    <>{transactions && <TransactionTable transactions={transactions} />}</>
  );
};

export default SynopsisPage;

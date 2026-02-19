"use client";

import { Transaction } from "@/api/transaction";
import { TransactionRow } from "./TransactionRow";
import { TransactionCell } from "./TransactionCell";
import { useState } from "react";
import { Button } from "../ui-kit/Button";
import { useDeleteTransactions } from "@/hooks/transactions/useDeleteTransactions";

export const TransactionTable = ({
  transactions,
  showAccount = false,
}: {
  transactions: Transaction[];
  showAccount?: boolean;
}) => {
  const { mutateAsync: deleteTransactions, isPending: deleting } =
    useDeleteTransactions();

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDelete = async () => {
    try {
      await deleteTransactions(Array.from(selected));
      setSelected(new Set());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <table className="w-full text-justify">
      <thead className="sticky border-b border-foreground/75 bg-primary/75 top-0">
        <tr>
          <TransactionCell isHeader>
            <input
              className="mx-auto w-full h-full"
              type="checkbox"
              checked={
                selected.size === transactions.length && transactions.length > 0
              }
              onChange={() => {
                if (selected.size === transactions.length)
                  return setSelected(new Set());
                else setSelected(new Set(transactions.map((t) => t.id)));
              }}
            />
          </TransactionCell>
          <TransactionCell isHeader>Date</TransactionCell>
          <TransactionCell isHeader>Payee</TransactionCell>
          <TransactionCell isHeader>Category</TransactionCell>
          <TransactionCell isHeader>Inflow</TransactionCell>
          <TransactionCell isHeader>Outflow</TransactionCell>
          {showAccount ? (
            <TransactionCell isHeader>Account</TransactionCell>
          ) : null}
          <th>
            {selected.size > 0 && (
              <div className="w-fit mx-auto">
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete()}
                  disabled={deleting}
                >
                  Delete
                </Button>
              </div>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions &&
          transactions.map((t) => (
            <TransactionRow
              selected={selected.has(t.id)}
              setSelected={(id) => toggle(id)}
              key={t.id}
              transaction={t}
              showAccount={showAccount}
            />
          ))}
      </tbody>
    </table>
  );
};

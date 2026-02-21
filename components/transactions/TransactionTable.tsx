"use client";

import { Transaction } from "@/api/transaction";
import { TransactionRow } from "./TransactionRow";
import { useMemo, useState } from "react";
import { Button } from "../ui-kit/Button";
import { useDeleteTransactions } from "@/hooks/transactions/useDeleteTransactions";
import { SortState, TransactionHeader } from "./TransactionHeader";

export const TRANSACTION_HEADINGS = [
  "Date",
  "Payee",
  "Category",
  "Inflow",
  "Outflow",
  "Account",
] as const;
export type TransactionHeadings = (typeof TRANSACTION_HEADINGS)[number];

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
  const [orderBy, setOrderBy] = useState<
    [h: TransactionHeadings, state: SortState]
  >(["Date", "desc"]);

  const orderedTransactions = useMemo(() => {
    const [heading, state] = orderBy;
    if (state === "none") return transactions;
    if (transactions.length < 2) return transactions;

    const dir = state === "asc" ? 1 : -1;

    const sorted = [...transactions].sort((a, b) => {
      switch (heading) {
        case "Date":
          return dir * a.date.localeCompare(b.date);
        case "Payee":
          return (
            dir *
            a.payee.localeCompare(b.payee, undefined, { sensitivity: "base" })
          );
        case "Category":
          return (
            dir *
            String(a.category ?? "").localeCompare(
              String(b.category ?? ""),
              undefined,
              { sensitivity: "base" },
            )
          );
        case "Inflow":
          return dir * (Number(a.inflow ?? 0) - Number(b.inflow ?? 0));
        case "Outflow":
          return dir * (Number(a.outflow ?? 0) - Number(b.outflow ?? 0));
        default:
          return 0;
      }
    });

    return sorted;
  }, [orderBy, transactions]);

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
      <thead className="sticky border-b border-foreground/75 bg-primary/95 top-0 z-10">
        <tr>
          <th>
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
          </th>
          {TRANSACTION_HEADINGS.map((h, i) => {
            const state = orderBy[0] === h ? orderBy[1] : "none";
            if (!showAccount && h === "Account") return;
            else
              return (
                <TransactionHeader
                  key={i}
                  isFilter
                  sortState={state}
                  setSortState={(s) => setOrderBy([h, s])}
                >
                  {h}
                </TransactionHeader>
              );
          })}
          <th className="px-2">
            {selected.size > 0 && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => handleDelete()}
                disabled={deleting}
                fullWidth
              >
                Delete
              </Button>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {orderedTransactions &&
          orderedTransactions.map((t) => (
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

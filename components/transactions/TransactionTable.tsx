"use client";

import { Transaction } from "@/api/transaction";
import { TransactionRow } from "./TransactionRow";

export const TransactionTable = ({
  transactions,
  showAccount = false,
}: {
  transactions: Transaction[];
  showAccount?: boolean;
}) => {
  return (
    <table className="divide-y w-full text-justify">
      <thead>
        <tr>
          <th className="p-2">Date</th>
          <th className="p-2">Payee</th>
          <th className="p-2">Category</th>
          <th className="p-2">Inflow</th>
          <th className="p-2">Outflow</th>
          {showAccount ? <th className="p-2">Account</th> : null}
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody>
        {transactions &&
          transactions.map((t) => (
            <TransactionRow
              key={t.id}
              transaction={t}
              showAccount={showAccount}
            />
          ))}
      </tbody>
    </table>
  );
};

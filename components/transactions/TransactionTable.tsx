"use client";

import { Transaction } from "@/api/transaction";
import { formatDollarString } from "@/utils/formatDollarString";

export const TransactionTable = ({
  transactions,
}: {
  transactions: Transaction[];
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
        </tr>
      </thead>
      <tbody>
        {transactions &&
          transactions.map((t) => (
            <tr
              className="odd:bg-primary/20 transition hover:bg-foreground/20"
              key={t.id}
            >
              <td className="p-2">{t.date}</td>
              <td className="p-2 border-x-1 border-foreground/50">{t.payee}</td>
              <td className="p-2 border-x-1 border-foreground/50">
                {t.category}
              </td>
              <td className="p-2 border-x-1 border-foreground/50">
                {formatDollarString(t.inflow)}
              </td>
              <td className="p-2">{formatDollarString(t.outflow)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

"use client";

import { FileIOModal } from "@/components/file-io/FileIOModal";
import { Button } from "@/components/ui-kit/Button";
import { useTransactions } from "@/hooks/transactions/useTransactions";
import { useRef, useState } from "react";

const DashboardPage = () => {
  const [filIOModal, setFileIOModal] = useState<boolean>(false);
  const { data: transactions, isLoading } = useTransactions();

  return (
    <div className="h-full">
      <FileIOModal open={filIOModal} close={() => setFileIOModal(false)} />
      <div>
        <Button type="button" onClick={() => setFileIOModal(true)}>
          Import Statement
        </Button>
      </div>
      <table className="divide-y w-full text-center">
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
                <td className="p-2 border-x-1">{t.payee}</td>
                <td className="p-2 border-x-1">{t.category}</td>
                <td className="p-2 border-x-1">
                  {Number(t.inflow) === 0 ? "" : t.inflow?.toFixed(2)}
                </td>
                <td className="p-2">
                  {Number(t.outflow) === 0 ? "" : t.outflow?.toFixed(2)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;

"use client";

import { FileIOModal } from "@/components/FileIOModal";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { BarChart } from "@/components/ui-kit/BarChart";
import { Button } from "@/components/ui-kit/Button";
import { InputField } from "@/components/ui-kit/InputField";
import { useAccount } from "@/hooks/accounts/useAccount";
import { useAccountAnalytics } from "@/hooks/accounts/useAccountAnalytics";
import { useAccountTransactions } from "@/hooks/transactions/useAccountTransactions";
import { use, useState } from "react";

const AccountPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [to, setTo] = useState<Date>(new Date());
  const [from, setFrom] = useState<Date>(
    () => new Date(new Date().getFullYear(), 0, 1),
  );

  const { id } = use(params);
  const { data: account } = useAccount(id);
  const { data: transactions } = useAccountTransactions(id, { from, to });
  const { data: analytics } = useAccountAnalytics(id);

  const chartData = analytics?.map((a) => ({
    ...a,
    fill: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
  }));

  return (
    <div className="flex flex-col h-full">
      {account && (
        <FileIOModal
          open={open}
          close={() => setOpen(false)}
          accountID={account.id}
        />
      )}
      <div className="px-2 py-5 flex">
        <div className="space-y-2">
          <Button type="button" onClick={() => setOpen(true)} fullWidth>
            Import Statement
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <InputField
                value={from.toISOString().slice(0, 10)}
                onChange={(e) => setFrom(new Date(e.currentTarget.value))}
                name="from"
                label="From"
                type="date"
              />
              <InputField
                value={to.toISOString().slice(0, 10)}
                onChange={(e) => setTo(new Date(e.currentTarget.value))}
                name="to"
                label="To"
                type="date"
              />
            </div>
          </div>
        </div>
        <div className="px-5">
          <h2 className="text-2xl font-bold">{account?.name}</h2>
          <h3 className="text-xl">${Number(account?.balance).toFixed(2)}</h3>
          <h3 className="text-xl">{account?.type}</h3>
        </div>
        <div className="px-5 flex grow items-center justify-center">
          {chartData && chartData?.length > 0 && (
            <BarChart
              data={chartData}
              labelFn={(dp) =>
                dp.category ? dp.category.name : "uncategorized"
              }
              shareFn={(dp) => dp.pct * 100}
              fillFn={(dp) => dp.fill}
              valueFn={(dp) => dp.amount}
            />
          )}
        </div>
      </div>
      <div className="grow min-h-0 overflow-y-auto">
        <TransactionTable transactions={transactions ?? []} />
      </div>
    </div>
  );
};

export default AccountPage;

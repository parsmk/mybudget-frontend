import { CategoryDropdown } from "../CategoryDropdown";
import { Transaction } from "@/api/transaction";
import React, { useMemo, useState } from "react";
import { Category } from "@/api/category";
import { InputField } from "../ui-kit/InputField";
import { Button } from "../ui-kit/Button";
import { useEditTransaction } from "@/hooks/transactions/useEditTransaction";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";
import { useAccount } from "@/hooks/accounts/useAccount";
import { TransactionCell } from "./TransactionCell";

export const TransactionRow = ({
  transaction,
  selected = false,
  setSelected,
  showAccount = false,
}: {
  transaction: Transaction;
  selected: boolean;
  setSelected: (id: string) => void;
  showAccount?: boolean;
}) => {
  const { data: account } = useAccount(transaction.accountID);
  const { mutateAsync: editTransaction, isPending: editing } =
    useEditTransaction();
  const { mutate: deleteTransaction } = useDeleteTransaction();

  const [cat, setCat] = useState<Category | undefined>(transaction.category);
  const [date, setDate] = useState<string>(transaction.date.slice(0, 10));
  const [payee, setPayee] = useState<string>(transaction.payee);
  const [inflow, setInflow] = useState<number | undefined>(
    Number(transaction.inflow),
  );
  const [outflow, setOutflow] = useState<number | undefined>(
    Number(transaction.outflow),
  );

  const hasChanged = useMemo(() => {
    if (cat && cat !== transaction.category) return true;
    if (date !== transaction.date.slice(0, 10)) return true;
    if (payee !== transaction.payee) return true;
    if (String(inflow) !== transaction.inflow) return true;
    if (String(outflow) !== transaction.outflow) return true;

    return false;
  }, [cat, date, payee, inflow, outflow]);

  const handleSubmit = async () => {
    try {
      const updated = await editTransaction({
        patch: {
          id: transaction.id,
          categoryID: cat?.id,
          date: date,
          payee: payee,
          inflow: inflow,
          outflow: outflow,
        },
        oldAccountID: transaction.accountID,
      });

      setCat(updated.category ?? cat);
      setDate(updated.date.slice(0, 10));
      setPayee(updated.payee);
      setInflow(Number(updated.inflow ?? 0));
      setOutflow(Number(updated.outflow ?? 0));
    } catch (err) {}
  };

  return (
    <tr className="even:bg-primary/20 transition hover:bg-foreground/20 divide-x divide-foreground/75">
      <TransactionCell>
        <input
          className="mx-auto w-full h-full"
          type="checkbox"
          checked={selected}
          onChange={() => setSelected(transaction.id)}
        />
      </TransactionCell>
      <TransactionCell>
        <InputField
          type="date"
          name="date"
          value={date}
          variant="grid"
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </TransactionCell>
      <TransactionCell>
        <InputField
          type="text"
          name="payee"
          value={payee}
          variant="grid"
          onChange={(e) => setPayee(e.currentTarget.value)}
        />
      </TransactionCell>
      <TransactionCell>
        <CategoryDropdown setValue={setCat} value={cat} />
      </TransactionCell>
      <TransactionCell>
        <InputField
          type="number"
          name="inflow"
          value={inflow != null ? Number(inflow).toFixed(2) : 0}
          placeholder=""
          variant="grid"
          onChange={(e) => setInflow(Number(e.currentTarget.value))}
          onBlur={(e) => {
            const val = e.currentTarget.value;
            if (!val) return;
            e.currentTarget.value = Number(val).toFixed(2);
          }}
        />
      </TransactionCell>
      <TransactionCell>
        <InputField
          type="number"
          name="outflow"
          placeholder=""
          value={outflow != null ? Number(outflow).toFixed(2) : 0}
          variant="grid"
          onChange={(e) => setOutflow(Number(e.currentTarget.value))}
          onBlur={(e) => {
            const val = e.currentTarget.value;
            if (!val) return;
            e.currentTarget.value = Number(val).toFixed(2);
          }}
        />
      </TransactionCell>
      {showAccount ? <TransactionCell>{account?.name}</TransactionCell> : null}
      <TransactionCell>
        <div className="h-full w-full flex items-center justify-center gap-2">
          <Button
            type="button"
            size="sm"
            disabled={!hasChanged || editing}
            onClick={async () => await handleSubmit()}
          >
            Save
          </Button>
          <Button
            type="button"
            size="sm"
            variant="danger"
            onClick={() => deleteTransaction(transaction.id)}
          >
            Delete
          </Button>
        </div>
      </TransactionCell>
    </tr>
  );
};

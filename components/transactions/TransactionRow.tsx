import { useEffect, useMemo, useState } from "react";

import { Transaction } from "@/api/transaction";
import { Category } from "@/api/category";

import { useEditTransaction } from "@/hooks/transactions/useEditTransaction";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";
import { useAccount } from "@/hooks/accounts/useAccount";

import { InputField } from "../ui-kit/InputField";
import { Button } from "../ui-kit/Button";
import { CurrencyField } from "../ui-kit/CurrencyField";

import { CategoryDropdown } from "../CategoryDropdown";
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
  const { data: account } = useAccount(transaction.account_id);
  const { mutateAsync: editTransaction, isPending: editing } =
    useEditTransaction();
  const { mutate: deleteTransaction } = useDeleteTransaction();

  const [cat, setCat] = useState<Category | null>(transaction.category ?? null);
  const [date, setDate] = useState<string>(transaction.date);
  const [payee, setPayee] = useState<string>(transaction.payee);
  const [inflow, setInflow] = useState<number | undefined>(transaction.inflow);
  const [outflow, setOutflow] = useState<number | undefined>(
    transaction.outflow,
  );

  useEffect(() => {
    setCat(transaction.category ?? null);
    setDate(transaction.date);
    setPayee(transaction.payee);
    setInflow(transaction.inflow);
    setOutflow(transaction.outflow);
  }, [transaction]);

  const hasChanged = useMemo(() => {
    if (cat?.id !== transaction.category?.id) return true;
    if (date !== transaction.date) return true;
    if (payee !== transaction.payee) return true;
    if (inflow !== transaction.inflow) return true;
    if (outflow !== transaction.outflow) return true;

    return false;
  }, [cat, date, payee, inflow, outflow, transaction]);

  const handleSubmit = async () => {
    try {
      const patch = {
        id: transaction.id,
        categoryID:
          cat?.id === transaction.category?.id ? undefined : (cat?.id ?? null),
        date: date === transaction.date ? undefined : date,
        payee: payee === transaction.payee ? undefined : payee,
        inflow: inflow === transaction.inflow ? undefined : inflow,
        outflow: outflow === transaction.outflow ? undefined : outflow,
      };

      const cleanedPatch = Object.fromEntries(
        Object.entries(patch).filter(([, v]) => v !== undefined),
      ) as typeof patch;

      const updated = await editTransaction({
        patch: cleanedPatch,
        oldAccountID: transaction.account_id,
      });

      setCat(updated.category ?? null);
      setDate(updated.date);
      setPayee(updated.payee);
      setInflow(updated.inflow);
      setOutflow(updated.outflow);
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
        <CurrencyField
          name="inflow"
          value={inflow}
          variant="grid"
          setValue={setInflow}
        />
      </TransactionCell>
      <TransactionCell>
        <CurrencyField
          name="outflow"
          value={outflow}
          variant="grid"
          setValue={setOutflow}
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
            fullWidth
          >
            Save
          </Button>
          <Button
            type="button"
            size="sm"
            variant="danger"
            onClick={() => deleteTransaction(transaction.id)}
            fullWidth
          >
            Delete
          </Button>
        </div>
      </TransactionCell>
    </tr>
  );
};

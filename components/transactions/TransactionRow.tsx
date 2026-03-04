import { useState } from "react";

import { Transaction } from "@/api/transaction";

import { useEditTransaction } from "@/hooks/transactions/useEditTransaction";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";
import { useAccount } from "@/hooks/accounts/useAccount";

import { InputField } from "../ui-kit/InputField";
import { Button } from "../ui-kit/Button";
import { CurrencyField } from "../ui-kit/CurrencyField";

import { CategoryDropdown } from "../category/CategoryDropdown";
import { TransactionCell } from "./TransactionCell";

type TransactionRowProps = {
  transaction: Transaction;
  selected: boolean;
  setSelected: (id: string) => void;
  showAccount?: boolean;
};

export const TransactionRow = ({
  transaction,
  selected = false,
  setSelected,
  showAccount = false,
}: TransactionRowProps) => {
  const { data: account } = useAccount(transaction.account_id);
  const { mutateAsync: editTransaction, isPending: editing } =
    useEditTransaction();
  const { mutate: deleteTransaction } = useDeleteTransaction();

  const [edits, setEdits] = useState<Partial<Transaction>>({});
  const hasChanged = Object.keys(edits).length > 0;

  const get = <K extends keyof Transaction>(key: K) =>
    edits[key] ?? transaction[key];
  const set = <K extends keyof Transaction>(
    key: K,
    value: (typeof transaction)[K],
  ) => setEdits((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    try {
      await editTransaction({
        ...edits,
        id: transaction.id,
        category_id: edits["category"]?.id,
      });
      setEdits({});
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
          value={get("date")}
          variant="grid"
          onChange={(e) => set("date", e.currentTarget.value)}
        />
      </TransactionCell>
      <TransactionCell>
        <InputField
          type="text"
          name="payee"
          value={get("payee")}
          variant="grid"
          onChange={(e) => set("payee", e.currentTarget.value)}
        />
      </TransactionCell>
      <TransactionCell>
        <CategoryDropdown
          setValue={(cat) => set("category", cat ?? undefined)}
          value={get("category") ?? null}
        />
      </TransactionCell>
      <TransactionCell>
        <CurrencyField
          name="inflow"
          value={get("inflow")}
          variant="grid"
          setValue={(val) => set("inflow", val)}
        />
      </TransactionCell>
      <TransactionCell>
        <CurrencyField
          name="outflow"
          value={get("outflow")}
          variant="grid"
          setValue={(val) => set("outflow", val)}
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

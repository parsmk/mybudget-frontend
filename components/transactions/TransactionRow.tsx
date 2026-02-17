import { CategoryDropdown } from "../CategoryDropdown";
import { Transaction } from "@/api/transaction";
import { useMemo, useState } from "react";
import { Category } from "@/api/category";
import { InputField } from "../ui-kit/InputField";
import { Button } from "../ui-kit/Button";
import { useEditTransaction } from "@/hooks/transactions/useEditTransaction";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";
import { useAccount } from "@/hooks/accounts/useAccount";

export const TransactionRow = ({
  transaction,
  showAccount = false,
}: {
  transaction: Transaction;
  showAccount?: boolean;
}) => {
  const { data: account } = useAccount(transaction.accountID);
  const { mutateAsync: editTransaction, isPending: editing } =
    useEditTransaction();
  const { mutate: deleteTransaction } = useDeleteTransaction();

  const [cat, setCat] = useState<Category | undefined>(transaction.category);
  const [date, setDate] = useState<string>(transaction.date);
  const [payee, setPayee] = useState<string>(transaction.payee);
  const [inflow, setInflow] = useState<number | undefined>(transaction.inflow);
  const [outflow, setOutflow] = useState<number | undefined>(
    transaction.outflow,
  );

  const hasChanged = useMemo(() => {
    console.log(transaction.category);
    console.log(cat);
    if (cat && cat !== transaction.category) return true;
    if (date !== transaction.date) return true;
    if (payee !== transaction.payee) return true;
    if (inflow !== transaction.inflow) return true;
    if (outflow !== transaction.outflow) return true;

    return false;
  }, [cat, date, payee, inflow, outflow]);

  const handleSubmit = async () => {
    try {
      await editTransaction({
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
    } catch (err) {}
  };

  return (
    <tr className="odd:bg-primary/20 transition hover:bg-foreground/20">
      <td className="p-2">
        <InputField
          type="date"
          name="date"
          value={date}
          variant="grid"
          onChange={(e) => setDate(e.currentTarget.value)}
          onBlur={() => setDate(transaction.date)}
        />
      </td>
      <td className="p-2 border-x-1 border-foreground/50">
        <InputField
          type="text"
          name="payee"
          value={payee}
          variant="grid"
          onChange={(e) => setPayee(e.currentTarget.value)}
          onBlur={() => setPayee(transaction.payee)}
        />
      </td>
      <td className="p-2 border-x-1 border-foreground/50">
        <CategoryDropdown setValue={setCat} value={cat} />
      </td>
      <td className="p-2 border-x-1 border-foreground/50">
        <InputField
          type="number"
          name="inflow"
          value={inflow ? Number(inflow).toFixed(2) : 0}
          placeholder=""
          variant="grid"
          onChange={(e) => setInflow(Number(e.currentTarget.value))}
          onBlur={(e) => {
            const val = e.currentTarget.value;
            if (!val) return;
            e.currentTarget.value = Number(val).toFixed(2);
          }}
        />
      </td>
      <td className="p-2">
        <InputField
          type="number"
          name="outflow"
          placeholder=""
          value={outflow ? Number(outflow).toFixed(2) : 0}
          variant="grid"
          onChange={(e) => setOutflow(Number(e.currentTarget.value))}
          onBlur={(e) => {
            const val = e.currentTarget.value;
            if (!val) return;
            e.currentTarget.value = Number(val).toFixed(2);
          }}
        />
      </td>
      {showAccount ? <td>{account?.name}</td> : null}
      <td className="p-2">
        <div className="h-full w-full flex items-center justify-end gap-2">
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
      </td>
    </tr>
  );
};

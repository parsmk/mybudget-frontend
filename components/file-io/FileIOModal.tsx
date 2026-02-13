import { useRef, useState } from "react";
import { Modal } from "../ui-kit/Modal";
import { Button } from "../ui-kit/Button";
import * as XLSX from "xlsx";
import { CreateTransactionRequest } from "@/api/account";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransactions";

type FileIOModalProps = {
  open: boolean;
  close: () => void;
};

export const FileIOModal = ({ open, close }: FileIOModalProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [sheetData, setSheetData] = useState<string[][]>([]);
  const [firstDataRow, setFirstDataRow] = useState<number>(-1);
  const [colMeanings, setColMeanings] = useState<Record<string, number>>({});
  const [errs, setErrs] = useState<string[]>([]);
  const { mutateAsync: createTransactions, isPending } = useCreateTransaction();

  const readDataSheet = async (file: File) => {
    const parsed = XLSX.read(await file.arrayBuffer());
    const sheet = parsed.Sheets[parsed.SheetNames[0]];
    setSheetData(
      XLSX.utils.sheet_to_json(sheet, { raw: false, header: 1, defval: " " }),
    );
  };

  const prepareAndPostData = async () => {
    setErrs([]);
    if (firstDataRow < 0 || Object.keys(colMeanings).length < 1) {
      console.log(firstDataRow);
      console.log(colMeanings);
      setErrs((prev) => [
        ...prev,
        "Must set first data row and annotate columns!",
      ]);
      return;
    }

    const transactions: CreateTransactionRequest[] = [];
    for (let i = firstDataRow; i < sheetData.length; i++) {
      const row = sheetData[i];
      transactions.push({
        date: row[colMeanings["date"]],
        payee: row[colMeanings["payee"]],
        inflow: Number(row[colMeanings["inflow"]]),
        outflow: Number(row[colMeanings["outflow"]]),
      });
    }

    try {
      await createTransactions(transactions);
    } catch (error) {
      setErrs((prev) => [...prev, error as string]);
    }
  };

  return (
    <Modal
      close={() => {
        close();
        setSheetData([]);
      }}
      open={open}
    >
      {sheetData.length > 0 ? (
        <>
          <p>Select the first row of data with the checkbox!</p>
          <div className="overflow-x-auto rounded-md border my-2">
            <table className="divide-y ">
              <tbody className="divide-y divide-foreground">
                {sheetData.slice(0, 5).map((row, rowNum) => (
                  <tr key={rowNum} className="divide-x">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={firstDataRow === rowNum}
                        onChange={() => setFirstDataRow(rowNum)}
                      />
                    </td>
                    {row.map((cell, cellKey) => (
                      <td className="p-2" key={cellKey}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot className="divide-y divide-foreground">
                <tr className="divide-x">
                  <td></td>
                  {sheetData.length > 0 &&
                    sheetData.at(sheetData.length - 1)?.map((_, i) => (
                      <td key={i}>
                        <select
                          className="w-full"
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            if (!value) return;
                            setColMeanings((prev) => ({
                              ...prev,
                              [value]: i,
                            }));
                          }}
                        >
                          <option>--select--</option>
                          <option>date</option>
                          <option>payee</option>
                          <option>inflow</option>
                          <option>outflow</option>
                          <option>balance</option>
                        </select>
                      </td>
                    ))}
                </tr>
              </tfoot>
            </table>
          </div>
          <p>Use these dropdowns to select what each column represents</p>{" "}
          <div className="flex items-center mt-3">
            <div className="grow">
              {errs.map((err, i) => (
                <p className="text-danger" key={i}>
                  {err}
                </p>
              ))}
            </div>
            <div>
              <Button
                type="button"
                variant="primary"
                onClick={() => prepareAndPostData()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <Button type="button" onClick={() => inputRef.current?.click()}>
            Upload files
          </Button>
          <input
            type="file"
            hidden
            ref={inputRef}
            onChange={(e) => {
              const input = e.currentTarget.files?.item(0);
              if (!input) return;
              readDataSheet(input);
              e.currentTarget.value = "";
            }}
          />
        </>
      )}
    </Modal>
  );
};

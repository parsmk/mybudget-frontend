import { useRef, useState } from "react";
import { Modal } from "./ui-kit/Modal";
import { Button } from "./ui-kit/Button";
import * as XLSX from "xlsx";
import { CreateTransactionRequest } from "@/api/transaction";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransactions";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/_route-map";

type FileIOModalProps = {
  open: boolean;
  close: () => void;
  accountID: string;
};

export const FileIOModal = ({ open, close, accountID }: FileIOModalProps) => {
  const router = useRouter();

  const { mutateAsync: createTransactions } = useCreateTransaction();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [sheetData, setSheetData] = useState<string[][]>([]);
  const [firstDataRow, setFirstDataRow] = useState<number>(-1);
  const [colAnnotations, setColAnnotations] = useState<Record<string, number>>(
    {},
  );

  const [errs, setErrs] = useState<string[]>([]);

  const readDataSheet = async (file: File) => {
    const parsed = XLSX.read(await file.arrayBuffer());
    const sheet = parsed.Sheets[parsed.SheetNames[0]];
    setSheetData(
      XLSX.utils.sheet_to_json(sheet, { raw: false, header: 1, defval: " " }),
    );
  };

  const prepareAndPostData = async () => {
    setErrs([]);
    if (firstDataRow < 0 || Object.keys(colAnnotations).length < 1) {
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
        date: new Date(row[colAnnotations["date"]]).toDateString(),
        payee: row[colAnnotations["payee"]],
        inflow: Number(row[colAnnotations["inflow"]]),
        outflow: Number(row[colAnnotations["outflow"]]),
        accountID: accountID,
      });
    }

    try {
      await createTransactions(transactions);
      router.push(ROUTES.PORTAL.ACCOUNT(accountID));
      close();
    } catch (error) {
      setErrs((prev) => [...prev, String(error)]);
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
                            setColAnnotations((prev) => ({
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
            <div className="grow flex flex-wrap mx-2">
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

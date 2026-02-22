import { useRef, useState } from "react";
import { Modal } from "./ui-kit/Modal";
import { Button } from "./ui-kit/Button";
import * as XLSX from "xlsx";
import { CreateTransactionRequest } from "@/api/transaction";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransactions";
import { Dropdown } from "./ui-kit/Dropdown";
import { DATE_FORMATS, DateFormat, parseToISODate } from "@/utils/dateParser";
import { useErrorHandler } from "@/hooks/useErrorState";

type FileIOModalProps = {
  open: boolean;
  close: () => void;
  accountID: string;
};

export const FileIOModal = ({ open, close, accountID }: FileIOModalProps) => {
  const { mutateAsync: createTransactions } = useCreateTransaction();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [sheetData, setSheetData] = useState<string[][]>([]);
  const [firstDataRow, setFirstDataRow] = useState<number>(-1);
  const [dateFormat, setDateFormat] = useState<DateFormat>("YYYY-MM-DD");
  const [colAnnotations, setColAnnotations] = useState<Record<number, string>>(
    {},
  );

  const { fieldErrors, formErrors, handler } = useErrorHandler();

  const readDataSheet = async (file: File) => {
    const parsed = XLSX.read(await file.arrayBuffer());
    const sheet = parsed.Sheets[parsed.SheetNames[0]];
    setSheetData(
      XLSX.utils.sheet_to_json(sheet, { raw: false, header: 1, defval: " " }),
    );
  };

  const prepareAndPostData = async () => {
    handler.clear();
    if (firstDataRow < 0 || Object.keys(colAnnotations).length < 1) {
      handler.addError("Must set first data row and annotate columns!");
      return;
    }

    const annotations: Record<string, number> = {};
    for (const [col, annotation] of Object.entries(colAnnotations)) {
      annotations[annotation] = Number(col);
    }

    const transactions: CreateTransactionRequest[] = [];
    for (let i = firstDataRow; i < sheetData.length; i++) {
      const row = sheetData[i];
      transactions.push({
        date: parseToISODate(row[annotations["date"]], dateFormat),
        payee: row[annotations["payee"]],
        inflow: Number(row[annotations["inflow"]]),
        outflow: Number(row[annotations["outflow"]]),
        account_id: accountID,
      });
    }

    try {
      await createTransactions({ data: transactions, accountID });
      close();
    } catch (error) {
      handler.handle(error);
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
                        <Dropdown
                          options={["date", "payee", "inflow", "outflow"]}
                          defaultOption="--select--"
                          value={colAnnotations[i]}
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            if (!value) return;
                            setColAnnotations((prev) => ({
                              ...prev,
                              [i]: value,
                            }));
                          }}
                        />
                      </td>
                    ))}
                </tr>
              </tfoot>
            </table>
          </div>
          <p>Use these dropdowns to select what each column represents</p>
          <div className="flex gap-x-2 my-2">
            <span>Date Format: </span>
            <div className="grow">
              <Dropdown
                variant="default"
                value={dateFormat}
                options={DATE_FORMATS.map((d) => d)}
                onChange={(e) =>
                  setDateFormat(e.currentTarget.value as DateFormat)
                }
              />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <div className="grow flex flex-wrap mx-2">
              {formErrors.map((err, i) => (
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

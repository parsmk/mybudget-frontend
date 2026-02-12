import { useRef, useState } from "react";
import { Modal } from "../ui-kit/Modal";
import { Button } from "../ui-kit/Button";
import * as XLSX from "xlsx";

type FileIOModalProps = {
  visible: boolean;
  setInvisible: () => void;
};

export const FileIOModal = ({ visible, setInvisible }: FileIOModalProps) => {
  const [sheetData, setSheetData] = useState<string[][]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const readDataSheet = async (file: File) => {
    const parsed = XLSX.read(await file.arrayBuffer());
    const sheet = parsed.Sheets[parsed.SheetNames[0]];
    setSheetData(XLSX.utils.sheet_to_json(sheet, { header: 1 }));
  };
  return (
    <>
      <Modal close={() => setInvisible()} open={visible}>
        {sheetData.length > 0 ? (
          <>
            <p>Select the first row of data with the checkbox!</p>
            <table className="border rounded-sm p-2">
              <tbody className="divide-y divide-foreground">
                {sheetData.slice(0, 5).map((row, rowKey) => (
                  <tr key={rowKey} className="divide-x">
                    <td className="p-2">
                      <input type="checkbox" />
                    </td>
                    {row.map((cell, cellKey) => (
                      <td className="p-2" key={cellKey}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="divide-x">
                  <td></td>
                  {sheetData.length > 0 &&
                    sheetData.at(sheetData.length - 1)?.map((_, i) => (
                      <td key={i}>
                        <select className="w-full">
                          <option>This</option>
                          <option>That</option>
                          <option>The Other</option>
                        </select>
                      </td>
                    ))}
                </tr>
              </tbody>
            </table>
            <p>
              Use these dropdowns to select what each column represents
            </p>{" "}
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
    </>
  );
};

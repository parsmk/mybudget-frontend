import React from "react";
import { DownChevron, RightChevron, UpChevron } from "../svgs/Chevrons";

export type SortState = "none" | "asc" | "desc";

export const TransactionHeader = ({
  children,
  isFilter = true,
  sortState = "none",
  setSortState,
}: {
  children?: React.ReactNode;
  isFilter?: boolean;
  sortState?: SortState;
  setSortState?: (s: SortState) => void;
}) => {
  let chevron: React.ReactNode = null;
  const chevronClasses = "size-5 self-center";

  if (sortState === "none")
    chevron = <RightChevron className={chevronClasses} />;
  else if (sortState === "asc")
    chevron = <UpChevron className={chevronClasses} />;
  else if (sortState === "desc")
    chevron = <DownChevron className={chevronClasses} />;

  const changeFilter = () => {
    if (sortState === "none") setSortState?.("desc");
    else if (sortState === "desc") setSortState?.("asc");
    else if (sortState === "asc") setSortState?.("desc");
  };

  return (
    <th
      className={`p-2 ${isFilter ? "cursor-pointer" : ""}`}
      onClick={() => changeFilter()}
    >
      <div className="w-full h-full flex">
        <div className="grow">{children}</div>
        {isFilter ? chevron : null}
      </div>
    </th>
  );
};

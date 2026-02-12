"use client";

import { FileIOModal } from "@/components/file-io/FileIOModal";
import { Button } from "@/components/ui-kit/Button";
import { useRef, useState } from "react";

const DashboardPage = () => {
  const [isFileIOModalActive, activateFileIOModal] = useState<boolean>(false);

  return (
    <div className="flex h-full items-center justify-center">
      <FileIOModal
        visible={isFileIOModalActive}
        setInvisible={() => activateFileIOModal(false)}
      />
      <Button type="button" onClick={() => activateFileIOModal(true)}>
        Import Statement
      </Button>
    </div>
  );
};

export default DashboardPage;

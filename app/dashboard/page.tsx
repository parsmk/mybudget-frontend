"use client";

import { FileIOModal } from "@/components/file-io/FileIOModal";
import { Button } from "@/components/ui-kit/Button";
import { useRef, useState } from "react";

const DashboardPage = () => {
  const [filIOModal, setFileIOModal] = useState<boolean>(false);

  return (
    <div className="flex h-full items-center justify-center">
      <FileIOModal open={filIOModal} close={() => setFileIOModal(false)} />
      <Button type="button" onClick={() => setFileIOModal(true)}>
        Import Statement
      </Button>
    </div>
  );
};

export default DashboardPage;

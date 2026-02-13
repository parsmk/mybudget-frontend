"use client";

import { FileIOModal } from "@/components/file-io/FileIOModal";
import { Button } from "@/components/ui-kit/Button";
import { useState } from "react";

const PortalLandingPage = () => {
  const [filIOModal, setFileIOModal] = useState<boolean>(false);

  return (
    <div className="h-full">
      <FileIOModal open={filIOModal} close={() => setFileIOModal(false)} />
      <div>
        <Button type="button" onClick={() => setFileIOModal(true)}>
          Import Statement
        </Button>
      </div>
    </div>
  );
};

export default PortalLandingPage;

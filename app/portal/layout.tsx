import { Navbar } from "@/components/navigation/Navbar";

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <main className="h-full grow overflow-y-auto">{children}</main>
    </div>
  );
};

export default PortalLayout;

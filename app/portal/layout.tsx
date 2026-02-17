import { Navbar } from "@/components/navigation/Navbar";

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen">
      <Navbar />
      <main className="h-full grow">{children}</main>
    </div>
  );
};

export default PortalLayout;

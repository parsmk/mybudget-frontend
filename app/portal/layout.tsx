import { Navbar } from "@/components/navigation/Navbar";

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid sm:grid-cols-[auto_1fr] grid-cols-1 sm:h-screen">
      <Navbar />
      <main className="h-full min-h-0">{children}</main>
    </div>
  );
};

export default PortalLayout;

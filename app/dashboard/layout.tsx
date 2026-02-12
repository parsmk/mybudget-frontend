import { Navbar } from "@/components/navigation/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <main className="h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;

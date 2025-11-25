import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/features/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "5rem",
        } as React.CSSProperties
      }
    >
      <div className="relative flex h-screen w-screen overflow-hidden bg-gray-100">
        <main className="absolute inset-0 z-0 w-full h-full">{children}</main>
        <div className="z-10 h-full">
          <AppSidebar />
        </div>
      </div>
    </SidebarProvider>
  );
}

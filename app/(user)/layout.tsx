import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
      <AppSidebar />
      <main className="w-full h-full">{children}</main>
    </SidebarProvider>
  );
}

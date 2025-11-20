import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/features/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full">{children}</main>
    </SidebarProvider>
  );
}

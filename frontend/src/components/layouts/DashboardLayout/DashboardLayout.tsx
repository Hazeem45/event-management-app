import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";
import SidebarLayout from "./SidebarLayout";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./Dashboard.constants";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface PropTypes {
  title?: string;
  description?: string;
  children: ReactNode;
  type: "admin" | "member";
}

const DashboardLayout = (props: PropTypes) => {
  const { title, description, children, type } = props;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "300px",
          "--sidebar-width-icon": "3.5rem",
        } as React.CSSProperties
      }
    >
      <PageHead title={title} />
      <div className="flex min-h-screen w-full">
        <SidebarLayout
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
        />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-4 flex items-center justify-between px-0">
            <h1 className="text-3xl font-bold">{title}</h1>
            <SidebarTrigger className="lg:hidden" />
          </div>
          <p className="mb-4 text-sm">{description}</p>
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

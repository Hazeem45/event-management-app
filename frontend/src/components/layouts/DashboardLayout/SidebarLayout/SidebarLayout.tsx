import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
}

const SidebarLayout = (props: PropTypes) => {
  const { sidebarItems } = props;
  const router = useRouter();

  return (
    <Sidebar
      collapsible="offcanvas"
      className="flex h-screen flex-col justify-between border-r"
    >
      <SidebarHeader className="flex items-center justify-center pt-6">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={60}
          className="mb-6 w-32 cursor-pointer"
          onClick={() => router.push("/")}
        />
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton
                asChild
                isActive={router.pathname.startsWith(item.href)}
                size={"lg"}
                className="data-[active=true]:bg-primary my-1 h-12 text-2xl data-[active=true]:text-white"
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <span className="text-current">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="pb-6">
        <Button
          variant="ghost"
          className="text-destructive w-full justify-start gap-2"
          onClick={() => signOut()}
        >
          <CiLogout />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );

  // return (
  //   <div className="relative z-50 flex h-screen w-full max-w-75 flex-col justify-between border-r bg-white px-4 py-6 transition-all">
  //     <div>
  //       <div className="flex justify-center">
  //         <Image
  //           src="/images/general/logo.svg"
  //           alt="logo"
  //           width={180}
  //           height={60}
  //           className="mb-6 w-32"
  //           onClick={() => router.push("/")}
  //         />
  //       </div>
  //     </div>
  //     <div className="flex items-center p-1">
  //       <Button
  //         className="text-primary flex cursor-pointer justify-start rounded-lg px-2 py-1.5"
  //         variant={"ghost"}
  //         onClick={() => signOut()}
  //       >
  //         <CiLogout />
  //         Logout
  //       </Button>
  //     </div>
  //   </div>
  // );
};

export default SidebarLayout;

"use client";

import { Menu } from "lucide-react";
import {
  Home,
  Building2,
  Users,
  FileText,
  CreditCard,
  UserCog,
  Settings,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Nav } from "./nav";
import Image from "next/image";

const links = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/properties", label: "Imóveis", icon: Building2 },
  { href: "/tenants", label: "Inquilinos", icon: Users },
  { href: "/leases", label: "Contratos", icon: FileText },
  { href: "/payments", label: "Pagamentos", icon: CreditCard },
  { href: "/owners", label: "Proprietários", icon: UserCog },
  { href: "/settings", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-screen">
      {/* Mobile */}
      <div className="md:hidden p-4">
        <Sheet>
          <SheetTrigger>
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] bg-muted border-r">
            <SheetTitle className="p-6">
              <Image src="/logo.svg" alt="logo" width={160} height={32} />
            </SheetTitle>
            <Nav links={links} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen fixed bg-muted border-r">
        <div className="text-2xl font-bold p-6">
          <Image src="/logo.svg" alt="logo" width={160} height={32} />
        </div>
        <Nav links={links} />
      </aside>
    </div>
  );
}

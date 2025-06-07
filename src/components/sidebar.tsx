"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/properties", label: "Imóveis" },
  { href: "/tenants", label: "Inquilinos" },
  { href: "/leases", label: "Contratos" },
  { href: "/payments", label: "Pagamentos" },
  { href: "/owners", label: "Proprietários" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Mobile */}
      <div className="md:hidden p-4">
        <Sheet>
          <SheetTrigger>
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px]">
            <nav className="flex flex-col gap-2 mt-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium px-3 py-2 rounded hover:bg-muted transition",
                    pathname === link.href && "bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen bg-gray-100 p-4 border-r">
        <div className="text-xl font-bold mb-6">RentAdmin</div>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium px-3 py-2 rounded hover:bg-muted transition",
                pathname === link.href && "bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}

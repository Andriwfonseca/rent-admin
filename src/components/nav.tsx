import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserAvatar } from "./user-avatar";
import { Button } from "./ui/button";
import { DottedSeparator } from "./dotted-separator";

interface NavProps {
  links: { href: string; label: string; icon: React.ElementType }[];
}

export const Nav = ({ links }: NavProps) => {
  const pathname = usePathname();

  const handleLogout = () => {};

  return (
    <nav className="flex flex-col justify-between h-full">
      {/* Links */}
      <div className="flex flex-col gap-1 mt-4 px-6">
        <DottedSeparator className="mt-2" />

        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-md transition-colors",
              pathname === href
                ? "bg-white"
                : "hover:bg-white text-muted-foreground"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </div>

      {/* Rodapé */}
      <div className="mt-6 px-4 py-3">
        <DottedSeparator className="mb-2" />

        <div className="flex items-center gap-3">
          <UserAvatar className="size-10" name="Filipe Fonseca" />
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-medium truncate">Filipe Fonseca</p>
            <p className="text-xs text-muted-foreground truncate">
              filipefonsequinha@gmail.com
            </p>
          </div>
        </div>

        <DottedSeparator className="mt-2" />

        <Button
          className="w-full text-sm font-semibold"
          variant="ghost"
          size="sm"
          onClick={handleLogout}
        >
          Sair
        </Button>
      </div>
    </nav>
  );
};

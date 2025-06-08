import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export const UserAvatar = ({
  name,
  className,
  fallbackClassName,
}: UserAvatarProps) => {
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "";
    const first = parts[0][0] || "";
    const last = parts[parts.length - 1][0] || "";
    return (first + last).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <Avatar className={cn("size-5 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "text-white bg-blue-600 font-semibold text-sm uppercase rounded-md",
          fallbackClassName
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

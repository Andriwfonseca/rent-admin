import { TenantCard } from "./tenant-card";

interface TenantListProps {
  tenants: {
    id: string;
    name: string;
    taxId: string;
    phone: string;
    email: string;
    address?: string;
  }[];
}

export const TenantList = ({ tenants }: TenantListProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {tenants.map((tenant) => (
        <TenantCard key={tenant.id} tenant={tenant} />
      ))}
    </div>
  );
};

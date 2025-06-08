"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/responsive-modal";
import { TenantList } from "@/features/tenant/components/tenant-list";
import { CreateTenantForm } from "@/features/tenant/components/create-tenant-form";

// Mock inicial
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockTenants: any[] = [
  {
    id: "1",
    name: "João Silva",
    taxId: "12345678901",
    phone: "11987654321",
    email: "joao.silva@email.com",
    address: "Rua das Laranjeiras, 100",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    taxId: "98765432100",
    phone: "21987654321",
    email: "maria.oliveira@email.com",
    address: "Av. Brasil, 200",
  },
  {
    id: "3",
    name: "Maria Oliveira",
    taxId: "98765432100",
    phone: "21987654321",
    email: "maria.oliveira@email.com",
    address: "Av. Brasil, 200",
  },
  {
    id: "4",
    name: "João Silvassssssssssssssssssssssssssssssssssssssssss",
    taxId: "12345678901",
    phone: "11987654321",
    email:
      "joao.silva@email.comasssssssssssssssssaassssssssssssssssssssssssssss",
    address:
      "Rua das Laranjeiras, 100sssssssssssssssssssssssssssssssssssssssssssssssssssss",
  },
];

export default function TenantsPage() {
  const [tenants, setTenants] = useState(mockTenants);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inquilinos</h1>
        <Button onClick={() => setOpen(true)}>Novo Inquilino</Button>
      </div>

      <TenantList tenants={tenants} />

      <ResponsiveModal
        title="Cadastrar Inquilino"
        open={open}
        onOpenChange={setOpen}
      >
        <CreateTenantForm
          onSubmit={(data) => {
            setTenants((prev) => [
              ...prev,
              { id: crypto.randomUUID(), ...data },
            ]);
            setOpen(false);
          }}
        />
      </ResponsiveModal>
    </div>
  );
}

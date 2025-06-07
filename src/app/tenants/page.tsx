"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Schema Zod para Tenant
const tenantSchema = z.object({
  name: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
  taxId: z.string().min(11, "CPF/CNPJ inválido"), // pode melhorar a validação depois
  phone: z.string().min(8, "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
  address: z.string().optional(),
});

type TenantForm = z.infer<typeof tenantSchema>;

// Tipo Tenant incluindo id
type Tenant = TenantForm & { id: string };

// Mock inicial
const mockTenants: Tenant[] = [
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
];

export default function TenantsPage() {
  const [tenants, setTenants] = useState(mockTenants);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TenantForm>({
    resolver: zodResolver(tenantSchema),
  });

  function onSubmit(data: TenantForm) {
    const newTenant = {
      id: String(tenants.length + 1),
      ...data,
    };
    setTenants((prev) => [...prev, newTenant]);
    reset();
    setOpen(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inquilinos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Novo Inquilino</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Novo Inquilino</DialogTitle>
              <DialogDescription>
                Preencha os dados para cadastrar um inquilino.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="taxId">CPF/CNPJ</Label>
                <Input id="taxId" {...register("taxId")} />
                {errors.taxId && (
                  <p className="text-red-600 text-sm">{errors.taxId.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" {...register("phone")} />
                {errors.phone && (
                  <p className="text-red-600 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" {...register("email")} />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" {...register("address")} />
                {errors.address && (
                  <p className="text-red-600 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF/CNPJ</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Endereço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants.map((tenant) => (
            <TableRow key={tenant.id}>
              <TableCell>{tenant.name}</TableCell>
              <TableCell>{tenant.taxId}</TableCell>
              <TableCell>{tenant.phone}</TableCell>
              <TableCell>{tenant.email}</TableCell>
              <TableCell>{tenant.address ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

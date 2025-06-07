"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ownerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  taxId: z.string().min(1, "CPF/CNPJ é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  email: z.string().email("E-mail inválido"),
  address: z.string().optional(),
});

type OwnerForm = z.infer<typeof ownerSchema>;

const mockOwners: (OwnerForm & { id: string })[] = [
  {
    id: "1",
    name: "João da Silva",
    taxId: "123.456.789-00",
    phone: "(11) 91234-5678",
    email: "joao@email.com",
    address: "Rua das Flores, 123",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    taxId: "987.654.321-00",
    phone: "(11) 99876-5432",
    email: "maria@email.com",
    address: "Av. Brasil, 456",
  },
];

export default function OwnersPage() {
  const [owners, setOwners] = useState(mockOwners);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OwnerForm>({
    resolver: zodResolver(ownerSchema),
  });

  function onSubmit(data: OwnerForm) {
    const newOwner = { id: String(owners.length + 1), ...data };
    setOwners((prev) => [...prev, newOwner]);
    reset();
    setOpen(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Proprietários</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Novo Proprietário</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Novo Proprietário</DialogTitle>
              <DialogDescription>
                Preencha os dados do proprietário.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="taxId">CPF/CNPJ</Label>
                <Input id="taxId" {...register("taxId")} />
                {errors.taxId && (
                  <p className="text-sm text-red-600">{errors.taxId.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" {...register("phone")} />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" {...register("email")} />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" {...register("address")} />
              </div>
              <DialogFooter>
                <Button type="submit">Salvar</Button>
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
            <TableHead>Email</TableHead>
            <TableHead>Endereço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {owners.map((owner) => (
            <TableRow key={owner.id}>
              <TableCell>{owner.name}</TableCell>
              <TableCell>{owner.taxId}</TableCell>
              <TableCell>{owner.phone}</TableCell>
              <TableCell>{owner.email}</TableCell>
              <TableCell>{owner.address || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

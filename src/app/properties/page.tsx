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

// Zod schema
const propertySchema = z.object({
  description: z.string().min(3, "Descrição deve ter ao menos 3 caracteres"),
  address: z.string().min(3, "Endereço deve ter ao menos 3 caracteres"),
  type: z.enum(["house", "apartment", "commercial", "other"]),
  area: z
    .number({ invalid_type_error: "Área deve ser um número" })
    .positive("Área deve ser maior que zero")
    .optional(),
  bedrooms: z.number().int().nonnegative().optional(),
  bathrooms: z.number().int().nonnegative().optional(),
  hasGarage: z.boolean(),
  rentAmount: z.number().positive("Valor do aluguel deve ser positivo"),
  status: z.enum(["available", "rented", "maintenance"]),
});

type PropertyForm = z.infer<typeof propertySchema>;

// Mock inicial de imóveis
const mockProperties: Array<PropertyForm & { id: string }> = [
  {
    id: "1",
    description: "Casa espaçosa no centro",
    address: "Rua Principal, 123",
    type: "house",
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    hasGarage: true,
    rentAmount: 2500,
    status: "available",
  },
  {
    id: "2",
    description: "Apartamento moderno",
    address: "Av. das Flores, 456",
    type: "apartment",
    area: 80,
    bedrooms: 2,
    bathrooms: 1,
    hasGarage: false,
    rentAmount: 1800,
    status: "rented",
  },
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState(mockProperties);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      hasGarage: false,
      status: "available",
      type: "house",
    },
  });

  function onSubmit(data: PropertyForm) {
    // Simula salvar e fechar modal
    const newProperty = {
      id: String(properties.length + 1),
      ...data,
    };
    setProperties((prev) => [...prev, newProperty]);
    reset();
    setOpen(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Imóveis</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Novo Imóvel</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Novo Imóvel</DialogTitle>
              <DialogDescription>
                Preencha os dados para cadastrar um imóvel.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input id="description" {...register("description")} />
                {errors.description && (
                  <p className="text-red-600 text-sm">
                    {errors.description.message}
                  </p>
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
              <div>
                <Label htmlFor="type">Tipo</Label>
                <select
                  id="type"
                  {...register("type")}
                  className="w-full rounded border border-gray-300 p-2"
                >
                  <option value="house">Casa</option>
                  <option value="apartment">Apartamento</option>
                  <option value="commercial">Comercial</option>
                  <option value="other">Outro</option>
                </select>
                {errors.type && (
                  <p className="text-red-600 text-sm">{errors.type.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="area">Área (m²)</Label>
                <Input
                  type="number"
                  step="0.01"
                  id="area"
                  {...register("area", { valueAsNumber: true })}
                />
                {errors.area && (
                  <p className="text-red-600 text-sm">{errors.area.message}</p>
                )}
              </div>
              <div className="flex gap-4">
                <div>
                  <Label htmlFor="bedrooms">Quartos</Label>
                  <Input
                    type="number"
                    id="bedrooms"
                    {...register("bedrooms", { valueAsNumber: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Banheiros</Label>
                  <Input
                    type="number"
                    id="bathrooms"
                    {...register("bathrooms", { valueAsNumber: true })}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasGarage"
                  {...register("hasGarage")}
                />
                <Label htmlFor="hasGarage">Possui garagem</Label>
              </div>
              <div>
                <Label htmlFor="rentAmount">Valor do aluguel (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  id="rentAmount"
                  {...register("rentAmount", { valueAsNumber: true })}
                />
                {errors.rentAmount && (
                  <p className="text-red-600 text-sm">
                    {errors.rentAmount.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  {...register("status")}
                  className="w-full rounded border border-gray-300 p-2"
                >
                  <option value="available">Disponível</option>
                  <option value="rented">Alugado</option>
                  <option value="maintenance">Manutenção</option>
                </select>
                {errors.status && (
                  <p className="text-red-600 text-sm">
                    {errors.status.message}
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
            <TableHead>Descrição</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Área (m²)</TableHead>
            <TableHead>Quartos</TableHead>
            <TableHead>Banheiros</TableHead>
            <TableHead>Garagem</TableHead>
            <TableHead>Aluguel (R$)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>{property.description}</TableCell>
              <TableCell>{property.address}</TableCell>
              <TableCell>{property.type}</TableCell>
              <TableCell>{property.area ?? "-"}</TableCell>
              <TableCell>{property.bedrooms ?? "-"}</TableCell>
              <TableCell>{property.bathrooms ?? "-"}</TableCell>
              <TableCell>{property.hasGarage ? "Sim" : "Não"}</TableCell>
              <TableCell>{property.rentAmount.toFixed(2)}</TableCell>
              <TableCell>{property.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

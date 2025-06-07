"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";

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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

// Schema para contrato
const leaseSchema = z.object({
  property: z.string().min(3),
  tenant: z.string().min(3),
  rentAmount: z.string().min(1),
  startDate: z.date(),
  dueDay: z.coerce.number().min(1).max(31),
});

type LeaseForm = z.infer<typeof leaseSchema>;

const mockLeases: (LeaseForm & { id: string })[] = [
  {
    id: "1",
    property: "Casa Rua A, 123",
    tenant: "João Silva",
    rentAmount: "2000",
    startDate: new Date("2024-01-01"),
    dueDay: 5,
  },
  {
    id: "2",
    property: "Apto Avenida Central, 456",
    tenant: "Maria Oliveira",
    rentAmount: "2500",
    startDate: new Date("2024-03-01"),
    dueDay: 10,
  },
];

export default function LeasesPage() {
  const [leases, setLeases] = useState(mockLeases);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<LeaseForm>({
    resolver: zodResolver(leaseSchema),
    defaultValues: {
      startDate: new Date(),
    },
  });

  const startDate = watch("startDate");

  function onSubmit(data: LeaseForm) {
    const newLease = { id: String(leases.length + 1), ...data };
    setLeases((prev) => [...prev, newLease]);
    reset();
    setOpen(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contratos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Novo Contrato</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Novo Contrato</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo contrato.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="property">Imóvel</Label>
                <Input id="property" {...register("property")} />
                {errors.property && (
                  <p className="text-sm text-red-600">
                    {errors.property.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="tenant">Inquilino</Label>
                <Input id="tenant" {...register("tenant")} />
                {errors.tenant && (
                  <p className="text-sm text-red-600">
                    {errors.tenant.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="rentAmount">Valor do Aluguel</Label>
                <Input id="rentAmount" {...register("rentAmount")} />
                {errors.rentAmount && (
                  <p className="text-sm text-red-600">
                    {errors.rentAmount.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Data de Início</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate
                        ? format(startDate, "dd/MM/yyyy")
                        : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setValue("startDate", date)}
                    />
                  </PopoverContent>
                </Popover>
                {errors.startDate && (
                  <p className="text-sm text-red-600">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="dueDay">Dia de Vencimento</Label>
                <Input type="number" id="dueDay" {...register("dueDay")} />
                {errors.dueDay && (
                  <p className="text-sm text-red-600">
                    {errors.dueDay.message}
                  </p>
                )}
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
            <TableHead>Imóvel</TableHead>
            <TableHead>Inquilino</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Início</TableHead>
            <TableHead>Vencimento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leases.map((lease) => (
            <TableRow key={lease.id}>
              <TableCell>{lease.property}</TableCell>
              <TableCell>{lease.tenant}</TableCell>
              <TableCell>R$ {Number(lease.rentAmount).toFixed(2)}</TableCell>
              <TableCell>
                {format(new Date(lease.startDate), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>{lease.dueDay}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

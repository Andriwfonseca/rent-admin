"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const paymentSchema = z.object({
  leaseId: z.string().min(1, "Contrato é obrigatório"),
  amount: z.string().min(1, "Valor é obrigatório"),
  dueDate: z.date(),
  paymentDate: z.date().optional(),
  status: z.enum(["pending", "paid", "overdue"]),
});

type PaymentForm = z.infer<typeof paymentSchema>;

const mockPayments: (PaymentForm & { id: string })[] = [
  {
    id: "1",
    leaseId: "Contrato João",
    amount: "2000",
    dueDate: new Date("2024-06-10"),
    paymentDate: new Date("2024-06-09"),
    status: "paid",
  },
  {
    id: "2",
    leaseId: "Contrato Maria",
    amount: "2500",
    dueDate: new Date("2024-06-10"),
    status: "pending",
  },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState(mockPayments);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      dueDate: new Date(),
      status: "pending",
    },
  });

  const dueDate = watch("dueDate");
  const paymentDate = watch("paymentDate");

  function onSubmit(data: PaymentForm) {
    const newPayment = { id: String(payments.length + 1), ...data };
    setPayments((prev) => [...prev, newPayment]);
    reset();
    setOpen(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pagamentos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Novo Pagamento</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Novo Pagamento</DialogTitle>
              <DialogDescription>
                Preencha os dados do pagamento.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="leaseId">Contrato</Label>
                <Input id="leaseId" {...register("leaseId")} />
                {errors.leaseId && (
                  <p className="text-sm text-red-600">
                    {errors.leaseId.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="amount">Valor</Label>
                <Input id="amount" {...register("amount")} />
                {errors.amount && (
                  <p className="text-sm text-red-600">
                    {errors.amount.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Data de Vencimento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate
                        ? format(dueDate, "dd/MM/yyyy")
                        : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={(date) => date && setValue("dueDate", date)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Data de Pagamento (opcional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left",
                        !paymentDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {paymentDate
                        ? format(paymentDate, "dd/MM/yyyy")
                        : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={paymentDate}
                      onSelect={(date) => date && setValue("paymentDate", date)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  {...register("status")}
                  className="w-full border rounded-md h-10 px-3"
                >
                  <option value="pending">Pendente</option>
                  <option value="paid">Pago</option>
                  <option value="overdue">Vencido</option>
                </select>
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
            <TableHead>Contrato</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Pago em</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.leaseId}</TableCell>
              <TableCell>R$ {Number(p.amount).toFixed(2)}</TableCell>
              <TableCell>{format(p.dueDate, "dd/MM/yyyy")}</TableCell>
              <TableCell>
                {p.paymentDate ? format(p.paymentDate, "dd/MM/yyyy") : "-"}
              </TableCell>
              <TableCell>
                {p.status === "pending" && (
                  <span className="text-yellow-600">Pendente</span>
                )}
                {p.status === "paid" && (
                  <span className="text-green-600">Pago</span>
                )}
                {p.status === "overdue" && (
                  <span className="text-red-600">Vencido</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

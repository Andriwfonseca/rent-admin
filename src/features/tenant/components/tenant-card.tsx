"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ResponsiveModal } from "@/components/responsive-modal";
import { EditTenantForm } from "./edit-tenant-form";
import { formatPhone } from "@/lib/utils";

interface TenantCardProps {
  tenant: {
    id: string;
    name: string;
    taxId: string;
    phone: string;
    email: string;
    address?: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEdit?: (data: any) => void;
  onDelete?: (id: string) => void;
}

export const TenantCard = ({ tenant, onEdit, onDelete }: TenantCardProps) => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className="border rounded-md p-4 shadow-sm bg-white relative">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg truncate">{tenant.name}</h3>

        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={() => setOpenEdit(true)}>
            <Pencil className="w-4 h-4" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Deseja realmente remover este inquilino?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete?.(tenant.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Remover
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <div className="flex text-sm">
          <p className="font-semibold">CPF/CNPJ:</p>
          <p className="text-muted-foreground ml-1 truncate">{tenant.taxId}</p>
        </div>
        <div className="flex text-sm">
          <p className="font-semibold">Telefone:</p>
          <p className="text-muted-foreground ml-1 truncate">
            {formatPhone(tenant.phone)}
          </p>
        </div>
        <div className="flex text-sm">
          <p className="font-semibold">E-mail:</p>
          <p className="text-muted-foreground ml-1 truncate">{tenant.email}</p>
        </div>
        <div className="flex text-sm">
          <p className="font-semibold">Endereço:</p>
          <p className="text-muted-foreground ml-1 truncate">
            {tenant.address || "-"}
          </p>
        </div>
      </div>

      <ResponsiveModal
        title="Editar Inquilino"
        open={openEdit}
        onOpenChange={setOpenEdit}
      >
        <EditTenantForm
          defaultValues={tenant}
          onSubmit={(data) => {
            onEdit?.(data);
            setOpenEdit(false);
          }}
        />
      </ResponsiveModal>
    </div>
  );
};

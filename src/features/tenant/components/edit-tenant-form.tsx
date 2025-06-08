"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { applyPhoneMask, applyTaxIdMask } from "@/lib/masks";
import { isValidCNPJ, isValidCPF } from "@/lib/validators";

export const tenantSchema = z.object({
  name: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
  taxId: z.string().refine(
    (value) => {
      const digits = value.replace(/\D/g, "");
      return isValidCPF(digits) || isValidCNPJ(digits);
    },
    {
      message: "CPF/CNPJ inválido",
    }
  ),
  phone: z.string().min(8, "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
  address: z.string().optional(),
});

export type TenantFormData = z.infer<typeof tenantSchema>;

interface EditTenantFormProps {
  defaultValues: TenantFormData;
  onSubmit: (data: TenantFormData) => void;
}

export const EditTenantForm = ({
  defaultValues,
  onSubmit,
}: EditTenantFormProps) => {
  const form = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-6 pt-0"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CPF/CNPJ com máscara */}
        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF/CNPJ</FormLabel>
              <FormControl>
                <Input
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  className="border-gray-300 focus:ring-1 focus:ring-blue-500"
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(applyTaxIdMask(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Telefone com máscara */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder="(00) 00000-0000"
                  className="border-gray-300 focus:ring-1 focus:ring-blue-500"
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(applyPhoneMask(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Rua Exemplo, 123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Salvar alterações
        </Button>
      </form>
    </Form>
  );
};

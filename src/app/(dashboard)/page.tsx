"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const summary = {
  totalProperties: 12,
  totalOwners: 5,
  totalTenants: 8,
  activeLeases: 6,
  monthlyIncome: 12400.75,
};

const rentByMonth = [
  { month: "Jan", value: 9500 },
  { month: "Feb", value: 10200 },
  { month: "Mar", value: 9800 },
  { month: "Apr", value: 11000 },
  { month: "Mai", value: 12400 },
  { month: "Jun", value: 11800 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Imóveis</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-semibold">
              {summary.totalProperties}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Proprietários</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-semibold">
              {summary.totalOwners}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inquilinos</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-semibold">
              {summary.totalTenants}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contratos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-semibold">
              {summary.activeLeases}
            </span>
          </CardContent>
        </Card>
        <Card className="col-span-1 sm:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Renda Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-semibold">
              R${" "}
              {summary.monthlyIncome.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </span>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="space-y-2">
        <h2 className="text-xl font-bold">Recebimentos por Mês</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rentByMonth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

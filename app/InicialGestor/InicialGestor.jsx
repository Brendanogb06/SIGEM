"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Boxes,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  Download,
  Eye,
  Filter,
  Plus,
  TrendingDown,
  TrendingUp,
  Upload,
  Wrench,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

/* ---------------------------------------------------------
   SIGEM — Painel Geral (admin)
   Sem MenuSuperior/MenuLateral — apenas o conteúdo do painel.
--------------------------------------------------------- */

const statusData = [
  { name: "Novo", value: 5, color: "#22c55e" },
  { name: "Pendente", value: 4, color: "#f59e0b" },
  { name: "Em análise", value: 2, color: "#eab308" },
  { name: "Em atendimento", value: 6, color: "#3b82f6" },
  { name: "Suspenso", value: 4, color: "#a855f7" },
  { name: "Concluído", value: 9, color: "#16a34a" },
  { name: "Cancelado", value: 1, color: "#ef4444" },
];

const setorData = [
  { name: "TI", value: 8 },
  { name: "Financeiro", value: 5 },
  { name: "Administração", value: 4 },
  { name: "RH", value: 4 },
  { name: "Infraestrutura", value: 3 },
  { name: "Secretaria", value: 2 },
  { name: "Segurança", value: 2 },
  { name: "Manutenção", value: 2 },
  { name: "Limpeza", value: 1 },
  { name: "Outros", value: 1 },
];
const maxSetor = Math.max(...setorData.map((s) => s.value));

const kpis = [
  {
    label: "Total de chamados",
    value: 29,
    delta: "+12% vs. semana anterior",
    up: true,
    icon: ClipboardList,
    tint: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Abertos",
    value: 7,
    delta: "-5% vs. semana anterior",
    up: false,
    icon: Plus,
    tint: "bg-teal-50 text-teal-600",
  },
  {
    label: "Em andamento",
    value: 12,
    delta: "+8% vs. semana anterior",
    up: true,
    icon: Wrench,
    tint: "bg-amber-50 text-amber-600",
  },
  {
    label: "Atrasados",
    value: 3,
    delta: "Ver detalhes",
    up: null,
    icon: Clock,
    tint: "bg-violet-50 text-violet-600",
  },
  {
    label: "Concluídos",
    value: 9,
    delta: "+15% vs. semana anterior",
    up: true,
    icon: CheckCircle2,
    tint: "bg-green-50 text-green-600",
  },
];

const alerts = [
  {
    title: "3 chamados atrasados",
    desc: "Precisam de atenção imediata",
    icon: AlertTriangle,
    tint: "bg-rose-50 text-rose-500",
  },
  {
    title: "2 manutenções preventivas",
    desc: "Programadas para hoje",
    icon: Wrench,
    tint: "bg-amber-50 text-amber-500",
  },
  {
    title: "5 chamados aguardando aprovação",
    desc: "Requerem sua análise",
    icon: Clock,
    tint: "bg-blue-50 text-blue-500",
  },
];

const agenda = [
  { time: "09:00", title: "Manutenção preventiva – Ar-condicionado", place: "Prédio A · Sala 201" },
  { time: "11:00", title: "Visita técnica – Impressoras", place: "Financeiro" },
  { time: "14:00", title: "Manutenção corretiva – Projetor", place: "Auditório" },
];

const quickActions = [
  { label: "Novo chamado", icon: Plus },
  { label: "Relatórios", icon: BarChart3 },
  { label: "Cadastrar equipamento", icon: Boxes },
  { label: "Cadastrar manutenção", icon: Wrench },
  { label: "Importar OS", icon: Upload },
  { label: "Exportar dados", icon: Download },
];

const chamados = [
  { id: "#1234", titulo: "Computador não liga", setor: "TI", prioridade: "Alta", status: "Em atendimento", abertura: "26/07/2025", resp: "Carlos Silva", respColor: "bg-orange-200 text-orange-800" },
  { id: "#1233", titulo: "Impressora com erro", setor: "Financeiro", prioridade: "Média", status: "Em análise", abertura: "26/07/2025", resp: "João Lima", respColor: "bg-blue-200 text-blue-800" },
  { id: "#1232", titulo: "Ar-condicionado não gela", setor: "Infraestrutura", prioridade: "Alta", status: "Novo", abertura: "25/07/2025", resp: "—", respColor: "" },
  { id: "#1231", titulo: "Projetor com falha", setor: "Administração", prioridade: "Baixa", status: "Pendente", abertura: "25/07/2025", resp: "Maria Souza", respColor: "bg-pink-200 text-pink-800" },
  { id: "#1230", titulo: "Troca de lâmpada", setor: "Manutenção", prioridade: "Baixa", status: "Concluído", abertura: "25/07/2025", resp: "Carlos Silva", respColor: "bg-orange-200 text-orange-800" },
];

const priorityStyles = {
  Alta: "bg-rose-100 text-rose-700",
  Média: "bg-amber-100 text-amber-700",
  Baixa: "bg-emerald-100 text-emerald-700",
};

const statusStyles = {
  "Em atendimento": "bg-blue-100 text-blue-700",
  "Em análise": "bg-yellow-100 text-yellow-700",
  Novo: "bg-emerald-100 text-emerald-700",
  Pendente: "bg-slate-200 text-slate-700",
  Concluído: "bg-green-100 text-green-700",
};

function KpiCard({ kpi }) {
  const Icon = kpi.icon;
  return (
    <div className="flex flex-1 min-w-[160px] flex-col justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${kpi.tint}`}>
        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
      </span>
      <div className="mt-3">
        <p className="text-2xl font-medium text-slate-800">{kpi.value}</p>
        <p className="text-xs font-light text-slate-400">{kpi.label}</p>
      </div>
      <div
        className={`mt-2 flex items-center gap-1 text-[11px] font-normal ${
          kpi.up === true ? "text-emerald-600" : kpi.up === false ? "text-rose-500" : "text-slate-400"
        }`}
      >
        {kpi.up === true && <TrendingUp className="h-3.5 w-3.5" />}
        {kpi.up === false && <TrendingDown className="h-3.5 w-3.5" />}
        {kpi.delta}
        {kpi.up === null && <ChevronRight className="h-3.5 w-3.5" />}
      </div>
    </div>
  );
}

function StatusDonut() {
  const total = statusData.reduce((a, b) => a + b.value, 0);
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-base font-medium text-slate-800">Chamados por status</p>
      <p className="text-xs font-light text-slate-400">Distribuição atual de todos os chamados</p>
      <div className="mt-2 flex items-center gap-4">
        <div className="relative h-[170px] w-[170px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={statusData} dataKey="value" innerRadius={52} outerRadius={78} paddingAngle={2} stroke="none">
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-medium text-slate-800">{total}</span>
            <span className="text-[11px] font-light text-slate-400">chamados</span>
          </div>
        </div>
        <ul className="flex-1 space-y-1.5">
          {statusData.map((s) => (
            <li key={s.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-light text-slate-500">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                {s.name}
              </span>
              <span className="font-medium text-slate-700">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link href="/relatorios" className="mt-4 flex items-center gap-1 text-xs font-medium text-green-600 hover:underline">
        Ver relatório completo <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function SetorBars() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-base font-medium text-slate-800">Chamados por setor</p>
      <p className="text-xs font-light text-slate-400">Volume de solicitações por setor</p>
      <div className="mt-4 space-y-2.5">
        {setorData.map((s) => (
          <div key={s.name} className="flex items-center gap-3 text-xs">
            <span className="w-28 shrink-0 truncate font-light text-slate-500">{s.name}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(s.value / maxSetor) * 100}%` }} />
            </div>
            <span className="w-4 text-right font-medium text-slate-600">{s.value}</span>
          </div>
        ))}
      </div>
      <Link href="/relatorios" className="mt-4 flex items-center gap-1 text-xs font-medium text-green-600 hover:underline">
        Ver todos os setores <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function AlertasPanel() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-base font-medium text-slate-800">Alertas importantes</p>
      <div className="mt-4 space-y-3">
        {alerts.map((a) => (
          <div key={a.title} className="flex items-start gap-3 rounded-xl bg-slate-50/70 p-4">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${a.tint}`}>
              <a.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-800">{a.title}</p>
              <p className="text-xs font-light text-slate-400">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/chamados" className="mt-4 flex items-center gap-1 text-sm font-medium text-green-600 hover:underline">
        Ver todos os alertas <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function AgendaPanel() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-base font-medium text-slate-800">Agenda de hoje</p>
      <div className="mt-3 space-y-3">
        {agenda.map((a) => (
          <div key={a.time} className="flex gap-3">
            <span className="w-11 shrink-0 text-xs font-medium text-emerald-600">{a.time}</span>
            <div className="border-l border-slate-100 pl-3">
              <p className="text-xs font-medium text-slate-700">{a.title}</p>
              <p className="text-[11px] font-light text-slate-400">{a.place}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/agenda" className="mt-3 flex items-center gap-1 text-xs font-medium text-green-600 hover:underline">
        Ver agenda completa <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function AcoesRapidas() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="mb-3 text-base font-medium text-slate-800">Ações rápidas</p>
      <div className="grid grid-cols-2 gap-2.5">
        {quickActions.map((a) => (
          <button
            key={a.label}
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5 text-left text-xs font-normal text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <a.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChamadosTable() {
  const [busca, setBusca] = useState("");
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar chamado..."
          className="w-full max-w-xs rounded-lg border border-slate-200 px-3 py-2 text-sm font-light text-slate-600 placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none sm:w-64"
        />
        <div className="flex flex-wrap items-center gap-2">
          {["Status", "Setor", "Prioridade"].map((f) => (
            <button
              key={f}
              type="button"
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-normal text-slate-500 hover:bg-slate-50"
            >
              {f} <ChevronDown className="h-3.5 w-3.5" />
            </button>
          ))}
          <button
            type="button"
            className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700"
          >
            <Filter className="h-3.5 w-3.5" /> Filtros
          </button>
        </div>
      </div>

      <p className="mb-3 mt-5 text-base font-medium text-slate-800">Chamados recentes</p>

      <div className="overflow-hidden rounded-xl border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-400">
                <th className="py-3 pl-4 pr-4 text-[10px] font-medium uppercase tracking-wider">N°</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Título</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Setor</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Prioridade</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Status</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Abertura</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Responsável</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {chamados
                .filter((c) => c.titulo.toLowerCase().includes(busca.toLowerCase()))
                .map((c) => (
                  <tr key={c.id} className="text-slate-600 transition-colors hover:bg-emerald-50/40">
                    <td className="py-3.5 pl-4 pr-4 font-normal text-slate-500">{c.id}</td>
                    <td className="py-3.5 pr-4 font-medium text-slate-700">{c.titulo}</td>
                    <td className="py-3.5 pr-4 font-light">{c.setor}</td>
                    <td className="py-3.5 pr-4">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${priorityStyles[c.prioridade]}`}>
                        {c.prioridade}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyles[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-light text-slate-500">{c.abertura}</td>
                    <td className="py-3.5 pr-4">
                      {c.resp === "—" ? (
                        <span className="font-light text-slate-400">—</span>
                      ) : (
                        <span className={`rounded-full px-2 py-1 text-[11px] font-medium ${c.respColor}`}>{c.resp}</span>
                      )}
                    </td>
                    <td className="py-3.5 pr-4">
                      <Eye className="h-4 w-4 text-slate-400 hover:text-emerald-600" strokeWidth={1.75} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Link href="/chamados" className="mt-4 flex items-center gap-1 text-xs font-medium text-green-600 hover:underline">
        Ver todos os chamados <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export default function InicialGestor() {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-slate-50 font-sans font-light text-slate-800">
      {/* Camada decorativa de fundo — topo */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-green-300/30 to-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-40 top-10 h-24 w-24 rounded-full border-4 border-emerald-200/40" />
      <div className="pointer-events-none absolute bottom-0 left-64 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-200/20 to-green-300/10 blur-3xl" />
      <div
        className="pointer-events-none absolute bottom-10 right-1/3 h-24 w-24 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #16a34a 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Camada decorativa de fundo — base, espelhando o topo */}
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-green-300/30 to-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-gradient-to-tl from-emerald-400/25 to-green-200/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-1/3 h-20 w-20 rounded-full border-4 border-emerald-200/40" />
      <div
        className="pointer-events-none absolute bottom-24 left-1/2 h-24 w-24 -translate-x-1/2 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #16a34a 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-emerald-100/40 to-transparent" />

      <section className="relative z-10 min-w-0 flex-1">
        <div className="space-y-5 px-6 py-6">
          <section className="relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-r from-white via-white to-emerald-50 px-8 py-8 sm:px-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br from-green-300/50 to-emerald-500/30" />
            <div className="pointer-events-none absolute -left-10 -bottom-16 h-40 w-40 rounded-full bg-gradient-to-tr from-emerald-200/40 to-green-300/20" />
            <div className="relative max-w-2xl">
              <h1 className="text-2xl font-medium tracking-tight text-slate-800 sm:text-3xl">
                Bem-vindo, Ana
              </h1>
              <p className="mt-2 text-sm font-normal text-emerald-600">
                Há manutenções e chamados aguardando sua análise.
              </p>
            </div>
          </section>

          <div className="flex flex-wrap gap-4">
            {kpis.map((k) => (
              <KpiCard key={k.label} kpi={k} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <StatusDonut />
            <SetorBars />
            <AlertasPanel />
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <ChamadosTable />
            </div>
            <div className="space-y-5">
              <AgendaPanel />
              <AcoesRapidas />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
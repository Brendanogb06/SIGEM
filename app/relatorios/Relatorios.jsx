"use client";

import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Download,
  FileText,
  Gauge,
  Trash2,
  Wrench,
} from "lucide-react";

/* ---------------------------------------------------------
   SIGEM — Relatórios
   Conteúdo da página. Sem MenuSuperior e MenuLateral — o
   layout/shell fica a cargo de quem importar este componente.
--------------------------------------------------------- */

const resumo = [
  {
    label: "Total de Chamados",
    value: 128,
    icon: ClipboardList,
    tint: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Concluídos",
    value: 96,
    icon: CheckCircle2,
    tint: "bg-green-50 text-green-600",
  },
  {
    label: "Em Andamento",
    value: 22,
    icon: Clock,
    tint: "bg-amber-50 text-amber-600",
  },
  {
    label: "Atrasados",
    value: 10,
    icon: AlertTriangle,
    tint: "bg-rose-50 text-rose-500",
  },
];

const relatoriosDisponiveis = [
  {
    titulo: "Resumo Geral",
    desc: "Visão geral de todos os chamados no período.",
    icon: FileText,
    href: "/relatorios/resumo-geral",
  },
  {
    titulo: "Manutenções por Tipo",
    desc: "Quantidade de manutenções por tipo.",
    icon: Wrench,
    href: "/relatorios/manutencoes-por-tipo",
  },
  {
    titulo: "Manutenções por Setor",
    desc: "Distribuição de chamados por setor ou local.",
    icon: Building2,
    href: "/relatorios/manutencoes-por-setor",
  },
  {
    titulo: "Tempo de Atendimento",
    desc: "Média de tempo de atendimento por tipo de manutenção.",
    icon: Gauge,
    href: "/relatorios/tempo-de-atendimento",
  },
  {
    titulo: "Ordens de Serviço Emitidas",
    desc: "Lista de ordens de serviço geradas no período.",
    icon: ClipboardCheck,
    href: "/relatorios/ordens-de-servico",
  },
];

const relatoriosGerados = [
  {
    nome: "Resumo Geral",
    periodo: "01/05/2025 – 30/05/2025",
    geradoEm: "30/05/2025 14:32",
  },
];

function ResumoCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex flex-1 min-w-[160px] items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.tint}`}>
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-xs font-light text-slate-400">{item.label}</p>
        <p className="text-2xl font-medium text-slate-800">{item.value}</p>
      </div>
    </div>
  );
}

function FiltrosPanel() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-base font-medium text-slate-800">Filtros</p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <div>
          <label className="mb-1.5 block text-xs font-light text-slate-400">Período</label>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm font-normal text-slate-600 hover:border-emerald-300"
          >
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
              01/05/2025 – 30/05/2025
            </span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-light text-slate-400">Tipo de Relatório</label>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm font-normal text-slate-600 hover:border-emerald-300"
          >
            Resumo Geral
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-light text-slate-400">Setor / Local</label>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm font-normal text-slate-600 hover:border-emerald-300"
          >
            Todos
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          <BarChart3 className="h-4 w-4" strokeWidth={1.75} />
          Gerar Relatório
        </button>
      </div>
    </div>
  );
}

function RelatoriosDisponiveisPanel() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-base font-medium text-slate-800">Relatórios Disponíveis</p>
      <div className="mt-3 divide-y divide-slate-50">
        {relatoriosDisponiveis.map((r) => (
          <Link
            key={r.titulo}
            href={r.href}
            className="flex items-center gap-3 py-3.5 first:pt-3 last:pb-0 hover:bg-emerald-50/40 rounded-lg px-2 -mx-2 transition-colors"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <r.icon className="h-4.5 w-4.5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-800">{r.titulo}</p>
              <p className="truncate text-xs font-light text-slate-400">{r.desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function RelatoriosGeradosPanel() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-base font-medium text-slate-800">Relatórios Gerados Recentemente</p>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-400">
                <th className="py-3 pl-4 pr-4 text-[10px] font-medium uppercase tracking-wider">Relatório</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Período</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Gerado em</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {relatoriosGerados.map((r) => (
                <tr key={r.nome} className="text-slate-600 transition-colors hover:bg-emerald-50/40">
                  <td className="py-3.5 pl-4 pr-4 font-medium text-slate-700">{r.nome}</td>
                  <td className="py-3.5 pr-4 font-light text-slate-500">{r.periodo}</td>
                  <td className="py-3.5 pr-4 font-light text-slate-500">{r.geradoEm}</td>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Baixar relatório"
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      >
                        <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                      <button
                        type="button"
                        aria-label="Excluir relatório"
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Link href="/relatorios/historico" className="mt-4 flex items-center gap-1 text-xs font-medium text-green-600 hover:underline">
        Ver todos os relatórios <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export default function Relatorios() {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-slate-50 font-sans font-light text-slate-800">
      {/* Camada decorativa de fundo — topo */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-green-300/30 to-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-40 top-10 h-24 w-24 rounded-full border-4 border-emerald-200/40" />
      <div className="pointer-events-none absolute bottom-0 left-64 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-200/20 to-green-300/10 blur-3xl" />
      <div
        className="pointer-events-none absolute bottom-10 right-1/3 h-24 w-24 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, #16a34a 1.5px, transparent 1.5px)",
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
          backgroundImage: "radial-gradient(circle, #16a34a 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-emerald-100/40 to-transparent" />

      <div className="relative z-10 flex flex-1">
        <section className="min-w-0 flex-1">
          <div className="space-y-5 px-6 py-6">
            {/* Cabeçalho */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="flex items-center gap-2 text-2xl font-medium tracking-tight text-slate-800">
                  <BarChart3 className="h-6 w-6 text-emerald-600" strokeWidth={1.75} />
                  Relatórios
                </h1>
                <p className="mt-1 flex items-center gap-1 text-xs font-light text-slate-400">
                  <Link href="/painel" className="hover:text-emerald-600">Início</Link>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-slate-500">Relatórios</span>
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-normal text-slate-600 hover:border-emerald-300 hover:text-emerald-700 sm:self-auto"
              >
                <Download className="h-4 w-4" strokeWidth={1.75} />
                Exportar Relatório
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>

            <FiltrosPanel />

            <div>
              <p className="mb-3 text-base font-medium text-slate-800">Resumo do Período</p>
              <div className="flex flex-wrap gap-4">
                {resumo.map((item) => (
                  <ResumoCard key={item.label} item={item} />
                ))}
              </div>
            </div>

            <RelatoriosDisponiveisPanel />

            <RelatoriosGeradosPanel />
          </div>
        </section>
      </div>
    </main>
  );
}
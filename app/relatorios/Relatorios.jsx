"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  Download,
  FileText,
  FolderOpen,
  Search,
  Trash2,
  Wrench,
  XCircle,
} from "lucide-react";
import MenuSuperior from "../components/MenuSuperior";
import MenuLateral from "../components/MenuLateral";

/* ---------------------------------------------------------
   SIGEM — Relatórios
   Página completa, com MenuSuperior e MenuLateral, no mesmo
   padrão do painel-geral (toggleMenu compartilhado).
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
    titulo: "Chamados em Aberto",
    desc: "Lista individual de chamados ainda não concluídos, com detalhes de cada um.",
    icon: FolderOpen,
    href: "/relatorios/chamados-em-aberto",
  },
  {
    titulo: "Chamados Cancelados",
    desc: "Lista individual de chamados cancelados, com detalhes de cada um.",
    icon: XCircle,
    href: "/relatorios/chamados-cancelados",
  },
  {
    titulo: "Chamados Atrasados",
    desc: "Lista individual de chamados que passaram do prazo, com detalhes de cada um.",
    icon: AlertTriangle,
    href: "/relatorios/chamados-atrasados",
  },
  {
    titulo: "Resumo Geral",
    desc: "Visão agregada de todos os chamados no período.",
    icon: FileText,
    href: "/relatorios/resumo-geral",
  },
  {
    titulo: "Manutenções por Categoria",
    desc: "Quantidade agregada de manutenções por categoria.",
    icon: Wrench,
    href: "/relatorios/manutencoes-por-categoria",
  },
];

const statusOptions = ["Todos", "Novo", "Em andamento", "Pendente", "Concluído", "Cancelado"];
const categoriaOptions = [
  "Todas",
  "Manutenção Preventiva",
  "Manutenção Preditiva",
  "Manutenção Corretiva",
];
const tecnicoOptions = ["Todos", "Carlos Silva", "João Lima", "Maria Souza"];
const setorOptions = [
  "Todos",
  "TI",
  "Financeiro",
  "Administração",
  "RH",
  "Infraestrutura",
  "Secretaria",
  "Limpeza",
  "Sala de Reunião",
  "Sala de Aula"
];
const prioridadeOptions = ["Todas", "Baixa", "Média", "Alta", "Urgente"];

const relatoriosGeradosIniciais = [
  {
    id: "REL-0092",
    modelo: "Relatório de Chamado Específico",
    filtros: "Chamado #111 – Trinco quebrado",
    periodo: "—",
    geradoEm: "31/05/2025 10:15",
  },
  {
    id: "REL-0091",
    modelo: "Resumo Geral",
    filtros: "Todos os status · Todas categorias · Todos setores",
    periodo: "01/05/2025 – 30/05/2025",
    geradoEm: "30/05/2025 14:32",
  },
  {
    id: "REL-0090",
    modelo: "Relatório de Chamado Específico",
    filtros: "Chamado #999 – Ar condicionado com defeito",
    periodo: "—",
    geradoEm: "29/05/2025 09:10",
  },
  {
    id: "REL-0089",
    modelo: "Chamados Atrasados",
    filtros: "Setor: TI · Prioridade: Alta",
    periodo: "01/04/2025 – 30/04/2025",
    geradoEm: "02/05/2025 17:03",
  },
  {
    id: "REL-0088",
    modelo: "Chamados em Aberto",
    filtros: "Todos os status · Todas categorias",
    periodo: "01/04/2025 – 30/04/2025",
    geradoEm: "01/05/2025 08:41",
  },
];

function formatarDataBr(isoDate) {
  if (!isoDate) return "";
  const [ano, mes, dia] = isoDate.split("-");
  return `${dia}/${mes}/${ano}`;
}

function proximoIdRelatorio(lista) {
  const maiorNumero = lista.reduce((max, r) => {
    const numero = parseInt(r.id.replace("REL-", ""), 10);
    return Number.isNaN(numero) ? max : Math.max(max, numero);
  }, 0);
  return `REL-${String(maiorNumero + 1).padStart(4, "0")}`;
}

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

function Select({ label, icon: Icon, value, onChange, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-light text-slate-400">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm font-normal text-slate-600 hover:border-emerald-300 focus:border-emerald-400 focus:outline-none"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {Icon ? (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={1.75} />
        ) : null}
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

function FiltrosPanel({ onGerarRelatorio, onGerarRelatorioChamado }) {
  const [dataInicio, setDataInicio] = useState("2025-05-01");
  const [dataFim, setDataFim] = useState("2025-05-30");
  const [status, setStatus] = useState("Todos");
  const [categoria, setCategoria] = useState("Todas");
  const [tecnico, setTecnico] = useState("Todos");
  const [setor, setSetor] = useState("Todos");
  const [prioridade, setPrioridade] = useState("Todas");
  const [buscaChamado, setBuscaChamado] = useState("");

  function handleGerarClick() {
    if (buscaChamado.trim()) {
      onGerarRelatorioChamado(buscaChamado.trim());
      setBuscaChamado("");
      return;
    }
    onGerarRelatorio({ dataInicio, dataFim, status, categoria, tecnico, setor, prioridade });
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-base font-medium text-slate-800">Filtros</p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Período: data início + data fim */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="mb-1.5 block text-xs font-light text-slate-400">Período</label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={1.75} />
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                max={dataFim || undefined}
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-2 text-sm font-normal text-slate-600 hover:border-emerald-300 focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <span className="shrink-0 text-xs font-light text-slate-400">até</span>
            <div className="relative flex-1">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={1.75} />
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                min={dataInicio || undefined}
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-2 text-sm font-normal text-slate-600 hover:border-emerald-300 focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <Select label="Status do Chamado" value={status} onChange={setStatus} options={statusOptions} />
        <Select label="Categoria da Manutenção" value={categoria} onChange={setCategoria} options={categoriaOptions} />
        <Select label="Técnico Responsável" value={tecnico} onChange={setTecnico} options={tecnicoOptions} />
        <Select label="Setor / Local de Atendimento" value={setor} onChange={setSetor} options={setorOptions} />
        <Select label="Prioridade do Chamado" value={prioridade} onChange={setPrioridade} options={prioridadeOptions} />
      </div>

      {/* Relatório de chamado específico — busca avulsa, junto dos filtros mas fora do recorte por período */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-sm font-medium text-slate-800">Chamado Específico</p>
        <p className="mt-0.5 text-xs font-light text-slate-400">
          Busque por ID ou título para gerar o relatório detalhado de um único chamado.
        </p>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={1.75} />
          <input
            type="text"
            value={buscaChamado}
            onChange={(e) => setBuscaChamado(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGerarClick()}
            placeholder="Ex: #111 ou Trinco quebrado"
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm font-normal text-slate-600 placeholder:text-slate-400 hover:border-emerald-300 focus:border-emerald-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Botão único: gera relatório do chamado se a busca acima estiver preenchida, senão usa os filtros gerais */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={handleGerarClick}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 sm:w-auto"
        >
          <BarChart3 className="h-4 w-4" strokeWidth={1.75} />
          Gerar Relatório
        </button>
        <p className="mt-2 text-[11px] font-light text-slate-400">
          Com um chamado buscado acima, gera o relatório dele. Vazio, usa os filtros preenchidos no topo.
        </p>
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
              <r.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
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

function RelatoriosGeradosPanel({ relatoriosGerados }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-base font-medium text-slate-800">Relatórios Gerados Recentemente</p>

      {relatoriosGerados.length === 0 ? (
        <p className="mt-4 rounded-xl bg-slate-50/70 p-4 text-xs font-light text-slate-400">
          Nenhum relatório gerado ainda. Ajuste os filtros acima e clique em "Gerar Relatório".
        </p>
      ) : (
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-400">
                <th className="py-3 pl-4 pr-4 text-[10px] font-medium uppercase tracking-wider">ID</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Modelo</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Filtros aplicados</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Período</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Gerado em</th>
                <th className="py-3 pr-4 text-[10px] font-medium uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {relatoriosGerados.map((r) => (
                <tr key={r.id} className="text-slate-600 transition-colors hover:bg-emerald-50/40">
                  <td className="py-3.5 pl-4 pr-4 font-normal text-slate-500">{r.id}</td>
                  <td className="py-3.5 pr-4 font-medium text-slate-700">{r.modelo}</td>
                  <td className="py-3.5 pr-4 font-light text-slate-500">{r.filtros}</td>
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
      )}

      <Link href="/relatorios/historico" className="mt-4 flex items-center gap-1 text-xs font-medium text-green-600 hover:underline">
        Ver todos os relatórios <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export default function Relatorios() {
  const [relatoriosGerados, setRelatoriosGerados] = useState(relatoriosGeradosIniciais);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  function toggleMenu() {
    // Breakpoint alinhado ao "lg" do Tailwind (1024px), o mesmo usado
    // no MenuLateral para decidir entre overlay mobile e sidebar fixa.
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      setMenuOpen((current) => !current);
      return;
    }
    setSidebarCollapsed((current) => !current);
  }

  function handleGerarRelatorio({ dataInicio, dataFim, status, categoria, tecnico, setor, prioridade }) {
    const partesFiltro = [
      status !== "Todos" ? `Status: ${status}` : null,
      categoria !== "Todas" ? `Categoria: ${categoria}` : null,
      tecnico !== "Todos" ? `Técnico: ${tecnico}` : null,
      setor !== "Todos" ? `Setor: ${setor}` : null,
      prioridade !== "Todas" ? `Prioridade: ${prioridade}` : null,
    ].filter(Boolean);

    const novoRelatorio = {
      id: proximoIdRelatorio(relatoriosGerados),
      modelo: "Resumo Geral",
      filtros: partesFiltro.length > 0 ? partesFiltro.join(" · ") : "Todos os status · Todas categorias · Todos setores",
      periodo: `${formatarDataBr(dataInicio)} – ${formatarDataBr(dataFim)}`,
      geradoEm: new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }),
    };

    // TODO: substituir por chamada real à API de geração de relatório
    setRelatoriosGerados((atual) => [novoRelatorio, ...atual]);
  }

  function handleGerarRelatorioChamado(buscaChamado) {
    const ehId = /^#?\d+$/.test(buscaChamado);
    const novoRelatorio = {
      id: proximoIdRelatorio(relatoriosGerados),
      modelo: "Relatório de Chamado Específico",
      filtros: ehId ? `Chamado #${buscaChamado.replace("#", "")}` : `Chamado – ${buscaChamado}`,
      periodo: "—",
      geradoEm: new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }),
    };

    // TODO: substituir por busca real do chamado (por ID ou título) e geração via API
    setRelatoriosGerados((atual) => [novoRelatorio, ...atual]);
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-slate-50 font-sans font-light text-slate-800">
      {/* Camadas decorativas de fundo — isoladas num wrapper com overflow-hidden
          próprio, para não quebrar o position: sticky do menu lateral */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-green-300/30 to-emerald-500/10 blur-3xl" />
        <div className="absolute right-40 top-10 h-24 w-24 rounded-full border-4 border-emerald-200/40" />
        <div className="absolute bottom-0 left-64 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-200/20 to-green-300/10 blur-3xl" />
        <div
          className="absolute bottom-10 right-1/3 h-24 w-24 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(circle, #16a34a 1.5px, transparent 1.5px)",
            backgroundSize: "12px 12px",
          }}
        />

        {/* Camada decorativa de fundo — base, espelhando o topo */}
        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-green-300/30 to-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-gradient-to-tl from-emerald-400/25 to-green-200/10 blur-3xl" />
        <div className="absolute bottom-16 left-1/3 h-20 w-20 rounded-full border-4 border-emerald-200/40" />
        <div
          className="absolute bottom-24 left-1/2 h-24 w-24 -translate-x-1/2 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(circle, #16a34a 1.5px, transparent 1.5px)",
            backgroundSize: "12px 12px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-emerald-100/40 to-transparent" />
      </div>

      <MenuSuperior
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        userName="Ana Souza"
        userRole="Gestor"
        notificationCount={3}
      />

      <div className="relative z-10 flex flex-1">
        <MenuLateral
          activeHref="/relatorios"
          menuOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          sidebarCollapsed={sidebarCollapsed}
        />

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

            <FiltrosPanel onGerarRelatorio={handleGerarRelatorio} onGerarRelatorioChamado={handleGerarRelatorioChamado} />

            <div>
              <p className="mb-3 text-base font-medium text-slate-800">Resumo do Período</p>
              <div className="flex flex-wrap gap-4">
                {resumo.map((item) => (
                  <ResumoCard key={item.label} item={item} />
                ))}
              </div>
            </div>

            <RelatoriosDisponiveisPanel />

            <RelatoriosGeradosPanel relatoriosGerados={relatoriosGerados} />
          </div>
        </section>
      </div>
    </main>
  );
}
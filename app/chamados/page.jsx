"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Archive,
  Ban,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CirclePlus,
  Download,
  DoorOpen,
  Droplets,
  Eye,
  FileText,
  Folder,
  Hammer,
  Laptop,
  MapPin,
  Menu,
  MessageSquareText,
  LogOut,
  Paperclip,
  Pause,
  PlusSquare,
  RefreshCw,
  Search,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Settings2,
  SlidersHorizontal,
  UserRound,
  Wrench,
  X,
  Zap,
  Package,
} from "lucide-react";
import "./chamados.css";

// Configuração visual dos status.
const statusConfig = {
  Novo: { color: "#18b93b", soft: "#eaf9ee" },
  Pendente: { color: "#f59e0b", soft: "#fff6df" },
  "Em análise": { color: "#f59e0b", soft: "#fff6df" },
  "Em atendimento": { color: "#1671e8", soft: "#eaf3ff" },
  Suspenso: { color: "#e7a10b", soft: "#fff7df" },
  Concluído: { color: "#12b83b", soft: "#e8f9ed" },
  Cancelado: { color: "#ef1b24", soft: "#ffebec" },
};

const cancellableStatuses = ["Novo", "Pendente", "Em análise"];
const statusOptions = ["Todos", ...Object.keys(statusConfig)];

// Categorias oficiais do SIGEM.
const categoryConfig = {
  Tecnologia: Laptop,
  Elétrica: Zap,
  Hidráulica: Droplets,
  Climatização: Snowflake,
  "Estrutura e Manutenção": DoorOpen,
  Limpeza: Sparkles,
  Segurança: ShieldCheck,
  Patrimônio: Package,
  "Serviços Gerais": Hammer,
};

const categoryOptions = [
  "Todas",
  ...Object.keys(categoryConfig),
];

// Eventos exibidos no histórico.
const historyCatalog = {
  created: { label: "Chamado criado", icon: PlusSquare, color: "#16b83e", date: "26/09/2026 • 09:15" },
  viewed: { label: "Visualizado pelo gestor", icon: Eye, color: "#1671e8", date: "26/09/2026 • 09:22" },
  analysis: { label: "Em análise", icon: ClipboardList, color: "#f59e0b", date: "26/09/2026 • 09:35" },
  service: { label: "Em atendimento", icon: Wrench, color: "#1671e8", date: "26/09/2026 • 10:20" },
  suspended: { label: "Suspenso", icon: Pause, color: "#e7a10b", date: "27/09/2026 • 08:40" },
  done: { label: "Concluído pelo gestor", icon: CheckCircle2, color: "#16b83e", date: "26/09/2026 • 16:10" },
  canceled: { label: "Cancelado", icon: Ban, color: "#ef1b24", date: "27/09/2026 • 11:30" },
};

// Dados temporários dos chamados.
const tickets = [
  {
    id: "05231", title: "Computador não liga", status: "Concluído",
    updated: "há 1 dia", date: "26/09/2026 • 09:40",
    description: "Ao tentar ligar o computador, ele não inicia o sistema. A tela permanece preta e o LED da fonte não acende.",
    location: ["Unidade: Campus Central", "Bloco: B", "Sala: 204"],
    category: "Tecnologia",
    note: "Visita técnica realizada. Foi identificado defeito na fonte de alimentação. A peça de reposição foi solicitada.",
    solution: "Fonte de alimentação substituída. Equipamento testado e funcionamento normal confirmado.",
    history: ["created", "viewed", "analysis", "service", "done"],
  },
  {
    id: "09865", title: "Não consigo utilizar o projetor", status: "Novo",
    updated: "há poucos segundos", date: "30/09/2026 • 09:15",
    description: "O projetor liga, mas não reconhece o cabo conectado ao notebook.",
    location: ["Unidade: Campus Central", "Bloco: A", "Sala: 102"],
    category: "Tecnologia", history: ["created"],
  },
  {
    id: "03476", title: "Porta quebrada", status: "Pendente",
    updated: "há 1 dia", date: "29/09/2026 • 14:32",
    description: "A fechadura da porta está solta e não permite o fechamento correto.",
    location: ["Unidade: Campus Central", "Bloco: C", "Sala: 12"],
    category: "Estrutura e Manutenção", history: ["created", "viewed"],
  },
  {
    id: "06105", title: "Impressora não imprime", status: "Em análise",
    updated: "há 18 minutos", date: "28/09/2026 • 10:05",
    description: "A impressora recebe os documentos, mas permanece na fila de impressão.",
    location: ["Unidade: Administrativa", "Bloco: B", "Sala: 08"],
    category: "Tecnologia",
    note: "Chamado encaminhado para análise técnica.",
    history: ["created", "viewed", "analysis"],
  },
  {
    id: "07318", title: "Ar-condicionado com ruído", status: "Em atendimento",
    updated: "há 40 minutos", date: "27/09/2026 • 11:20",
    description: "O equipamento apresenta ruído forte durante o funcionamento.",
    location: ["Unidade: Campus Central", "Bloco: D", "Sala: 301"],
    category: "Climatização",
    note: "Técnico realizou visita ao local.",
    serviceStarted: "26/09/2026 • 10:20",
    history: ["created", "viewed", "analysis", "service"],
  },
  {
    id: "08742", title: "Bebedouro sem refrigeração", status: "Suspenso",
    updated: "há 3 horas", date: "27/09/2026 • 08:10",
    description: "O bebedouro está liberando água, porém sem refrigeração.",
    location: ["Unidade: Campus Norte", "Bloco: A", "Corredor térreo"],
    category: "Hidráulica",
    suspensionReason: "Aguardando chegada da peça.",
    note: "Fornecedor informou entrega em até 5 dias úteis.",
    history: ["created", "viewed", "analysis", "service", "suspended"],
  },
  {
    id: "04120", title: "Tela com manchas", status: "Cancelado",
    updated: "há 3 dias", date: "24/09/2026 • 08:50",
    description: "O monitor apresenta manchas escuras em diferentes áreas da tela.",
    location: ["Unidade: Campus Sul", "Bloco: A", "Sala: 14"],
    category: "Tecnologia",
    cancellationReason: "Solicitação cancelada pelo solicitante.",
    history: ["created", "viewed", "canceled"],
  },
  {
    id: "06482", title: "Tomada soltando faíscas", status: "Em atendimento",
    updated: "há 12 minutos", date: "30/09/2026 • 08:42",
    description: "A tomada próxima à entrada apresenta faíscas ao conectar equipamentos.",
    location: ["Unidade: Campus Central", "Bloco: E", "Sala: 105"],
    category: "Elétrica",
    note: "Circuito isolado e eletricista direcionado ao local.",
    serviceStarted: "30/09/2026 • 08:55",
    history: ["created", "viewed", "analysis", "service"],
  },
  {
    id: "07594", title: "Corredor precisa de limpeza", status: "Pendente",
    updated: "há 35 minutos", date: "30/09/2026 • 07:50",
    description: "Houve derramamento de líquido no corredor próximo aos laboratórios.",
    location: ["Unidade: Campus Norte", "Bloco: C", "Corredor do 1º andar"],
    category: "Limpeza",
    history: ["created", "viewed"],
  },
  {
    id: "08317", title: "Câmera sem imagem", status: "Em análise",
    updated: "há 2 horas", date: "29/09/2026 • 16:10",
    description: "A câmera de acesso principal não apresenta imagem no monitoramento.",
    location: ["Unidade: Campus Sul", "Portaria principal"],
    category: "Segurança",
    note: "Equipe verificando alimentação e comunicação da câmera.",
    history: ["created", "viewed", "analysis"],
  },
  {
    id: "09126", title: "Cadeira patrimonial danificada", status: "Novo",
    updated: "há 8 minutos", date: "30/09/2026 • 10:02",
    description: "A cadeira identificada pelo patrimônio está com a base quebrada.",
    location: ["Unidade: Administrativa", "Bloco: A", "Sala: 06"],
    category: "Patrimônio",
    history: ["created"],
  },
  {
    id: "04673", title: "Montagem de quadro informativo", status: "Suspenso",
    updated: "há 4 horas", date: "28/09/2026 • 13:25",
    description: "É necessária a instalação de um quadro informativo na recepção.",
    location: ["Unidade: Campus Central", "Recepção"],
    category: "Serviços Gerais",
    suspensionReason: "Aguardando definição do local de instalação.",
    note: "A administração fará a marcação definitiva na parede.",
    history: ["created", "viewed", "analysis", "suspended"],
  },
];

// Bloco reutilizável dos detalhes.
function InfoBlock({ icon: Icon, title, children, tone = "green" }) {
  return (
    <section className={`ticket-info ticket-info--${tone}`}>
      <h3><span><Icon size={20} /></span>{title}</h3>
      <div className="ticket-info-content">{children}</div>
    </section>
  );
}

// Linha do tempo progressiva.
function History({ items }) {
  return (
    <section className="history-panel">
      <h3>Histórico</h3>
      <div className="history-list">
        {items.map((key) => {
          const event = historyCatalog[key];
          const Icon = event.icon;
          return (
            <div className="history-item" key={key}>
              <span className="history-icon" style={{ color: event.color, background: `${event.color}12` }}>
                <Icon size={20} />
              </span>
              <strong>{event.label}</strong>
              <time>{event.date}</time>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TicketDetails({ ticket, onCancel }) {
  const CategoryIcon = categoryConfig[ticket.category] || Folder;

  return (
    <div className="ticket-details">
      <div className="details-grid">
        <div className="details-column">
          <InfoBlock icon={FileText} title="Descrição">
            <p>{ticket.description}</p>
          </InfoBlock>
          <InfoBlock icon={MapPin} title="Localização" tone="purple">
            {ticket.location.map((line) => <p key={line}>{line}</p>)}
          </InfoBlock>
          <InfoBlock icon={CategoryIcon} title="Categoria" tone="orange">
            <p>{ticket.category}</p>
          </InfoBlock>
        </div>

        <div className="details-column">
          <InfoBlock icon={Paperclip} title="Anexos" tone="blue">
            <div className="attachment">
              <FileText size={22} color="#ef222b" />
              <span><strong>Foto.pdf</strong><small>154 KB</small></span>
              <button type="button" aria-label="Baixar anexo"><Download size={19} /></button>
            </div>
          </InfoBlock>

          {ticket.note && (
            <InfoBlock icon={MessageSquareText} title={ticket.status === "Suspenso" ? "Observações" : "Observações do Gestor"} tone="blue">
              <p>{ticket.note}</p>
            </InfoBlock>
          )}

          {ticket.serviceStarted && (
            <InfoBlock icon={Settings2} title="Atendimento" tone="blue">
              <p><strong>Iniciado em:</strong><br />{ticket.serviceStarted}</p>
            </InfoBlock>
          )}

          {ticket.suspensionReason && (
            <InfoBlock icon={AlertTriangle} title="Motivo da suspensão" tone="orange">
              <p>{ticket.suspensionReason}</p>
            </InfoBlock>
          )}

          {ticket.solution && (
            <InfoBlock icon={CheckCircle2} title="Solução Aplicada">
              <p>{ticket.solution}</p>
            </InfoBlock>
          )}

          {ticket.cancellationReason && (
            <InfoBlock icon={Ban} title="Motivo do cancelamento" tone="red">
              <p>{ticket.cancellationReason}</p>
            </InfoBlock>
          )}
        </div>
      </div>

      <div className="history-column">
        <History items={ticket.history} />
        {ticket.status === "Concluído" && (
          <div className="ticket-actions">
            <button className="action-finish" type="button"><Check size={21} />Finalizar chamado</button>
            <button className="action-unresolved" type="button"><AlertTriangle size={21} />Problema não resolvido</button>
          </div>
        )}
        {cancellableStatuses.includes(ticket.status) && (
          <button className="action-cancel action-cancel--details" type="button" onClick={onCancel}>
            <Ban size={20} />Cancelar chamado
          </button>
        )}
      </div>
    </div>
  );
}

export default function ChamadosPage() {
  // Estado da interface e dos filtros.
  const [openId, setOpenId] = useState("05231");
  const [menuOpen, setMenuOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [draftFrom, setDraftFrom] = useState("");
  const [draftTo, setDraftTo] = useState("");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [canceledIds, setCanceledIds] = useState([]);
  const FilterCategoryIcon = categoryConfig[categoryFilter] || Folder;

  // Aplica busca, status, categoria e período.
  const displayedTickets = tickets
    .map((ticket) => (
      canceledIds.includes(ticket.id)
        ? { ...ticket, status: "Cancelado", updated: "há poucos segundos", cancellationReason: "Solicitação cancelada pelo solicitante.", history: ["created", "viewed", "canceled"] }
        : ticket
    ))
    .filter((ticket) => statusFilter === "Todos" || ticket.status === statusFilter)
    .filter((ticket) => categoryFilter === "Todas" || ticket.category === categoryFilter)
    .filter((ticket) => {
      const [day, month, year] = ticket.date.slice(0, 10).split("/");
      const ticketDate = `${year}-${month}-${day}`;
      return (!dateFrom || ticketDate >= dateFrom) && (!dateTo || ticketDate <= dateTo);
    })
    .filter((ticket) => {
      const query = searchTerm.trim().toLocaleLowerCase("pt-BR");
      if (!query) return true;
      return `${ticket.id} ${ticket.title} ${ticket.description} ${ticket.status}`
        .toLocaleLowerCase("pt-BR")
        .includes(query);
    });

  // Cancela apenas chamados ainda não atendidos.
  function cancelTicket(ticketId) {
    setCanceledIds((ids) => ids.includes(ticketId) ? ids : [...ids, ticketId]);
    setOpenId("");
  }

  // Exibe o período em formato brasileiro.
  function formatDate(value) {
    if (!value) return "";
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  }

  function openPeriod() {
    setDraftFrom(dateFrom);
    setDraftTo(dateTo);
    setPeriodOpen((open) => !open);
  }

  function applyPeriod() {
    setDateFrom(draftFrom);
    setDateTo(draftTo);
    setPeriodOpen(false);
  }

  function clearPeriod() {
    setDraftFrom("");
    setDraftTo("");
    setDateFrom("");
    setDateTo("");
    setPeriodOpen(false);
  }

  // Limpa todos os filtros da listagem.
  function clearAllFilters() {
    setStatusFilter("Todos");
    setCategoryFilter("Todas");
    setSearchTerm("");
    clearPeriod();
  }

  const periodLabel = dateFrom || dateTo
    ? `${formatDate(dateFrom) || "Início"} – ${formatDate(dateTo) || "Hoje"}`
    : "Todos";

  return (
    <main className="tickets-page">
      <header className="app-topbar">
        <div className="topbar-brand">
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <Image src="/sigem-logo.png" alt="SIGEM" width={1536} height={1536} priority />
        </div>

        <div className="topbar-actions">
          <button className="notification-button" type="button" aria-label="Notificações">
            <Bell size={20} />
            <i />
          </button>
          <button className="profile-button" type="button">
            <span><UserRound size={19} /></span>
            <strong>Solicitante</strong>
            <ChevronDown size={17} />
          </button>
        </div>
      </header>

      <div className="app-layout">
        {menuOpen && <button className="sidebar-overlay" type="button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}

        <aside className={`app-sidebar ${menuOpen ? "app-sidebar--open" : ""}`}>
          <nav className="sidebar-nav" aria-label="Menu principal">
            <button type="button"><CirclePlus size={20} /><span>Abrir chamado</span></button>
            <button className="active" type="button"><Search size={20} /><span>Acompanhar chamados</span></button>
            <button type="button"><Archive size={20} /><span>Chamados finalizados</span></button>
          </nav>
          <Link className="logout-button" href="/login"><LogOut size={20} /><span>Sair</span></Link>
        </aside>

        <section className="tickets-shell">
          <header className="tickets-heading">
            <h1>Acompanhar chamados</h1>
            <p>Acompanhe o andamento dos seus chamados.</p>
          </header>

          <div className="search-panel">
            <label className="ticket-search">
              <Search size={21} />
              <input
                placeholder="Pesquisar chamado por ID, título ou descrição..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
          </div>

          <div className="tickets-toolbar">
            <div className="ticket-controls">
              <div className="filter-group">
                <span>Status</span>
                <label className="ticket-filter">
                  <SlidersHorizontal size={18} />
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filtrar por status">
                    {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </label>
              </div>

              <div className="filter-group">
                <span>Categoria</span>
                <label className="ticket-filter ticket-filter--category">
                  <FilterCategoryIcon size={18} />
                  <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filtrar por categoria">
                    {categoryOptions.map((category) => <option key={category} value={category}>{category}</option>)}
                  </select>
                </label>
              </div>

              <div className="filter-group">
                <span>Período</span>
                <div className="period-filter">
                  <button
                    className={`period-trigger ${dateFrom || dateTo ? "period-trigger--active" : ""}`}
                    type="button"
                    onClick={openPeriod}
                    aria-expanded={periodOpen}
                    aria-haspopup="dialog"
                  >
                    <CalendarDays size={18} />
                    <span>{periodLabel}</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>

              <button className="clear-filters" type="button" onClick={clearAllFilters}>
                <RefreshCw size={18} />
                Limpar filtros
              </button>
            </div>

            {periodOpen && (
              <section className="period-popover" role="dialog" aria-label="Selecionar período">
                <header>
                  <div>
                    <strong>Selecionar período</strong>
                    <span>Escolha uma data inicial e final.</span>
                  </div>
                  <button type="button" onClick={() => setPeriodOpen(false)} aria-label="Fechar período">
                    <X size={18} />
                  </button>
                </header>

                <div className="period-fields">
                  <label>
                    <span>De</span>
                    <input
                      type="date"
                      value={draftFrom}
                      onChange={(event) => setDraftFrom(event.target.value)}
                      onInput={(event) => setDraftFrom(event.currentTarget.value)}
                      aria-label="Data inicial"
                    />
                  </label>
                  <label>
                    <span>Até</span>
                    <input
                      type="date"
                      value={draftTo}
                      min={draftFrom}
                      onChange={(event) => setDraftTo(event.target.value)}
                      onInput={(event) => setDraftTo(event.currentTarget.value)}
                      aria-label="Data final"
                    />
                  </label>
                </div>

                <footer>
                  <button className="period-clear" type="button" onClick={clearPeriod}>Limpar</button>
                  <button className="period-apply" type="button" onClick={applyPeriod}>Aplicar período</button>
                </footer>
              </section>
            )}
          </div>

          <div className="tickets-count">
            <span><ClipboardList size={19} /></span>
            <strong>Exibindo {displayedTickets.length} chamados</strong>
          </div>

          <div className="tickets-list">
            {displayedTickets.map((ticket) => {
              const isOpen = openId === ticket.id;
              const config = statusConfig[ticket.status];
              const SummaryCategoryIcon = categoryConfig[ticket.category] || Folder;
              return (
                <article
                  className={`ticket-card ${isOpen ? "ticket-card--open" : ""} ${ticket.status === "Concluído" ? "ticket-card--completed" : ""}`}
                  key={ticket.id}
                >
                  <div
                    className="ticket-summary"
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpenId(isOpen ? "" : ticket.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setOpenId(isOpen ? "" : ticket.id);
                      }
                    }}
                    aria-expanded={isOpen}
                  >
                    <span className="ticket-identification">
                      <span>ID: {ticket.id} {ticket.status === "Novo" && <em>NOVO</em>}</span>
                      <strong>{ticket.title}</strong>
                      <small>{ticket.description}</small>
                      <span className="ticket-category">
                        <SummaryCategoryIcon size={15} />
                        {ticket.category}
                      </span>
                    </span>
                    <span className="ticket-status" style={{ "--status": config.color, "--soft": config.soft }}>
                      <i />{ticket.status}
                    </span>
                    <span className="ticket-updated"><RefreshCw size={18} />Atualizado {ticket.updated}</span>
                    <span className="ticket-date"><CalendarDays size={19} />{ticket.date}</span>
                    <ChevronDown className="ticket-chevron" size={22} />
                    {!isOpen && ticket.status === "Concluído" && (
                      <span className="ticket-summary-actions">
                        <button className="action-finish" type="button" onClick={(event) => event.stopPropagation()}>
                          <Check size={19} />Finalizar chamado
                        </button>
                        <button className="action-unresolved" type="button" onClick={(event) => event.stopPropagation()}>
                          <AlertTriangle size={19} />Problema não resolvido
                        </button>
                      </span>
                    )}
                  </div>
                  {isOpen && <TicketDetails ticket={ticket} onCancel={() => cancelTicket(ticket.id)} />}
                </article>
              );
            })}
            {displayedTickets.length === 0 && (
              <div className="tickets-empty">
                <Search size={28} />
                <strong>Nenhum chamado encontrado</strong>
                <span>Tente alterar o filtro ou o termo pesquisado.</span>
              </div>
            )}
          </div>

          <footer className="tickets-footer">
            <p>Mostrando {displayedTickets.length} de {tickets.length} chamados</p>
            <nav aria-label="Paginação">
              <button type="button"><ChevronLeft size={18} /></button>
              <button className="active" type="button">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button"><ChevronRight size={18} /></button>
            </nav>
            <button className="page-size" type="button">10 por página <ChevronDown size={17} /></button>
          </footer>
        </section>
      </div>
    </main>
  );
}

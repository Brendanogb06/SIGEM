"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Archive,
  Bell,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CirclePlus,
  ClipboardList,
  House,
  LogOut,
  Megaphone,
  Menu,
  MessageSquareText,
  Search,
  UserRound,
  X,
  Zap,
  AlertTriangle,
} from "lucide-react";
import "../chamados/chamados.css";
import "./inicio.css";

// Dados de exemplo da tela inicial.
const activeRequests = [
  {
    title: "Ar-condicionado não liga",
    meta: "Climatização • Bloco A • Sala 205",
    date: "Aberta em 20/05/2024",
    status: "Em atendimento",
    tone: "orange",
    icon: Zap,
  },
  {
    title: "Porta da sala com defeito",
    meta: "Estrutura e Manutenção • Bloco B • Sala 104",
    date: "Aberta em 18/05/2024",
    status: "Pendente",
    tone: "blue",
    icon: Building2,
  },
];

const notices = [
  {
    title: "Manutenção preventiva no sistema elétrico",
    description: "No dia 25/05 haverá manutenção no sistema elétrico do Bloco B.",
    date: "22/05/2024",
    icon: Megaphone,
  },
  {
    title: "Interdição parcial - Laboratório 03",
    description: "O Laboratório 03 estará interditado para manutenção do piso.",
    date: "21/05/2024",
    icon: AlertTriangle,
  },
];

const history = [
  { title: "Troca de lâmpada", meta: "Elétrica • Bloco C • Corredor 2º andar", date: "15/05/2024" },
  { title: "Vazamento na pia do banheiro", meta: "Hidráulica • Bloco A • Sala 12", date: "12/05/2024" },
  { title: "Cadeira quebrada", meta: "Patrimônio • Bloco B • Sala 201", date: "02/05/2024" },
];

const faqs = [
  "Como abrir uma solicitação?",
  "Qual o prazo de atendimento?",
  "Posso acompanhar a solicitação?",
  "Como cancelar uma solicitação?",
  "Posso anexar fotos ou documentos?",
];

function SectionCard({ title, children, href = "/chamados" }) {
  return (
    <section className="home-section-card">
      <header className="home-section-header">
        <h2>{title}</h2>
        <Link className="home-see-all" href={href}>
          Ver todos <ChevronRight size={14} />
        </Link>
      </header>
      {children}
    </section>
  );
}

export default function InicioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  function toggleMenu() {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches) {
      setMenuOpen((current) => !current);
      return;
    }

    setSidebarCollapsed((current) => !current);
  }

  return (
    <main className="tickets-page">
      <header className="app-topbar">
        <div className="topbar-brand">
          <button className="menu-button" type="button" aria-label={sidebarCollapsed ? "Ampliar menu" : "Minimizar menu"} onClick={toggleMenu}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
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

      <div className={`app-layout ${sidebarCollapsed ? "app-layout--collapsed" : ""}`}>
        {menuOpen && <button className="sidebar-overlay" type="button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}

        <aside className={`app-sidebar ${menuOpen ? "app-sidebar--open" : ""} ${sidebarCollapsed ? "app-sidebar--collapsed" : ""}`}>
          <nav className="sidebar-nav" aria-label="Menu principal">
            <Link className="active" href="/inicio"><House size={20} /><span>Início</span></Link>
            <Link href="/abrir-chamado"><CirclePlus size={20} /><span>Abrir chamado</span></Link>
            <Link href="/chamados"><Search size={20} /><span>Acompanhar chamados</span></Link>
            <button type="button"><Archive size={20} /><span>Chamados finalizados</span></button>
          </nav>
          <Link className="logout-button" href="/login"><LogOut size={20} /><span>Sair</span></Link>
        </aside>

        <section className="home-shell">
          <div className="home-content">
            <section className="home-hero">
              <div>
                <h1>
                  Olá, Brenda!
                  <span className="home-greeting-emoji" aria-hidden="true">👋</span>
                </h1>
                <p>Bem-vinda ao SIGEM.</p>
                <small>Escolha uma opção abaixo para registrar ou acompanhar suas solicitações com facilidade.</small>
              </div>
            </section>

            <div className="home-quick-grid">
              <Link className="home-action-card" href="/abrir-chamado">
                <span className="home-action-icon"><CirclePlus size={36} /></span>
                <span>
                  <strong>Nova solicitação</strong>
                  <small>Informe o que precisa e nossa equipe cuidará do resto para você.</small>
                </span>
                <ChevronRight size={22} />
              </Link>

              <section className="home-status-card">
                <span><MessageSquareText size={30} /></span>
                <div>
                  <small>Você possui</small>
                  <strong>2 solicitações</strong>
                  <small>em andamento.</small>
                </div>
                <ClipboardList size={58} className="status-illustration" />
              </section>
            </div>

            <div className="home-dashboard-grid">
              <SectionCard title="Minhas solicitações em andamento" href="/chamados">
                <div className="home-list">
                  {activeRequests.map((request) => {
                    const Icon = request.icon;
                    return (
                      <Link className="home-list-item" href="/chamados" key={request.title}>
                        <span className={`home-list-icon ${request.tone}`}><Icon size={24} /></span>
                        <span className="home-list-text">
                          <strong>{request.title}</strong>
                          <small>{request.meta}</small>
                          <em>{request.date}</em>
                        </span>
                        <span className={`home-status-pill ${request.tone}`}>{request.status}</span>
                        <ChevronRight size={18} />
                      </Link>
                    );
                  })}
                </div>
              </SectionCard>

              <SectionCard title="Comunicados" href="/chamados">
                <div className="home-list">
                  {notices.map((notice) => {
                    const Icon = notice.icon;
                    return (
                      <article className="home-list-item notice" key={notice.title}>
                        <span className="home-list-icon green"><Icon size={24} /></span>
                        <span className="home-list-text">
                          <strong>{notice.title}</strong>
                          <small>{notice.description}</small>
                          <em>{notice.date}</em>
                        </span>
                      </article>
                    );
                  })}
                </div>
              </SectionCard>

              <SectionCard title="Histórico recente" href="/chamados">
                <div className="home-list compact">
                  {history.map((item) => (
                    <Link className="home-list-item" href="/chamados" key={item.title}>
                      <span className="home-check-icon"><CheckCircle2 size={18} /></span>
                      <span className="home-list-text">
                        <strong>{item.title}</strong>
                        <small>{item.meta}</small>
                      </span>
                      <span className="home-status-pill green">Concluído</span>
                      <time>{item.date}</time>
                      <ChevronRight size={18} />
                    </Link>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Perguntas frequentes" href="/chamados">
                <div className="home-faq-list">
                  {faqs.map((faq) => (
                    <button type="button" key={faq}>
                      <CircleHelp size={17} />
                      <span>{faq}</span>
                      <ChevronRight size={17} />
                    </button>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

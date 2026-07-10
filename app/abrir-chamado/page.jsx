"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Archive,
  Bell,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  CirclePlus,
  ClipboardList,
  CloudUpload,
  DoorOpen,
  Droplets,
  FileText,
  Folder,
  Hammer,
  Laptop,
  LogOut,
  MapPin,
  Menu,
  Package,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Tag,
  Ticket,
  Trash2,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import "../chamados/chamados.css";
import "./abrir-chamado.css";

// Categorias oficiais do SIGEM.
const categories = [
  { name: "Tecnologia", icon: Laptop },
  { name: "Elétrica", icon: Zap },
  { name: "Hidráulica", icon: Droplets },
  { name: "Climatização", icon: Snowflake },
  { name: "Estrutura e Manutenção", icon: DoorOpen },
  { name: "Limpeza", icon: Sparkles },
  { name: "Segurança", icon: ShieldCheck },
  { name: "Patrimônio", icon: Package },
  { name: "Serviços Gerais", icon: Hammer },
];

const units = ["Campus Central", "Campus Norte", "Campus Sul", "Administrativa"];
const blocks = ["Bloco A", "Bloco B", "Bloco C", "Bloco D", "Portaria", "Recepção", "Laboratório"];
const rooms = ["Sala 102", "Sala 204", "Sala 301", "Corredor térreo", "Secretaria", "Laboratório 1"];

const steps = [
  "Informações do chamado",
  "Localização",
  "Finalizar",
];

function Stepper({ currentStep }) {
  return (
    <ol className="open-stepper" aria-label="Etapas para abrir chamado">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isDone = currentStep > stepNumber;

        return (
          <li className={isActive ? "active" : isDone ? "done" : ""} key={step}>
            <span>{isDone ? <Check size={16} /> : stepNumber}</span>
            <strong>{step}</strong>
          </li>
        );
      })}
    </ol>
  );
}

function FieldLabel({ children, required = false }) {
  return (
    <label className="field-label">
      {children} {required && <span>*</span>}
    </label>
  );
}

function SelectField({ icon: Icon, value, onChange, placeholder, options, label }) {
  return (
    <div className="select-wrap">
      {Icon && <Icon size={20} />}
      <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown size={19} />
    </div>
  );
}

function SectionCard({ icon: Icon, title, subtitle, children }) {
  return (
    <section className="form-section">
      <header>
        <span><Icon size={21} /></span>
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

function ConfirmModal({ type, onClose, onConfirm }) {
  const isCancel = type === "cancel";
  const isSuccess = type === "success";

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="confirm-modal" role="dialog" aria-modal="true" aria-label={isCancel ? "Cancelar abertura" : isSuccess ? "Chamado aberto" : "Confirmar abertura"}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar modal">
          <X size={20} />
        </button>
        <span className={isCancel ? "modal-icon modal-icon--danger" : "modal-icon"}>
          {isCancel ? <AlertTriangle size={34} /> : isSuccess ? <CheckCircle2 size={36} /> : <CalendarCheck size={34} />}
        </span>
        <h2>{isCancel ? "Cancelar abertura do chamado?" : isSuccess ? "Chamado aberto com sucesso!" : "Confirmar abertura do chamado?"}</h2>
        <p>
          {isCancel
            ? "As informações preenchidas serão perdidas."
            : "Sua solicitação será registrada e encaminhada para a equipe responsável."}
        </p>
        <footer>
          <button className="btn-secondary" type="button" onClick={onClose}>
            {isCancel ? "Continuar editando" : "Cancelar"}
          </button>
          <button className={isCancel ? "btn-danger" : "btn-primary"} type="button" onClick={onConfirm}>
            {isCancel ? "Sim, cancelar" : "Confirmar"}
          </button>
        </footer>
      </section>
    </div>
  );
}

function SuccessModal({ onClose, onTrack }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="confirm-modal success-modal" role="dialog" aria-modal="true" aria-label="Chamado aberto com sucesso">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar modal">
          <X size={20} />
        </button>
        <span className="modal-icon">
          <CheckCircle2 size={36} />
        </span>
        <h2>Chamado aberto com sucesso!</h2>
        <p>Seu chamado foi registrado e será analisado pela equipe responsável.</p>
        <div className="modal-ticket-number">
          <small>Número do chamado</small>
          <strong>#09865</strong>
        </div>
        <footer className="confirm-modal-footer--single">
          <button className="btn-primary" type="button" onClick={onTrack}>
            Acompanhar chamados
          </button>
        </footer>
      </section>
    </div>
  );
}

export default function AbrirChamadoPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState(null);
  const [success] = useState(false);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    unit: "",
    block: "",
    room: "",
  });

  // Valida cada etapa antes de avançar.
  const canContinue = useMemo(() => {
    if (step === 1) return form.category && form.title.trim() && form.description.trim();
    if (step === 2) return form.unit && form.block && form.room;
    return true;
  }, [form, step]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleFiles(event) {
    const selected = Array.from(event.target.files || []);
    setFiles((current) => [...current, ...selected].slice(0, 5));
  }

  function removeFile(fileName) {
    setFiles((current) => current.filter((file) => file.name !== fileName));
  }

  function nextStep() {
    if (!canContinue) return;
    setStep((current) => Math.min(current + 1, 3));
  }

  function cancelFlow() {
    router.push("/chamados");
  }

  function confirmOpenTicket() {
    setModal("success");
  }

  // Mantém o mesmo menu das demais telas.
  function renderWithMenu(content) {
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
              <Link className="active" href="/abrir-chamado"><CirclePlus size={20} /><span>Abrir chamado</span></Link>
              <Link href="/chamados"><Search size={20} /><span>Acompanhar chamados</span></Link>
              <button type="button"><Archive size={20} /><span>Chamados finalizados</span></button>
            </nav>
            <Link className="logout-button" href="/login"><LogOut size={20} /><span>Sair</span></Link>
          </aside>

          {content}
        </div>
      </main>
    );
  }

  if (success) {
    return renderWithMenu(
      <section className="open-ticket-page open-ticket-page--inside success-page">
        <section className="success-card">
          <span className="success-icon"><CheckCircle2 size={56} /></span>
          <h1>Chamado aberto com sucesso!</h1>
          <p>Seu chamado foi registrado e será analisado pela equipe responsável.</p>
          <div className="ticket-number">
            <small>Número do chamado</small>
            <strong>#09865</strong>
          </div>
          <p>Você poderá acompanhar todas as atualizações em <strong>Acompanhar Chamados</strong>.</p>
          <footer>
            <Link className="btn-secondary" href="/chamados">Voltar para o início</Link>
            <Link className="btn-primary" href="/chamados">Acompanhar chamados</Link>
          </footer>
        </section>
      </section>
    );
  }

  return renderWithMenu(
    <section className="open-ticket-page open-ticket-page--inside">
      <header className="open-ticket-titlebar">
        <Link className="back-button" href="/chamados" aria-label="Voltar">
          <ArrowLeft size={24} />
        </Link>
        <span><Ticket size={25} /></span>
        <div>
          <h1>Abrir chamado</h1>
          <p>Registre uma nova solicitação para a equipe responsável.</p>
        </div>
      </header>

      <section className="open-ticket-shell">
        <header className="open-ticket-heading">
          <span><Tag size={24} /></span>
          <h2>{step === 3 ? "Revisar chamado" : "Novo chamado"}</h2>
        </header>

        <Stepper currentStep={step} />

        <div className="open-ticket-content">
          {step === 1 && (
            <SectionCard icon={ClipboardList} title="Informações do chamado">
              <div className="form-grid form-grid--one">
                <div>
                  <FieldLabel required>Categoria</FieldLabel>
                  <SelectField
                    icon={Folder}
                    label="Categoria"
                    value={form.category}
                    onChange={(value) => updateField("category", value)}
                    placeholder="Selecione uma categoria"
                    options={categories.map((category) => category.name)}
                  />
                </div>

                <div>
                  <FieldLabel required>Título</FieldLabel>
                  <input
                    className="text-field"
                    value={form.title}
                    onChange={(event) => updateField("title", event.target.value)}
                    placeholder="Digite um título para o chamado"
                  />
                </div>

                <div>
                  <FieldLabel required>Descrição</FieldLabel>
                  <textarea
                    className="text-area"
                    value={form.description}
                    onChange={(event) => updateField("description", event.target.value)}
                    placeholder="Descreva o problema com o máximo de detalhes possível..."
                  />
                </div>
              </div>

              <section className="attachments-block">
                <header>
                  <span><Paperclip size={20} /></span>
                  <div>
                    <h3>Anexos</h3>
                    <p>Adicione arquivos que possam ajudar na resolução do problema (opcional).</p>
                  </div>
                </header>

                <label className="upload-zone">
                  <CloudUpload size={38} />
                  <strong>Arraste e solte arquivos aqui</strong>
                  <span>ou</span>
                  <b>Selecionar arquivo</b>
                  <small>Formatos aceitos: JPG, PNG, PDF, DOC, DOCX (Máx. 10MB)</small>
                  <input type="file" multiple onChange={handleFiles} />
                </label>

                {files.length > 0 && (
                  <ul className="file-list">
                    {files.map((file) => (
                      <li key={`${file.name}-${file.size}`}>
                        <FileText size={18} />
                        <span>{file.name}</span>
                        <button type="button" onClick={() => removeFile(file.name)} aria-label={`Remover ${file.name}`}>
                          <Trash2 size={17} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </SectionCard>
          )}

          {step === 2 && (
            <SectionCard icon={MapPin} title="Localização" subtitle="Informe onde o problema está ocorrendo.">
              <div className="form-grid form-grid--three">
                <div>
                  <FieldLabel required>Unidade</FieldLabel>
                  <SelectField
                    label="Unidade"
                    value={form.unit}
                    onChange={(value) => updateField("unit", value)}
                    placeholder="Selecione uma unidade"
                    options={units}
                  />
                </div>

                <div>
                  <FieldLabel required>Bloco / Setor</FieldLabel>
                  <SelectField
                    label="Bloco ou setor"
                    value={form.block}
                    onChange={(value) => updateField("block", value)}
                    placeholder="Selecione um bloco ou setor"
                    options={blocks}
                  />
                </div>

                <div>
                  <FieldLabel required>Sala / Local</FieldLabel>
                  <SelectField
                    label="Sala ou local"
                    value={form.room}
                    onChange={(value) => updateField("room", value)}
                    placeholder="Selecione uma sala ou local"
                    options={rooms}
                  />
                </div>
              </div>
            </SectionCard>
          )}

          {step === 3 && (
            <SectionCard icon={CheckCircle2} title="Resumo do chamado">
              <div className="review-grid">
                <article>
                  <span>Categoria</span>
                  <strong>{form.category}</strong>
                </article>
                <article>
                  <span>Título</span>
                  <strong>{form.title}</strong>
                </article>
                <article className="review-wide">
                  <span>Descrição</span>
                  <p>{form.description}</p>
                </article>
                <article>
                  <span>Localização</span>
                  <p>{form.unit}<br />{form.block}<br />{form.room}</p>
                </article>
                <article>
                  <span>Anexos</span>
                  {files.length > 0 ? (
                    files.map((file) => <p key={file.name}>📎 {file.name}</p>)
                  ) : (
                    <p>Nenhum anexo adicionado.</p>
                  )}
                </article>
              </div>
            </SectionCard>
          )}
        </div>

        <footer className="open-ticket-actions">
          {step === 1 ? (
            <button className="btn-secondary" type="button" onClick={() => setModal("cancel")}>
              <X size={20} />Cancelar
            </button>
          ) : (
            <button className="btn-secondary" type="button" onClick={() => setStep((current) => current - 1)}>
              <ArrowLeft size={20} />Voltar
            </button>
          )}

          {step < 3 ? (
            <button className="btn-primary" type="button" onClick={nextStep} disabled={!canContinue}>
              Próximo
            </button>
          ) : (
            <button className="btn-primary" type="button" onClick={() => setModal("confirm")}>
              <Send size={20} />Abrir chamado
            </button>
          )}
        </footer>
      </section>

      {modal === "success" && (
        <SuccessModal
          onClose={() => setModal(null)}
          onTrack={() => router.push("/chamados")}
        />
      )}

      {modal && modal !== "success" && (
        <ConfirmModal
          type={modal}
          onClose={() => setModal(null)}
          onConfirm={modal === "cancel" ? cancelFlow : confirmOpenTicket}
        />
      )}
    </section>
  );
}

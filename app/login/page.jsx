"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CircleUserRound,
  UserRound,
  UserRoundCog,
  X,
} from "lucide-react";
import AuthLayout, { FormField } from "@/app/components/AuthLayout";
import PasswordField from "@/app/components/PasswordField";

export default function LoginPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("");

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") setModalOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setModalOpen(true);
  }

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          icon={UserRound}
          type="text"
          placeholder="Digite seu usuário"
          autoComplete="username"
          aria-label="Usuário"
        />
        <PasswordField autoComplete="current-password" />

        <button className="primary-button" type="submit">Entrar</button>
      </form>

      {modalOpen && (
        <div
          className="profile-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setModalOpen(false);
          }}
        >
          <section
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
          >
            <button
              className="profile-modal-close"
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Fechar"
            >
              <X size={27} strokeWidth={2.2} />
            </button>

            <CircleUserRound
              className="profile-modal-main-icon"
              size={59}
              strokeWidth={1.8}
            />

            <h2 id="profile-modal-title">Escolha o tipo de usuário</h2>
            <p className="profile-modal-description">
              Selecione a opção que melhor descreve o seu perfil para continuar.
            </p>

            <div className="profile-options">
              <button
                className={`profile-option ${selectedProfile === "gestor" ? "profile-option--selected" : ""}`}
                type="button"
                onClick={() => {
                  setSelectedProfile("gestor");
                  router.push("/chamados");
                }}
                aria-pressed={selectedProfile === "gestor"}
              >
                <UserRoundCog size={65} strokeWidth={1.6} />
                <strong>Gestor</strong>
                <span>Acesso para gestores e responsáveis.</span>
              </button>

              <button
                className={`profile-option ${selectedProfile === "solicitante" ? "profile-option--selected" : ""}`}
                type="button"
                onClick={() => {
                  setSelectedProfile("solicitante");
                  router.push("/chamados");
                }}
                aria-pressed={selectedProfile === "solicitante"}
              >
                <UserRound size={65} strokeWidth={1.6} />
                <strong>Solicitante</strong>
                <span>Acesso para realizar solicitações.</span>
              </button>
            </div>
          </section>
        </div>
      )}
    </AuthLayout>
  );
}

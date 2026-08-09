"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";

/* ---------------------------------------------------------
   SIGEM — Menu Superior
   Barra superior com botão de menu (hamburger), logo, sino
   de notificações e o dropdown de usuário (nome + cargo).
--------------------------------------------------------- */

export default function MenuSuperior({
  toggleMenu,
  userName = "Usuário",
  userRole = "Solicitante",
  notificationCount = 0,
  onLogout,
}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Fecha o dropdown ao clicar fora ou pressionar Esc
  useEffect(() => {
    if (!userMenuOpen) return;

    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setUserMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [userMenuOpen]);

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50">
      {/* Faixa superior escura */}
      <div className="h-1.5 w-full bg-slate-900" />

      <div className="flex h-[70px] w-full items-center justify-between border-b border-slate-100 bg-white px-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:px-6">
        {/* Esquerda: hamburger + logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Alternar menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <Menu className="h-5 w-5" strokeWidth={1.9} />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sigem-logo.png" alt="SIGEM" className="h-35 w-auto select-none sm:h-40" draggable={false} />
        </div>

        {/* Direita: notificações + usuário */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            aria-label={
              notificationCount > 0
                ? `Notificações (${notificationCount} não lidas)`
                : "Notificações"
            }
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <Bell className="h-5 w-5" strokeWidth={1.75} />
            {notificationCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-medium leading-none text-white ring-2 ring-white">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>

          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen((current) => !current)}
              aria-expanded={userMenuOpen}
              aria-haspopup="menu"
              className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white py-1.5 pl-1.5 pr-3 text-sm font-medium text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-600">
                {initials || <User className="h-4 w-4" strokeWidth={1.9} />}
              </span>
              <span className="hidden text-emerald-700 sm:inline">{userRole}</span>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              role="menu"
              className={`absolute right-0 top-[calc(100%+8px)] w-56 origin-top-right overflow-hidden rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg transition-all duration-150 ${
                userMenuOpen
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-1 scale-95 opacity-0"
              }`}
            >
              <div className="flex items-center gap-3 border-b border-slate-50 px-3.5 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-600">
                  {initials || <User className="h-4 w-4" strokeWidth={1.9} />}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">{userName}</p>
                  <p className="text-xs font-light text-slate-400">{userRole}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setUserMenuOpen(false)}
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-sm font-normal text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
              >
                <Settings className="h-4 w-4" strokeWidth={1.75} />
                Configurações
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-sm font-normal text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-500"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.75} />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
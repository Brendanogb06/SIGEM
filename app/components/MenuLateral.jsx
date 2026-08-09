"use client";

import Link from "next/link";
import {
  BarChart3,
  Boxes,
  Calendar,
  CheckSquare,
  ClipboardList,
  LayoutGrid,
  LogOut,
  User,
  Wrench,
} from "lucide-react";

const navItems = [
  { label: "Painel Geral", icon: LayoutGrid, href: "/InicialGestor" },
  { label: "Acompanhar Chamados", icon: ClipboardList, href: "/acompanharchamados_gestor" },
  { label: "Chamados Finalizados", icon: CheckSquare, href: "/chamados-finalizados" },
  { label: "Equipamentos", icon: Boxes, href: "/equipamentos" },
  { label: "Manutenções", icon: Wrench, href: "/manutencoes" },
  { label: "Agenda", icon: Calendar, href: "/agenda" },
  { label: "Relatórios", icon: BarChart3, href: "/relatorios" },
];

// Altura da barra superior (faixa escura de 6px + barra branca de 70px)
const HEADER_HEIGHT = 76;

export default function MenuLateral({
  activeHref = "/painel",
  menuOpen = false,
  onClose,
  sidebarCollapsed = false,
  userName,
  onLogout,
}) {
  const initials = userName
    ? userName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : null;

  return (
    <>
      {menuOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-[1px] transition-opacity lg:hidden"
        />
      )}

      <aside
        style={{ top: `${HEADER_HEIGHT}px`, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
        className={`fixed left-0 z-40 flex w-64 shrink-0 flex-col justify-between border-r border-slate-100 bg-white px-3 py-5 transition-[transform,width] duration-200 ease-out lg:sticky lg:translate-x-0 ${
          menuOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        } ${sidebarCollapsed ? "lg:w-[76px] lg:px-2" : "lg:w-64 lg:px-3"}`}
      >
        <nav className="flex-1 space-y-1 overflow-y-auto" aria-label="Menu principal">
          {navItems.map((item) => {
            const active = item.href === activeHref;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => onClose?.()}
                title={sidebarCollapsed ? item.label : undefined}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                } ${sidebarCollapsed ? "lg:justify-center lg:px-0" : ""}`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-emerald-500" />
                )}
                <item.icon size={18} strokeWidth={1.85} className="shrink-0" />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}

                {/* Tooltip flutuante quando colapsada (desktop) */}
                {sidebarCollapsed && (
                  <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-normal text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 lg:block">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sair — avatar + rótulo dentro de uma caixa com borda */}
        <div className="border-t border-slate-100 pt-3">
          {onLogout ? (
            <button
              type="button"
              onClick={onLogout}
              title={sidebarCollapsed ? "Sair" : undefined}
              className={`group relative flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 ${
                sidebarCollapsed ? "lg:justify-center lg:px-2" : ""
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-semibold text-white">
                {initials || <User className="h-4 w-4" strokeWidth={1.9} />}
              </span>
              {!sidebarCollapsed && <span>Sair</span>}
              {sidebarCollapsed && (
                <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-normal text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 lg:block">
                  Sair
                </span>
              )}
            </button>
          ) : (
            <Link
              href="/login"
              title={sidebarCollapsed ? "Sair" : undefined}
              className={`group relative flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 ${
                sidebarCollapsed ? "lg:justify-center lg:px-2" : ""
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-semibold text-white">
                {initials || <User className="h-4 w-4" strokeWidth={1.9} />}
              </span>
              {!sidebarCollapsed && <span>Sair</span>}
              {sidebarCollapsed && (
                <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-normal text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 lg:block">
                  Sair
                </span>
              )}
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
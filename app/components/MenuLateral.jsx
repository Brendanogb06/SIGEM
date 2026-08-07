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
  Wrench,
} from "lucide-react";

/* ---------------------------------------------------------
   MenuLateral
   Sidebar de navegação do painel do gestor: lista de itens
   do menu + botão "Sair". Suporta modo colapsado (desktop)
   e overlay (mobile), controlados via props pelo componente
   pai (o mesmo toggleMenu() que já existe no painel-geral).

   Props:
   - activeHref        string   -> href do item ativo (ex: "/painel")
   - menuOpen          boolean  -> abre/fecha o overlay no mobile
   - onClose           function -> fecha o overlay mobile (clique fora)
   - sidebarCollapsed  boolean  -> modo compacto no desktop (só ícones)
   - onLogout          function -> callback opcional pro botão "Sair"
                                   (se não for passado, usa Link para /login)
--------------------------------------------------------- */

const navItems = [
  { label: "Painel Geral", icon: LayoutGrid, href: "/painel" },
  { label: "Acompanhar Chamados", icon: ClipboardList, href: "/chamados" },
  { label: "Chamados Finalizados", icon: CheckSquare, href: "/chamados-finalizados" },
  { label: "Equipamentos", icon: Boxes, href: "/equipamentos" },
  { label: "Manutenções", icon: Wrench, href: "/manutencoes" },
  { label: "Agenda", icon: Calendar, href: "/agenda" },
  { label: "Relatórios", icon: BarChart3, href: "/relatorios-page" },
];

export default function MenuLateral({
  activeHref = "/painel",
  menuOpen = false,
  onClose,
  sidebarCollapsed = false,
  onLogout,
}) {
  return (
    <>
      {menuOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed z-40 flex h-[calc(100%-89px)] w-64 shrink-0 flex-col justify-between border-r border-slate-100 bg-white px-4 py-6 transition-transform lg:static lg:h-auto lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        <nav className="space-y-1" aria-label="Menu principal">
          {navItems.map((item) => {
            const active = item.href === activeHref;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-normal transition-colors ${
                  active
                    ? "bg-green-50 font-medium text-green-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <item.icon size={18} strokeWidth={1.75} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {onLogout ? (
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-normal text-slate-400 hover:bg-slate-50 hover:text-rose-500"
          >
            <LogOut size={18} strokeWidth={1.75} />
            {!sidebarCollapsed && <span>Sair</span>}
          </button>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-normal text-slate-400 hover:bg-slate-50 hover:text-rose-500"
          >
            <LogOut size={18} strokeWidth={1.75} />
            {!sidebarCollapsed && <span>Sair</span>}
          </Link>
        )}
      </aside>
    </>
  );
}
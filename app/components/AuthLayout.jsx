import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children, backHref, compact = false }) {
  return (
    <main className="auth-page">
      <div className="decor auth-ring" />
      <div className="decor glow-one" />
      <div className="decor glow-two" />
      <div className="decor wave" />
      <div className="decor dots dots-top" />
      <div className="decor dots dots-bottom" />

      <section className={`auth-card ${compact ? "auth-card--compact" : ""}`}>
        {backHref && (
          <Link className="back-button" href={backHref} aria-label="Voltar">
            <ArrowLeft size={22} />
          </Link>
        )}

        <Image
          className="brand-logo"
          src="/sigem-logo.png"
          width={1536}
          height={1536}
          alt="SIGEM"
          priority
        />

        {children}
      </section>
    </main>
  );
}

export function AuthTitle({ children, description }) {
  return (
    <header className="auth-title">
      <h1>{children}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}

export function FormField({ icon: Icon, action, ...props }) {
  return (
    <label className="form-field">
      <Icon className="field-icon" size={25} strokeWidth={1.8} />
      <input {...props} />
      {action}
    </label>
  );
}

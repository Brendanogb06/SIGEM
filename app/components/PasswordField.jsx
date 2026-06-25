"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { FormField } from "./AuthLayout";

export default function PasswordField({ placeholder = "Digite sua senha", ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <FormField
      icon={LockKeyhole}
      type={visible ? "text" : "password"}
      placeholder={placeholder}
      {...props}
      action={
        <button
          type="button"
          className="field-action"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        >
          {visible ? <EyeOff size={27} /> : <Eye size={27} />}
        </button>
      }
    />
  );
}

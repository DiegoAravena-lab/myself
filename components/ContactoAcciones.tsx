"use client";

import { useState } from "react";

interface ContactoAccionesProps {
  emailUser: string;
  emailDomain: string;
  whatsappUrl: string;
}

export function ContactoAcciones({
  emailUser,
  emailDomain,
  whatsappUrl,
}: ContactoAccionesProps) {
  const [copiado, setCopiado] = useState(false);

  const construirMail = () => `${emailUser}@${emailDomain}`;

  const handleMailClick = () => {
    window.location.href = `mailto:${construirMail()}?subject=Contacto%20desde%20Portfolio`;
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(construirMail());
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      handleMailClick();
    }
  };

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleMailClick}
        className="rounded-[4px] bg-[#2F5BEA] px-4 py-2.5 text-sm font-semibold text-[#FAFBFA] transition-colors hover:bg-[#2146C7]"
      >
        Escribir por mail
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-[4px] border border-[#2F5BEA] bg-[#FAFBFA] px-4 py-2.5 text-sm font-semibold text-[#2F5BEA] transition-colors hover:bg-[#2F5BEA] hover:text-[#FAFBFA]"
      >
        Abrir WhatsApp
      </a>

      <button
        type="button"
        onClick={handleCopyClick}
        className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] px-4 py-2.5 text-sm font-medium text-[#232B38] transition-colors hover:border-[#232B38]"
      >
        {copiado ? "Mail copiado" : "Copiar dirección de mail"}
      </button>
    </div>
  );
}


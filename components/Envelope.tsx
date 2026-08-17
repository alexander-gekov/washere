"use client";

import { useEffect, useState } from "react";

export function Envelope({
  name,
  onOpened,
}: {
  name: string;
  onOpened: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openTimer = window.setTimeout(() => setOpen(true), 700);
    const doneTimer = window.setTimeout(() => onOpened(), 1900);
    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onOpened]);

  return (
    <button
      type="button"
      className={`envelope ${open ? "is-open" : ""}`}
      onClick={() => {
        setOpen(true);
        onOpened();
      }}
      aria-label={`Open note from ${name}`}
    >
      <div className="envelope-body" />
      <div className="envelope-letter">
        <p className="font-serif text-xl italic">{name} was here.</p>
      </div>
      <div className="envelope-flap" />
      <div className="wax-seal">WH</div>
    </button>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** Accessible name of the dialog. */
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * Native <dialog> modal: focus trap, Escape to close and top-layer
 * rendering come from the browser. Clicking the backdrop also closes it.
 */
export function Modal({ open, onClose, label, children, className }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-3xl overflow-y-auto rounded-xl bg-white p-0 text-ink-900 shadow-2xl shadow-ink-950/30 backdrop:bg-ink-950/60 backdrop:backdrop-blur-sm open:animate-modal-in",
        className,
      )}
    >
      <div className="relative p-6 sm:p-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-ink-500 transition-colors hover:bg-sand hover:text-ink-950"
        >
          <Icon name="x" strokeWidth={1.5} />
          <span className="sr-only">Close</span>
        </button>
        {open && children}
      </div>
    </dialog>
  );
}

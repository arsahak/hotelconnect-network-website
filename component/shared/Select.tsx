"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export type SelectOption = { value: string; label: string; icon?: IconName };

type SelectProps = {
  /** Form field name; the value is sent through a hidden input. */
  name: string;
  options: SelectOption[];
  defaultValue?: string;
  /** id of the visible label, used as the accessible name. */
  labelledBy?: string;
  id?: string;
  className?: string;
  /** Horizontal position/width of the open list (defaults to the width of the control). */
  listClassName?: string;
  /** Space (px) between the control and the open list. */
  gap?: number;
  /** Space (px) when the list opens upwards (defaults to `gap`). */
  gapUp?: number;
};

/** Height the list needs; if there is less room below, it opens upwards. */
const LIST_SPACE = 300;

/**
 * Styled dropdown (listbox) that replaces the browser's native <select> list.
 * Keyboard: ↑ ↓ Home End to move, Enter/Space to pick, Esc to close.
 */
export function Select({
  name,
  options,
  defaultValue,
  labelledBy,
  id,
  className,
  listClassName = "left-0 w-full min-w-56",
  gap = 8,
  gapUp = gap,
}: SelectProps) {
  const autoId = useId();
  const buttonId = id ?? `${autoId}-button`;
  const listId = `${autoId}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const initialIndex = Math.max(0, options.findIndex((o) => o.value === defaultValue));
  const [selected, setSelected] = useState(initialIndex);
  const [active, setActive] = useState(initialIndex);
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const current = options[selected];

  const openList = () => {
    // Open upwards when the list would not fit below the control on screen.
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom;
      setOpenUp(below < LIST_SPACE && rect.top > below);
    }
    setActive(selected);
    setOpen(true);
  };
  const close = (focusButton = true) => {
    setOpen(false);
    if (focusButton) buttonRef.current?.focus();
  };
  const choose = (index: number) => {
    setSelected(index);
    close();
  };

  // Focus the list when it opens, and close it on a click outside.
  useEffect(() => {
    if (!open) return;
    // preventScroll: opening the list must not move the page.
    listRef.current?.focus({ preventScroll: true });
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted option visible in long lists. Only the list scrolls
  // (scrollIntoView would also scroll the whole page).
  useEffect(() => {
    const list = listRef.current;
    const option = document.getElementById(`${listId}-${active}`);
    if (!open || !list || !option) return;
    const top = option.offsetTop - list.clientTop;
    const bottom = top + option.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top - 6;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight + 6;
  }, [open, active, listId]);

  const onButtonKeyDown = (event: KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openList();
    }
  };

  const onListKeyDown = (event: KeyboardEvent) => {
    const last = options.length - 1;
    const moves: Record<string, () => void> = {
      ArrowDown: () => setActive((i) => Math.min(last, i + 1)),
      ArrowUp: () => setActive((i) => Math.max(0, i - 1)),
      Home: () => setActive(0),
      End: () => setActive(last),
      Enter: () => choose(active),
      " ": () => choose(active),
      Escape: () => close(),
      Tab: () => close(false),
    };
    const action = moves[event.key];
    if (!action) return;
    if (event.key !== "Tab") event.preventDefault();
    action();
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <input type="hidden" name={name} value={current?.value ?? ""} />

      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelledBy ? `${labelledBy} ${buttonId}` : undefined}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onButtonKeyDown}
        className="flex w-full items-center justify-between gap-2 text-left text-base font-medium text-ink-900 outline-none"
      >
        <span className="truncate">{current?.label}</span>
        <Icon
          name="chevron-down"
          size={18}
          className={cn("shrink-0 text-ink-500 transition-transform duration-200", open && "rotate-180 text-brass-600")}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelledBy}
          aria-activedescendant={`${listId}-${active}`}
          onKeyDown={onListKeyDown}
          className={cn(
            "absolute z-50 max-h-72 animate-dropdown-in overflow-y-auto overscroll-contain rounded-xl bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(27,22,17,0.45)] ring-1 ring-line outline-none [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin]",
            openUp ? "bottom-full" : "top-full",
            listClassName,
          )}
          style={openUp ? { marginBottom: gapUp } : { marginTop: gap }}
        >
          {options.map((option, i) => {
            const isSelected = i === selected;
            return (
              <li
                key={option.value}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => choose(i)}
                onMouseMove={() => setActive(i)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] transition-colors",
                  i === active ? "bg-sand" : "bg-transparent",
                  isSelected ? "font-medium text-brass-700" : "text-ink-700",
                )}
              >
                {option.icon && (
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full transition-colors",
                      isSelected ? "bg-brass-500 text-white" : "bg-brass-100 text-brass-600",
                    )}
                  >
                    <Icon name={option.icon} size={15} />
                  </span>
                )}
                <span className="flex-1 truncate">{option.label}</span>
                {isSelected && <Icon name="check" size={17} className="shrink-0 text-brass-600" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

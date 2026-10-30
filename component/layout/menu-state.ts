"use client";

import { useSyncExternalStore } from "react";

// Whether the mobile menu is open. Shared so the header can turn solid
// while the menu is open (it is transparent over the homepage photo).
let open = false;
const listeners = new Set<() => void>();

export function setMenuOpen(value: boolean) {
  if (open === value) return;
  open = value;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useMenuOpen() {
  return useSyncExternalStore(subscribe, () => open, () => false);
}

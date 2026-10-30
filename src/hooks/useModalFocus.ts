import { useLayoutEffect, useRef, type RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type=hidden])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useModalFocus<T extends HTMLDialogElement>(
  dialogRef: RefObject<T | null>,
  isOpen: boolean,
  initialFocusSelector: string,
  onCancel: () => void,
) {
  const onCancelRef = useRef(onCancel);
  const initialFocusSelectorRef = useRef(initialFocusSelector);
  onCancelRef.current = onCancel;
  initialFocusSelectorRef.current = initialFocusSelector;

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    if (!dialog.open) dialog.showModal();

    const focusInitial = () => {
      const target = dialog.querySelector<HTMLElement>(
        initialFocusSelectorRef.current,
      );
      (
        target ??
        dialog.querySelector<HTMLElement>(FOCUSABLE) ??
        dialog
      ).focus();
    };
    focusInitial();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.getClientRects().length > 0);
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (active === last || !dialog.contains(active))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    const onCancelEvent = (event: Event) => {
      event.preventDefault();
      onCancelRef.current();
    };
    dialog.addEventListener("keydown", onKeyDown);
    dialog.addEventListener("cancel", onCancelEvent);

    return () => {
      dialog.removeEventListener("keydown", onKeyDown);
      dialog.removeEventListener("cancel", onCancelEvent);
      if (dialog.open) dialog.close();
      // Never pull focus out of another dialog that is still open (for example
      // the rest screen, which stays modal while the parent panel closes).
      if (document.querySelector("dialog[open]")) return;
      const fallback = document.querySelector<HTMLElement>(".enter-key");
      const canRestoreFocus =
        previousFocus?.isConnected &&
        previousFocus !== document.body &&
        previousFocus !== document.documentElement;
      const target = canRestoreFocus ? previousFocus : fallback;
      target?.focus({ preventScroll: true });
    };
  }, [dialogRef, isOpen]);
}

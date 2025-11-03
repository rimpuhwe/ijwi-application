"use client";

import { useEffect } from "react";

/**
 * Global client-side handler to detect chunk load errors (ChunkLoadError / Cannot find module / failed chunk fetch)
 * and attempt a safe recovery by unregistering service workers, clearing caches and reloading the page.
 * This helps recover from stale/corrupted .next assets or service-worker served stale chunks.
 */
export default function ChunkErrorHandler() {
  useEffect(() => {
    let isHandling = false;

    const MAX_ATTEMPTS = 2;
    const STORAGE_KEY = "ijwi_chunk_recovery_attempts";

    function getAttempts() {
      try {
        return parseInt(sessionStorage.getItem(STORAGE_KEY) || "0", 10) || 0;
      } catch {
        return 0;
      }
    }

    function setAttempts(n: number) {
      try {
        sessionStorage.setItem(STORAGE_KEY, String(n));
      } catch {
        // ignore
      }
    }

    async function tryRecovery(reason?: unknown) {
      if (isHandling) return;
      const attempts = getAttempts();
      if (attempts >= MAX_ATTEMPTS) return;
      isHandling = true;
      console.warn("ChunkErrorHandler: attempting recovery due to", reason);

      try {
        // Unregister service workers (if any)
        if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
          try {
            const regs = await navigator.serviceWorker.getRegistrations();
            await Promise.all(regs.map((r) => r.unregister()));
            console.info("ChunkErrorHandler: service workers unregistered");
          } catch (swErr) {
            console.warn(
              "ChunkErrorHandler: failed to unregister service workers",
              swErr
            );
          }
        }

        // Clear caches
        if (typeof caches !== "undefined") {
          try {
            const keys = await caches.keys();
            await Promise.all(keys.map((k) => caches.delete(k)));
            console.info("ChunkErrorHandler: caches cleared", keys);
          } catch (cacheErr) {
            console.warn("ChunkErrorHandler: failed to clear caches", cacheErr);
          }
        }

        setAttempts(attempts + 1);

        // Reload the page to fetch fresh assets
        // Use replace to avoid polluting history
        window.location.reload();
      } finally {
        isHandling = false;
      }
    }

    function looksLikeChunkError(obj: unknown) {
      try {
        const s =
          typeof obj === "string"
            ? obj
            : (obj && (obj as any).message) ||
              (obj && (obj as any).reason) ||
              String(obj);
        if (!s) return false;
        const text = String(s);
        return (
          /Loading chunk/i.test(text) ||
          /Cannot find module/i.test(text) ||
          (/chunk/i.test(text) && /failed/i.test(text)) ||
          (/fetch/i.test(text) && /failed/i.test(text))
        );
      } catch {
        return false;
      }
    }

    function onError(ev: Event | ErrorEvent) {
      // ErrorEvent has .message
      const candidate = (ev && (ev as any).message) || ev;
      if (looksLikeChunkError(candidate)) {
        tryRecovery(candidate);
      }
    }

    function onUnhandledRejection(ev: PromiseRejectionEvent) {
      const reason = ev?.reason;
      if (looksLikeChunkError(reason)) {
        tryRecovery(reason);
      }
    }

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}

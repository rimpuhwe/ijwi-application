"use client";

import { useEffect, useState } from "react";

/**
 * ClientOnly
 * Renders children only after the component has mounted on the client.
 * Useful for avoiding SSR/client hydration mismatches for components that
 * rely on client-only hooks like `usePathname` or `window`.
 */
export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
}

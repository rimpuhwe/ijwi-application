"use client";

import React from "react";

/**
 * MainContent
 * Small wrapper for the main site content. Kept as a separate component so the
 * intro can explicitly reveal this area if desired in the future.
 */
export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}

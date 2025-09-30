// app/layout.tsx
// The root layout for the Home Health Care application. This file wraps
// every page in the application with the MUI/Emotion theme registry. Note
// that this file is a Server Component by default and does not use any
// client‑side hooks. If you need to add global providers that depend on
// client‑side APIs (e.g., authentication), you should create a separate
// provider component marked with `'use client'` and include it here.

import type { Metadata } from 'next';
import ThemeRegistry from '../theme/ThemeRegistry';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Home Health Care Management System',
  description: 'Aseer Health Cluster – King Abdullah Hospital, Bishah',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
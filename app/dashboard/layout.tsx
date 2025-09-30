// app/dashboard/layout.tsx
// This layout is used for all routes under `/dashboard`. It renders the
// persistent Header and Sidebar components and provides padding for the
// main content area. Because it renders client‑side components, it is
// marked with `'use client'`.

'use client';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* The Header sits above all content, including the sidebar */}
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Spacer to push content below the AppBar height */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
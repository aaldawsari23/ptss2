// components/layout/Sidebar.tsx
// A persistent navigation drawer that provides links to the main sections of
// the Home Health Care application. Each list item uses Next.js Link for
// client‑side routing and displays an icon from MUI icons. The drawer
// collapses on small screens via CSS (handled by MUI's responsive Drawer).

'use client';

import * as React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import RepeatIcon from '@mui/icons-material/Repeat';
import Link from 'next/link';

const drawerWidth = 240;

interface NavItem {
  text: string;
  href: string;
  icon: React.ReactElement;
}

const navItems: NavItem[] = [
  { text: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
  { text: 'Patients', href: '/dashboard/patients', icon: <PeopleIcon /> },
  { text: 'Visits', href: '/dashboard/visits', icon: <EventNoteIcon /> },
  { text: 'Referrals', href: '/dashboard/referrals', icon: <RepeatIcon /> },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      {/* Add top spacing to push navigation below the Header */}
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <Link key={item.text} href={item.href} passHref legacyBehavior>
            <ListItemButton component="a">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
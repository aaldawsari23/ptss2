// components/layout/Header.tsx
// A reusable header component that appears at the top of each page. It
// displays the application title on the left and the Aseer Health Cluster
// logo on the right. The header uses MUI's AppBar and Toolbar components
// and is sticky by default.

'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';

export default function Header() {
  return (
    <AppBar position="sticky" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Aseer Health Cluster
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/logo.png"
            alt="Aseer Health Cluster Logo"
            width={48}
            height={48}
            priority
            style={{ borderRadius: 6 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
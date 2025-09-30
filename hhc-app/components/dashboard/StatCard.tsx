// components/dashboard/StatCard.tsx
// A simple reusable card component for displaying key statistics on the
// dashboard. It accepts a title, value, and an icon to render. The card
// uses MUI's Card and Typography components and can be placed in a grid.

'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ReactElement } from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactElement;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Box sx={{ mr: 2, color: 'primary.main' }}>{icon}</Box>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div" fontWeight={600}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
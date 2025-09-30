// app/dashboard/page.tsx
// Server component for the main dashboard page. It reads the patient
// roster to compute basic statistics and renders StatCard components in a
// responsive grid layout. Additional static cards provide placeholders
// for features that will be implemented in later phases (e.g., visits
// and referrals).

import fs from 'fs/promises';
import path from 'path';
import Grid from '@mui/material/Grid';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GroupIcon from '@mui/icons-material/Group';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StatCard from '../../components/dashboard/StatCard';

export default async function DashboardPage() {
  const filePath = path.join(process.cwd(), 'patients_current.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const patients: any[] = JSON.parse(fileContents);

  const totalPatients = patients.length;
  const activePatients = patients.filter((p) => p.status === 'active').length;
  // Placeholder values; these will be replaced when visit and referral
  // functionality is implemented.
  const todaysVisits = 0;
  const pendingReferrals = 0;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Total Patients" value={totalPatients} icon={<GroupIcon fontSize="large" />} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Active Patients" value={activePatients} icon={<LocalHospitalIcon fontSize="large" />} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Today’s Visits" value={todaysVisits} icon={<EventAvailableIcon fontSize="large" />} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Pending Referrals" value={pendingReferrals} icon={<AssignmentIcon fontSize="large" />} />
      </Grid>
    </Grid>
  );
}
// app/dashboard/patients/page.tsx
// Server component for the Patients page. It reads the local JSON file
// containing the current roster of patients and passes it to the
// `PatientTable` client component for rendering. Reading the file on the
// server avoids exposing the entire dataset to the client unnecessarily.

import fs from 'fs/promises';
import path from 'path';
import PatientTable, { Patient } from '../../../../components/dashboard/patients/PatientTable';

export default async function PatientsPage() {
  const filePath = path.join(process.cwd(), 'patients_current.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const patients: Patient[] = JSON.parse(fileContents);

  return <PatientTable patients={patients} />;
}
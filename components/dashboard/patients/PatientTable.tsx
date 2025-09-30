// components/dashboard/patients/PatientTable.tsx
// A client component that renders a table of patients using MUI's DataGrid.
// It accepts an array of patient objects and defines columns to display key
// fields. Each row includes action buttons for creating a new assessment
// or writing a progress note. Clicking a button will log the MRN (or
// national ID fallback) to the console for now.

'use client';

import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// Define the TypeScript types for a single patient. Only the fields we
// reference in this table are declared explicitly; the rest are typed as
// unknown to allow flexibility when additional data becomes available.
export interface Patient {
  id: {
    hospitalMrn: string | null;
    nationalId: string;
  };
  identity: {
    nameAr?: string | null;
    nameEn?: string | null;
  };
  contact: {
    phones?: string[];
    areaId?: string;
  };
  diagnoses?: Array<{ raw?: string | null }>;
  [key: string]: unknown;
}

interface PatientTableProps {
  patients: Patient[];
}

export default function PatientTable({ patients }: PatientTableProps) {
  const handleNewAssessment = (mrn: string) => {
    console.log(`New assessment for patient MRN: ${mrn}`);
  };
  const handleProgressNote = (mrn: string) => {
    console.log(`Progress note for patient MRN: ${mrn}`);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      valueGetter: (params) => {
        const { nameEn, nameAr } = params.row.identity;
        return nameEn || nameAr || '';
      },
    },
    {
      field: 'mrn',
      headerName: 'File No.',
      width: 150,
      valueGetter: (params) => params.row.id.hospitalMrn || params.row.id.nationalId,
    },
    {
      field: 'area',
      headerName: 'Area',
      width: 150,
      valueGetter: (params) => params.row.contact?.areaId || '',
    },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 150,
      valueGetter: (params) => params.row.contact?.phones?.[0] || '',
    },
    {
      field: 'diagnosis',
      headerName: 'Diagnosis',
      flex: 1,
      valueGetter: (params) => {
        const diagnoses = params.row.diagnoses || [];
        return diagnoses.map((d: any) => d.raw).filter(Boolean).join(', ');
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any>) => {
        const mrn = params.row.id.hospitalMrn || params.row.id.nationalId;
        return (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleNewAssessment(mrn)}
            >
              New Assessment
            </Button>
              
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleProgressNote(mrn)}
            >
              Progress Note
            </Button>
          </Stack>
        );
      },
    },
  ];

  // Assign a unique id property required by DataGrid. Use the hospital MRN
  // when available; otherwise fall back to the national ID.
  const rows = React.useMemo(() => {
    return patients.map((patient) => ({
      ...patient,
      id: patient.id.hospitalMrn || patient.id.nationalId,
    }));
  }, [patients]);

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'primary.50',
          },
        }}
      />
    </div>
  );
}
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { RecognitionResult } from '@/types/recognition';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'No.', width: 80 },
  { field: 'ruleType', headerName: 'Rule Type', width: 150 },
  { field: 'module', headerName: 'Module', width: 150 },
  { field: 'uidPolNumber', headerName: 'UID/Pol. Number', width: 180 },
];

const RecognitionResultsGrid = ({ rows }: { rows: RecognitionResult[] }) => (
  <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 20]} pagination />
);

export default RecognitionResultsGrid;

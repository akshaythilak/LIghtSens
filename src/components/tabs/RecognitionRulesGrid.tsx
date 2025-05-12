import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { RecognitionRule } from '@/types/recognition';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'No.', width: 80 },
  { field: 'ruleName', headerName: 'Rule Name', width: 200 },
  { field: 'ruleType', headerName: 'Rule Type', width: 150 },
  { field: 'operation', headerName: 'Operation', width: 130 },
];

const RecognitionRulesGrid = ({ rows }: { rows: RecognitionRule[] }) => (
  <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 20]} pagination />
);

export default RecognitionRulesGrid;

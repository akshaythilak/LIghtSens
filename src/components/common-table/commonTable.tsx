import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableSortLabel,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import './commonTable.css';
import { CommonTableProps } from '../../types/type';

function CommonTable<T extends Record<string, any>>({
  data = [],
  columns = [],
  rowKey = 'id' as keyof T,
  showCheckbox = true,
  onSelectionChange,
  onSortChange,
}: CommonTableProps<T>) {
  const [rows, setRows] = useState<T[]>(data);
  const [selectedRows, setSelectedRows] = useState<Array<T[keyof T]>>([]);
  const [sortConfig, setSortConfig] = useState<{ key?: keyof T; direction?: 'asc' | 'desc' }>({});

  useEffect(() => {
    setRows(data);
  }, [data]);

  const getColumnStyles = (isFrozen?: boolean): React.CSSProperties => ({
    position: isFrozen ? 'sticky' : 'static',
    right: isFrozen ? 0 : undefined,
    zIndex: isFrozen ? 100 : 0,
    boxShadow: isFrozen ? '-2px 0 5px rgba(0,0,0,0.1)' : undefined,
    background: 'white',
    minWidth: isFrozen ? '150px' : undefined,
  });

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const allKeys = checked ? rows.map((row) => row[rowKey]) : [];
    setSelectedRows(allKeys);

    if (onSelectionChange) {
      const selectedRowObjects = checked ? rows : [];
      onSelectionChange(selectedRowObjects);
    }
  };

  const handleRowClick = (row: T) => {
    const key = row[rowKey];
    const selectedIndex = selectedRows.indexOf(key);
    let newSelected: Array<T[keyof T]> = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedRows, key];
    } else {
      newSelected = selectedRows.filter((item) => item !== key);
    }

    setSelectedRows(newSelected);

    if (onSelectionChange) {
      const selectedRowObjects = rows.filter((r) => newSelected.includes(r[rowKey]));
      onSelectionChange(selectedRowObjects);
    }
  };

  const handleSortRequest = (key: keyof T) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sorted = [...rows].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === 'asc' ? -1 : 1;
      if (a[key]! > b[key]!) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setRows(sorted);
    if (onSortChange) onSortChange({ key, direction });
  };

  return (
    <TableContainer component={Paper} sx={{ minHeight: 500 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {showCheckbox && (
              <TableCell padding="checkbox" className="table-header">
                <Checkbox
                  indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                  checked={rows.length > 0 && selectedRows.length === rows.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
            )}
            {columns.map((col) => (
              <TableCell
                key={String(col.key)}
                sx={getColumnStyles(col.isFrozen)}
                style={{ cursor: col.sortable ? 'pointer' : 'default' }}
                className="table-header"
              >
                {col.sortable ? (
                  <TableSortLabel
                    active={sortConfig.key === col.key}
                    direction={sortConfig.direction} // 'asc' or 'desc'
                    onClick={() => handleSortRequest(col.key)}
                    sx={{
                      '& .MuiTableSortLabel-icon': {
                        fontSize: '1rem',
                      },
                    }}
                  >
                    {col.label}
                  </TableSortLabel>
                ) : (
                  col.label
                )}
                {/* {col.sortable && sortConfig.key === col.key
                  ? sortConfig.direction === 'asc'
                    ? ' ↑'
                    : ' ↓'
                  : ''} */}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (showCheckbox ? 1 : 0)}
                align="center"
                sx={{ py: 3 }}
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => {
              const key = row[rowKey];
              const isSelected = selectedRows.includes(key);

              return (
                <TableRow
                  key={String(key)}
                  hover
                  onClick={() => handleRowClick(row)}
                  selected={isSelected}
                >
                  {showCheckbox && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(row);
                        }}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell key={String(col.key)} sx={getColumnStyles(col.isFrozen)}>
                      {col.formatter ? col.formatter(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommonTable;

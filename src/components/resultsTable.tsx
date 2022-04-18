import React, { useState, useEffect } from 'react';
import '../css/App.css';
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/bootstrap-icons/bootstrap-icons.css'
import '../vendor/boxicons/css/boxicons.min.css'
import '../vendor/glightbox/css/glightbox.min.css'
import '../vendor/remixicon/remixicon.css'
import '../vendor/swiper/swiper-bundle.min.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import { csv } from "d3-fetch"
import { string } from 'yup';




interface Column {
  id: 'catalog_id' | 'mjd' | 'ddec' | 'dec' | 'dec_sigma' | 'dra' | 'ra' | 'ra_sigma' | 'distance' | 'filter' | 'id' | 'mag' | 'mag_sigma' | 'obscode';
  label: string;
  minWidth?: number;
  tooltip?: string;
  align?: 'right';
  format?: (value: number) => string;
}


const columns: readonly Column[] = [
  { id: 'mjd', label: 'MJD', minWidth: 120, format: (value: number) => value.toFixed(5), },
  {
    id: 'ra',
    label: 'RA',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'dec',
    label: 'DEC',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'mag',
    label: 'Magnitude',
    tooltip: "Note on Magnitudes here",
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toFixed(3),
  },
  {
    id: 'mag_sigma',
    label: 'Magnitude \u03C3',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toExponential(5),
  },
  {
    id: 'dra',
    label: 'dRA (\")',
    minWidth: 120,
    align: 'right',
    format: (value: number) => (value / 0.000277778).toExponential(5),
  },
  {
    id: 'ra_sigma',
    label: 'RA \u03C3',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toExponential(5),
  },
  {
    id: 'ddec',
    label: 'dDEC (\")',
    minWidth: 120,
    align: 'right',
    format: (value: number) => (value / 0.000277778).toExponential(5),
  },
  {
    id: 'dec_sigma',
    label: 'DEC \u03C3',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toExponential(5),
  },
  {
    id: 'distance',
    label: 'Distance',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toExponential(5),
  },
  {
    id: 'obscode',
    label: 'Observatory Code',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toFixed(5),
  },
  {
    id: 'id',
    label: 'Observation ID',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toFixed(5),
  },
  {
    id: 'catalog_id',
    label: 'Catalog ID',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toFixed(5),
  },
];

const ResultsTable = (props: any) => {

  const { precoveryResults } = props

  const { register, control, formState } = useFormContext();
  const { errors } = formState


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 3, }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                column.tooltip ? 
                <Tooltip title={column.tooltip}><TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight:600 }}
                >
                 <>{column.label}</>
                </TableCell></Tooltip>
                :
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight:600 }}
                >
                 {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {precoveryResults
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        sx={{
          "& .MuiTablePagination-selectLabel": { "margin-bottom": 0 },
          "& .MuiTablePagination-displayedRows": { "margin-bottom": 0 },
        }}
        component="div"
        count={precoveryResults.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default ResultsTable
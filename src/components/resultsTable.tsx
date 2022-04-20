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
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import { csv } from "d3-fetch"
import { string } from 'yup';



interface Column {
  id: 'orbit_id?'|
  'ra_deg'|
  'delta_ra_arcsec'|
  'dec_deg'|
  'delta_dec_arcsec'|
  'ra_sigma_arcsec'|
  'dec_sigma_arcsec'|
  'mag'|
  'mag_sigma'|
  'distance_arcsec'|
  'filter'|
  'healpix_id'|
  'mjd_utc'|
  'obscode'|
  'exposure_id'|
  'observation_id'|
  'pred_dec_deg'|
  'pred_ra_deg'|
  'pred_vdec_degpday'|
  'pred_vra_degpday';
  label: string;
  minWidth?: number;
  tooltip?: string;
  align?: 'right';
  format?: (value: number) => string;
}


const columns: readonly Column[] = [
  { id: 'mjd_utc', label: 'MJD (UTC)', minWidth: 120, format: (value: number) => value.toFixed(5), },
  {
    id: 'ra_deg',
    label: 'RA (\u00B0)',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'dec_deg',
    label: 'DEC (\u00B0)',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'filter',
    label: 'Filter',
    minWidth: 120,
    tooltip: "Filter used during the exposure.",
    align: 'right',
  },
  {
    id: 'mag',
    label: 'Magnitude',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toFixed(3),
  },
  {
    id: 'mag_sigma',
    label: 'Magnitude Error',
    minWidth: 150,
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'delta_ra_arcsec',
    label: 'dRA (\")',
    minWidth: 120,
    tooltip: "Discrepancy in RA between predicted and observed position.",
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'ra_sigma_arcsec',
    label: 'RA Error (\")',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'delta_dec_arcsec',
    label: 'dDEC (\")',
    minWidth: 120,
    tooltip: "Discrepancy in DEC between predicted and observed position.",
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'dec_sigma_arcsec',
    label: 'DEC Error (\")',
    minWidth: 130,
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'pred_ra_deg',
    label: 'Pred. RA (\u00B0)',
    minWidth: 120,
    tooltip: "Predicted Right Ascension from supplied orbit at observed time.",
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'pred_dec_deg',
    label: 'Pred. DEC (\u00B0)',
    minWidth: 130,
    tooltip: "Predicted Declination from supplied orbit at observed time.",
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'pred_vra_degpday',
    label: 'Pred. V RA  (\u00B0/day)',
    minWidth: 120,
    tooltip: "Predicted velocity in RA from supplied orbit at observed time.",
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'pred_vdec_degpday',
    label: 'Pred. V DEC (\u00B0/day)',
    minWidth: 120,
    tooltip: "Predicted velocity in DEC from supplied orbit at observed time.",
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'distance_arcsec',
    label: 'Distance (\")',
    minWidth: 120,
    tooltip: "Distance (discrepancy) in arcsec between predicted position and candidate precovered object.",
    align: 'right',
    format: (value: number) => value.toFixed(5),
  },
  {
    id: 'obscode',
    label: 'Observatory Code',
    minWidth: 170,
    tooltip: "Minor Planetary Center obsevatory code.",
    align: 'right',
    // format: (value: number) => value.toFixed(5),
  },
  {
    id: 'observation_id',
    label: 'Observation ID',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toFixed(5),
  },
  {
    id: 'healpix_id',
    label: 'Healpixel ID',
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
    <>

      <Typography fontSize={14} sx={{ overflow: 'hidden', marginTop: 3, marginLeft: 2, justifyContent: 'center', }}>
        Mouse over column headers to view additional information
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 1.5, }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader size="small" aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  column.tooltip ?
                    <Tooltip  title={<Typography sx={{ maxWidth: 250 }} fontSize={15}>{column.tooltip}</Typography>}>
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, fontWeight: 600 }}
                      >
                        {column.label}

                      </TableCell>

                    </Tooltip>
                    :
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: 600 }}
                    >
                 {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {precoveryResults.sort((a:any, b: any) => Number(a.mjd) - Number(b.mjd))
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

    </>
  );
}

export default ResultsTable
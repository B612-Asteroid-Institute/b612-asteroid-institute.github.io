import React from 'react';
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
import Button from '@mui/material/Button';
import { CSVLink } from 'react-csv'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';



const data = {
  "x": "123",
  "y": "124",
  "z": "124",
  "vx": "124",
  "vy": "412",
  "vz": "4241",
  'mjd_tdb': "124124",
}


interface OrbElement {
  key: string
  value: number
}

interface TransformedElements {
  coordSystem: string
  orbElements: Array<OrbElement>

}

function createData(orbElement: OrbElement) {
  return { key: orbElement.key, value: orbElement.value };
}



const TransformedCoordsDisplayTable = (props: any) => {

  const { transformedElements } = props

  const rows = transformedElements.orbElements.map((orbElement: OrbElement ) => createData(orbElement))

  console.log(rows)
  return (
    <>
    <div>{transformedElements.coordSystem}</div>
    <TableContainer component={Paper} sx={{ maxWidth: 250 }}>
    <Table  size="small" aria-label="a dense table">
      <TableBody>

        {/* @ts-ignore: */}
        {rows.map((row) => (
          <TableRow
            key={row.key}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.key}
            </TableCell>
            <TableCell align="right">{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Button>Copy To CSV</Button>
  </>


  )


}

export default TransformedCoordsDisplayTable
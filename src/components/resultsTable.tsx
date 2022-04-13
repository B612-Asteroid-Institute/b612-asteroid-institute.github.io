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
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import { csv } from "d3-fetch"


const row = {
  catalog_id: "c4d_150311_003652_ooi_VR_v1",
ddec: -0.000051789554468939514,
dec: 16.53926456592501,
dec_sigma: 0.000019780833333333332,
distance: 0.00005239925114412638,
dra: -0.000008314166009881774,
filter: "VR",
id: "c4d.420637.47.114",
mag: 22.128057,
mag_sigma: 0.062972,
mjd: 57092.02328086179,
obscode: "W84",
ra: 73.69622206574982,
ra_sigma: 0.000018487777777777778,
}
const rows = [row, row, row,row, row, row,row, row, row,row, row, row,row, row, row,row, row, row,row, row, row,]



const ResultsTable = (props: any) => {

  const { precoveryResults } = props

  const { register, control, formState } = useFormContext();
  const { errors } = formState



  return (

    <Controller
      control={control}
      name="sampleObjectPicker"
      render={({ field: { onChange, value, ref } }) => (

        <TableContainer sx={{ marginTop: 3, maxHeight: 450 }} component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>catalog_id</TableCell>
                <TableCell align="right">mjd</TableCell>
                <TableCell align="right">ddec</TableCell>
                <TableCell align="right">dec</TableCell>
                <TableCell align="right">dec_sigma</TableCell>
                <TableCell align="right">dra</TableCell>
                <TableCell align="right">ra</TableCell>
                <TableCell align="right">ra_sigma</TableCell>
                <TableCell align="right">distance</TableCell>
                <TableCell align="right">filter</TableCell>
                <TableCell align="right">id</TableCell>
                <TableCell align="right">mag</TableCell>
                <TableCell align="right">mag_sigma</TableCell>
                <TableCell align="right">obscode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {precoveryResults.map((row: any) => (
                <TableRow
                  key={row.catalog_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.catalog_id}
                  </TableCell>
                  <TableCell align="right">{row.mjd}</TableCell>
                  <TableCell align="right">{row.ddec}</TableCell>
                  <TableCell align="right">{row.dec}</TableCell>
                  <TableCell align="right">{row.dec_sigma}</TableCell>
                  <TableCell align="right">{row.dra}</TableCell>
                  <TableCell align="right">{row.ra}</TableCell>
                  <TableCell align="right">{row.ra_sigma}</TableCell>
                  <TableCell align="right">{row.distance}</TableCell>
                  <TableCell align="right">{row.filter}</TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.mag}</TableCell>
                  <TableCell align="right">{row.mag_sigma}</TableCell>
                  <TableCell align="right">{row.obscode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  )
}

export default ResultsTable
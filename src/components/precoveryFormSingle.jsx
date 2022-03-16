// import { render } from '../@testing-library/react';
import { useFormik } from 'formik';
// import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';


const axios = require('axios').default;

const validationSchema = yup.object({
  x: yup
    .string('Enter your x')
    .required('Email is required'),
  y: yup
    .string('Enter your y')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const PrecoveryFormSingle = () => {
//   const orbit = {
//     "x": 2.29984500e+00,
//     "y": -1.22649119e+00,
//     "z": 3.82684685e-01,
//     "vx": 5.12953566e-03,
//     "vy": 1.01225247e-02,
//     "vz": -4.12588907e-04,
//     'mjd_tdb': 5.65340001e+04,
//   }
//   const postData = {
//     ...orbit,
//     "tolerance": 0.000277777777777,
//   }
//   const postResult = axios.post('http://35.185.238.127/precovery/singleorbit', postData)
debugger
  const formik = useFormik({
    initialValues: {
      x: '2',
      y: '2',
      z: '2',
      coordinateSystem: 'cartesian'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      {/* {
        postResult ?
          <div>"Loading" </div> :
          <div>Complete </div>
      } */}
      <div>
        <form onSubmit={formik.handleSubmit}>

          <FormLabel id="demo-radio-buttons-group-label">Coordinate System</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            value={formik.values.coordinateSystem}
            onChange={formik.handleChange}
            error={formik.touched.coordinateSystem && Boolean(formik.errors.coordinateSystem)}
            helperText={formik.touched.coordinateSystem && formik.errors.coordinateSystem}
            id="coordinateSystem"
            name="coordinateSystem"
            label="Coordinate System"
          >
            <FormControlLabel value="cartesian" control={<Radio />} label="Cartesian" />
            <FormControlLabel value="cometary" control={<Radio />} label="Cometary" />
            <FormControlLabel value="keplerian" control={<Radio />} label="Keplerian" />
          </RadioGroup>
          <br></br>
          {
            formik.values.coordinateSystem === 'cartesian' ?
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="x"
                    name="x"
                    label="X"
                    value={formik.values.x}
                    onChange={formik.handleChange}
                    error={formik.touched.x && Boolean(formik.errors.x)}
                    helperText={formik.touched.x && formik.errors.x}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="y"
                    name="y"
                    label="Y"
                    value={formik.values.y}
                    onChange={formik.handleChange}
                    error={formik.touched.y && Boolean(formik.errors.y)}
                    helperText={formik.touched.y && formik.errors.y}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="z"
                    name="z"
                    label="Z"
                    value={formik.values.z}
                    onChange={formik.handleChange}
                    error={formik.touched.z && Boolean(formik.errors.z)}
                    helperText={formik.touched.z && formik.errors.z}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="vx"
                    name="vx"
                    label="VX"
                    value={formik.values.vx}
                    onChange={formik.handleChange}
                    error={formik.touched.vx && Boolean(formik.errors.vx)}
                    helperText={formik.touched.vx && formik.errors.vx}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="vy"
                    name="vy"
                    label="VY"
                    value={formik.values.vy}
                    onChange={formik.handleChange}
                    error={formik.touched.vy && Boolean(formik.errors.vy)}
                    helperText={formik.touched.vy && formik.errors.vy}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="vz"
                    name="vz"
                    label="VZ"
                    value={formik.values.vz}
                    onChange={formik.handleChange}
                    error={formik.touched.vz && Boolean(formik.errors.vz)}
                    helperText={formik.touched.vz && formik.errors.vz}
                  />
                </Grid>
              </Grid>
              :
              <></>
          }
          <br></br>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}

export default PrecoveryFormSingle
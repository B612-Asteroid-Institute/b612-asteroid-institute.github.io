import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';


const axios = require('axios').default;



const PrecoveryFormSingle = () => {

  const { register, control, getValues } = useFormContext();

  const ControlledText = ({ name, label }) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <TextField
            fullWidth
            label={label}
            value={value}
            onChange={onChange}
            // error={formik.touched.y && Boolean(formik.errors.y)}
            // helperText={formik.touched.y && formik.errors.y}
          />
        )}
      />
    )
  }

  return (
    <>
      {/* {
        postResult ?
          <div>"Loading" </div> :
          <div>Complete </div>
      } */}
      <div>
        <FormLabel id="demo-radio-buttons-group-label">Coordinate System</FormLabel>
        <Controller
          control={control}
          name="coordinateSystem"
          render={({ field: { onChange, value, ref } }) => (
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={value}
              onChange={onChange}
              // error={formik.touched.coordinateSystem && Boolean(formik.errors.coordinateSystem)}
              // helperText={formik.touched.coordinateSystem && formik.errors.coordinateSystem}
              label="Coordinate System"
            >
              <FormControlLabel value="cartesian" control={<Radio />} label="Cartesian" />
              <FormControlLabel value="cometary" control={<Radio />} label="Cometary" />
              <FormControlLabel value="keplerian" control={<Radio />} label="Keplerian" />
            </RadioGroup>

          )}
        />
        <br></br>
        {
            getValues("coordinateSystem") === "cartesian" ?
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <ControlledText name={"x"} label={'X'}/>
                </Grid>
                <Grid item xs={4}>
                  
                <ControlledText name={"y"} label={'Y'}/>
                </Grid>
                <Grid item xs={4}>
                  
                <ControlledText name={"z"} label={'Z'}/>
                </Grid>

                <Grid item xs={4}>
                  
                <ControlledText name={"vx"} label={'VX'}/>
                </Grid>
                <Grid item xs={4}>
                  
                <ControlledText name={"vy"} label={'VY'}/>
                </Grid>
                <Grid item xs={4}>
                  
                <ControlledText name={"vz"} label={'VZ'}/>
                </Grid>
              </Grid>
              :
              <></>
          }
          <br></br>
      </div>
    </>
  )
}

export default PrecoveryFormSingle
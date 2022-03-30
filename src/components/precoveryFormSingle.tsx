import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';


const axios = require('axios').default;



const PrecoveryFormSingle = (props: any) => {

  const { ControlledText } = props
  const { register, control, getValues } = useFormContext();

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
                <ControlledText name={"x"} label={'X'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"y"} label={'Y'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"z"} label={'Z'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"vx"} label={'VX'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"vy"} label={'VY'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"vz"} label={'VZ'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"mjd_tdb"} label={'Epoch (MJD TDB)'} />
              </Grid>
            </Grid>
            :
            <></>
        }
        {
          getValues("coordinateSystem") === "cometary" ?
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ControlledText name={"q"} label={'q'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"e"} label={'e'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"i"} label={'i'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"an"} label={'an'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"ap"} label={'ap'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"tp"} label={'tp'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"mjd_tdbCom"} label={'Epoch (MJD TDB)'} />
              </Grid>
            </Grid>
            :
            <></>
        }
        {
          getValues("coordinateSystem") === "keplerian" ?
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ControlledText name={"a"} label={'a'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"eKep"} label={'e'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"iKep"} label={'i'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"anKep"} label={'an'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"apKep"} label={'ap'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"ma"} label={'ma'} />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"mjd_tdbKep"} label={'Epoch (MJD TDB)'} />
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
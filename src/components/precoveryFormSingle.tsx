import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';


const axios = require('axios').default;



const PrecoveryFormSingle = (props: any) => {

  const { ControlledText } = props

  const { register, control, getValues, formState, trigger } = useFormContext();
  const { errors } =  formState

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
              onChange={(e)=> {
                onChange(e)
                if (formState.isSubmitted) trigger() 
              }}
            >
              <FormControlLabel value="keplerian" control={<Radio />} label="Keplerian" />
              <FormControlLabel value="cartesian" control={<Radio />} label="Cartesian" />
              <FormControlLabel value="cometary" control={<Radio />} label="Cometary" />
            </RadioGroup>

          )}
        />
        <br></br>
        
        {
          getValues("coordinateSystem") === "keplerian" ?
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ControlledText name={"a"} label={'a (au)'} error={errors.a}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"eKep"} label={'e'} error={errors.eKep}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"iKep"} label={'i (deg)'} error={errors.iKep}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"anKep"} label={'an (deg)'} error={errors.anKep}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"apKep"} label={'ap (deg)'} error={errors.apKep}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"ma"} label={'ma (deg)'} error={errors.ma}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"mjd_tdbKep"} label={'Epoch (MJD TDB)'} error={errors.mjd_tdbKep}  />
              </Grid>
            </Grid>
            :
            <></>
        }
        {
          getValues("coordinateSystem") === "cartesian" ?
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ControlledText name={"x"} label={'X (au)'} error={errors.x}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"y"} label={'Y (au)'} error={errors.y}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"z"} label={'Z (au)'} error={errors.z}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"vx"} label={'VX (au/day)'} error={errors.vx}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"vy"} label={'VY (au/day)'} error={errors.vy}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"vz"} label={'VZ (au/day)'} error={errors.vz}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"mjd_tdb"} label={'Epoch (MJD TDB)'} error={errors.mjd_tdb}  />
              </Grid>
            </Grid>
            :
            <></>
        }
        {
          getValues("coordinateSystem") === "cometary" ?
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ControlledText name={"q"} label={'q (au)'} error={errors.q}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"e"} label={'e'} error={errors.e}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"i"} label={'i (deg)'} error={errors.i}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"an"} label={'an (deg)'} error={errors.an}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"ap"} label={'ap (deg)'} error={errors.ap}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"tp"} label={'tp (MJD)'} error={errors.tp}  />
              </Grid>
              <Grid item xs={4}>
                <ControlledText name={"mjd_tdbCom"} label={'Epoch (MJD TDB)'} error={errors.mjd_tdbCom}  />
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
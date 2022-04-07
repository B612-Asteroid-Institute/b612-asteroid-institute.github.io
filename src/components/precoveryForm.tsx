import React, { useState } from 'react';
import * as yup from 'yup';
import PrecoveryFormDes from "./precoveryFormDes"
import PrecoveryFormSingle from "./precoveryFormSingle"
import '../css/App.css';
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/bootstrap-icons/bootstrap-icons.css'
import '../vendor/boxicons/css/boxicons.min.css'
import '../vendor/glightbox/css/glightbox.min.css'
import '../vendor/remixicon/remixicon.css'
import '../vendor/swiper/swiper-bundle.min.css'
import CSS from 'csstype';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { CSVLink } from 'react-csv'
import axios from 'axios';
import { map, intersection } from 'lodash'
const queryString = require('query-string');


interface Observation {
  orbit_id: string,
  catalog_id: string
  ra: number
  dra: number
  dec: number
  ddec: number
  ra_sigma: number
  dec_sigma: number
  mag: number
  mag_sigma: number
  distance: number
  filter: string
  id: string
  mjd: number
  obscode: string
}

interface DisplayError {
  errorCode: string,
  errorString: string,
}

// Yup.setLocale({
//   number: {
//     notType: "MJD Must be a number"
//   }
// })

const validationSchema = Yup.object().shape({
  "desInput": Yup.string(),
  "x": Yup.number()
    .typeError("Must be a number"),
  "y": Yup.number()
    .typeError("Must be a number"),
  "z": Yup.number()
    .typeError("Must be a number"),
  "vx": Yup.number()
    .typeError("Must be a number"),
  "vy": Yup.number()
    .typeError("Must be a number"),
  "vz": Yup.number()
    .typeError("Must be a number"),
  'mjd_tdb': Yup.number()
    .typeError("Must be a number"),
  "q": Yup.number()
    .typeError("Must be a number"),
  "e": Yup.number()
    .typeError("Must be a number"),
  "i": Yup.number()
    .typeError("Must be a number"),
  "an": Yup.number()
    .typeError("Must be a number"),
  "ap": Yup.number()
    .typeError("Must be a number"),
  "tp": Yup.number()
    .typeError("Must be a number"),
  "mjd_tdbCom": Yup.number()
    .typeError("Must be a number"),
  "a": Yup.number()
    .typeError("Must be a number"),
  "eKep": Yup.number()
    .typeError("Must be a number"),
  "iKep": Yup.number()
    .typeError("Must be a number"),
  "anKep": Yup.number()
    .typeError("Must be a number"),
  "apKep": Yup.number()
    .typeError("Must be a number"),
  "ma": Yup.number()
    .typeError("Must be a number"),
  "mjd_tdbKep": Yup.number()
    .typeError("Must be a number"),
  "start_mjd": Yup.number()
    .typeError("Must be a number")
    .min(55927, 'Dataset used starts at MJD 55927')
    .max(580307, 'Dataset used ends at MJD 57947'),
  "end_mjd": Yup.number()
    .typeError("Must be a number")
    .min(55927, 'Dataset used starts at MJD 55927')
    .max(580307, 'Dataset used ends at MJD 57947')
    .moreThan(yup.ref("start_mjd")),
  "radius": Yup.number()
    .typeError("Must be a number")
    .min(0.0, 'Must pick a positive value')
    .max(10.0, 'Values over 10" will result in numerous false positives'),
});




// get functions to build form with useForm() hook
const  PrecoveryForm = () => {

  const [precoveryResults, setPrecoveryResults] = useState<Observation[]>([]);
  const [displayError, setDisplayError] = useState<DisplayError>();
  const [progress, setProgress] = React.useState(0);
  // We will be modulating this for longer .des files
  const [precoveryRuntime, setPrecoveryRuntime] = React.useState(20);

  var parsed = queryString.parse(window.location.href);
  const defaultValues = {
    "inputType": "single",
    "desInput": '!!OID FORMAT x y z xdot ydot zdot H t_0 INDEX N_PAR MOID COMPCODE\nS0000001a  CAR 3.1814935923872047 -1.7818842866371896 0.5413047375097928 0.003965128676498027 0.006179760229698789 0.003739659079259056 10.315000000000 56534.00089159205 1 6 -1 MOPS',
    "coordinateSystem": 'cartesian',
    "sampleObjectPicker": "default",
    "x": "2.29984500e+00",
    "y": "-1.22649119e+00",
    "z": "3.82684685e-01",
    "vx": "5.12953566e-03",
    "vy": "1.01225247e-02",
    "vz": "-4.12588907e-04",
    'mjd_tdb': "5.65340001e+04",
    "q": "1",
    "e": "1",
    "i": "1",
    "an": "1",
    "ap": "1",
    "tp": "1",
    "mjd_tdbCom": "5.65340001e+04",
    "a": "3.19410998e+00",
    "eKep": "1.94124171e-01",
    "iKep": "2.76026153e+01",
    "anKep": "3.14253651e+02",
    "apKep": "2.29583820e+02",
    "ma": "1.35804981e+02",
    "mjd_tdbKep": "5.65340001e+04",
    // "start_mjd": "57947",
    "start_mjd": "55927",
    "end_mjd": "58037",
    "radius": "1",
  }
  const sampleObjects: { [key: string]: any } = {
    "1": {
      "desInput": '!!OID FORMAT x y z xdot ydot zdot H t_0 INDEX N_Pasljs fjlwefwke AR MOID COMPCODE\nS0000001a  CAR 3.1814935923872047 -1.7818842866371896 0.5413047375097928 0.003965128676498027 0.006179760229698789 0.003739659079259056 10.315000000000 56534.00089159205 1 6 -1 MOPS'
    }
  }

  const formMethods = useForm({
    resolver: yupResolver(validationSchema), 
    defaultValues, 
    mode: "onBlur" 
  })

  const { errors } = formMethods.formState;
  //Sample objects that the user can select and copy into the form to test Precovery


  const ControlledText = ({ name, label, error }: { name: any, label: string , error: any }) => {
    return (
      <Controller
        control={formMethods.control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextField
            fullWidth
            error={error ? true : false}
            helperText={error ? error.message : ''}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
    )
  }


  const onSubmit = async (data: any) => {
    
    // This sets up an interval timer to handle the progress bar. it is cleared on return
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        // if (oldProgress === 100) {
        //   return 0;
        // }
        const diff = Math.random() * 100 / (precoveryRuntime);
        return Math.min(oldProgress + diff, 99);
      });
    }, 500);
    
    let req = { data: { matches: [] } }
    try {
      if (formMethods.getValues("inputType") === "single") {
        const { coordinateSystem, start_mjd, end_mjd, radius } = formMethods.getValues()
        const commonInputs = { "orbit_type": coordinateSystem, start_mjd, end_mjd, "threshold": radius }
        if (formMethods.getValues("coordinateSystem") === "cartesian") {
          const { x, y, z, vx, vy, vz, mjd_tdb } = formMethods.getValues()
          req = await axios.post("https://precovery.api.b612.ai/precovery/singleorbit", { x, y, z, vx, vy, vz, mjd_tdb, ...commonInputs })
        }
        else if (formMethods.getValues("coordinateSystem") === "cometary") {
          const { q, e, i, an, ap, tp, mjd_tdbCom } = formMethods.getValues()
          req = await axios.post("https://precovery.api.b612.ai/precovery/singleorbit", { q, e, i, an, ap, tp, "mjd_tdb": mjd_tdbCom, ...commonInputs })
        }
        else if (formMethods.getValues("coordinateSystem") === "keplerian") {
          const { a, eKep, iKep, anKep, apKep, ma, mjd_tdbKep } = formMethods.getValues()
          const stateVector = { a, e: eKep, i: iKep, an: anKep, ap: apKep, ma, mjd_tdb: mjd_tdbKep }
          req = await axios.post("https://precovery.api.b612.ai/precovery/singleorbit", { ...stateVector, ...commonInputs })
          // req = await axios.post("https://precovery.api.b612.ai/precovery/singleorbit", { "orbit_type": formMethods.getValues("coordinateSystem"), ...stateVector }) 
        }
        console.log(req)
        const matches = req.data.matches
        setPrecoveryResults(matches)
      }
      else {
        req = await axios.post("https://precovery.api.b612.ai/precovery/webinput", { "in_string": formMethods.getValues("desInput"), "file_type": "des" })
        console.log(req)
        // const matches = req.data.matches
        const matches = map(req.data.matches, (m) => {
          return (map(m[1], (obs: Observation) => {
            let newObservation = { ...obs }
            newObservation.orbit_id = m[0]
            return newObservation
          }))
        }).flat()
        setPrecoveryResults(matches)
      }
    }
    catch (error: any) {
      console.log(error)
      setDisplayError({
        errorCode: error.name,
        errorString: "An Unhandled Error Occured"
      })
    }

    return () => {
      clearInterval(timer);
    }

  }

  const submitDisabled = () => {
    const errorKeys = Object.keys(errors)
    const coreErrors = intersection(["start_mjd", "end_mjd", "radius"], errorKeys)
    let specificErrors = []
    if (formMethods.getValues("inputType") === "single") {
      if (formMethods.getValues("coordinateSystem") === "cartesian") {
        specificErrors = intersection(["x", "y", "z", "vx", "vy", "vz", 'mjd_tdb'], errorKeys)
      }
      else if (formMethods.getValues("coordinateSystem") === "cometary") {
        specificErrors = intersection(["q", "e", "i", "an", "ap", "tp", 'mjd_tdbCom'], errorKeys)
      }
      else if (formMethods.getValues("coordinateSystem") === "cometary") {
        specificErrors = intersection(["a", "eKep", "iKep", "anKep", "apKep", "ma", 'mjd_tdbKep'], errorKeys)
      }
    }
    // console.log(errorKeys, coreErrors, [...["start_mjd", "end_mjd", "radius"], ...errorKeys])
    return coreErrors.length + specificErrors.length > 0
  }

  const sampleObjectOnChangeHandler = (value: string) => {
    if (value !== 'default') formMethods.setValue('desInput', sampleObjects[value].desInput)
  }

  const watchFields = formMethods.watch(["inputType",
    "desInput",
    "coordinateSystem",
    "sampleObjectPicker",]);

  return (
    <FormProvider {...formMethods} >
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {parsed.single !== "true" &&
           <Grid item xs={4}>
            <Controller
              control={formMethods.control}
              name="inputType"
              render={({ field: { onChange, value, ref } }) => (
                <RadioGroup
                  row
                  value={value}
                  onChange={onChange} // send value to hook form
                >
                  <FormControlLabel value="single" control={<Radio />} label="Single Orbit" />
                  <FormControlLabel value="des" control={<Radio />} label=".Des File" />
                </RadioGroup>
              )}
            />
          </Grid>}

          <Grid item xs={6}>
            <Controller
              control={formMethods.control}
              name="sampleObjectPicker"
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  value={value}
                  label="a"
                  fullWidth
                  onChange={(value) => {
                    onChange(value)
                    sampleObjectOnChangeHandler(value.target.value)
                  }}
                >
                  <MenuItem value={"default"}>Pick a Sample Object</MenuItem>
                  <MenuItem value={"1"}>TEST</MenuItem>
                  {/* <MenuItem value={"20"}>Twenty</MenuItem> */}
                  {/* <MenuItem value={"30"}>Thirty</MenuItem> */}
                </Select>
              )}
            />
          </Grid>
        </Grid>

        <br></br>

        <br></br>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Controller
              control={formMethods.control}
              name={"start_mjd"}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  error={errors.start_mjd ? true : false}
                  helperText={errors.start_mjd ? errors.start_mjd.message : ''}
                  fullWidth
                  label={"Start MJD"}
                  value={value}
                  onChange={onChange}
                  onBlur={() => { 
                    onBlur() 
                    // formMethods.setValue("end_mjd", (parseFloat(formMethods.getValues("start_mjd")) + 90).toString()) 
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              control={formMethods.control}
              name={"end_mjd"}
              render={({ field: { onChange, value, ref } }) => (
                <TextField
                  fullWidth
                  error={errors.end_mjd ? true : false}
                  helperText={errors.end_mjd ? errors.end_mjd.message : ''}
                  label={"End MJD"}
                  value={value}
                  // disabled
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <ControlledText name={"radius"} label={'Radius (Arcsec)'} error={errors.radius} />
          </Grid>
        </Grid>

        <Divider sx={{marginTop:3, marginBottom:2}} />

        {
          formMethods.getValues("inputType") === "single" ?
            <PrecoveryFormSingle
              ControlledText={ControlledText}
            /> :
            <PrecoveryFormDes />
        }


        {!formMethods.formState.isSubmitting ?
          <Button sx={{marginTop:3}} color="primary" variant="contained" fullWidth type="submit" disabled={submitDisabled()} >
            Submit
          </Button> :
          <LoadingButton sx={{marginTop:3}} color="primary" loading fullWidth variant="outlined">
            Submit
          </LoadingButton>
        }

        {formMethods.formState.isSubmitting &&
        <LinearProgress
            variant="determinate"
            sx={{height: 10,
              borderRadius: 5, marginTop:3}}
            value={progress} />
        }

        {

        displayError?.errorCode &&

          <Alert sx={{marginTop:3}} severity="error">
            <AlertTitle>{displayError.errorCode}</AlertTitle>
            {displayError.errorString}
          </Alert>
        }

        {precoveryResults.length > 0 ?

          <CSVLink className={"csvLink"} data={precoveryResults} filename={"precoveryResults.csv"} enclosingCharacter={``}>
            <Button sx={{marginTop:3}} color="secondary" variant="contained" fullWidth >
              <div className={"text-undecorated"}>Download</div>
            </Button>
          </CSVLink>
          :
          formMethods.formState.isSubmitted ? 
          <Alert sx={{marginTop:3}} severity="warning">
            No precoveries were found for this orbit in the specified time interval.
          </Alert>
          :
          <></>
        }

      </form>
    </FormProvider>
  )

}

export default PrecoveryForm;
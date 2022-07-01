import React, { useState } from 'react';
import * as yup from 'yup';
import PrecoveryFormDes from "./precoveryFormDes"
import PrecoveryFormSingle from "./precoveryFormSingle"
import ResultsTable from "./resultsTable"
import '../css/App.css';
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/bootstrap-icons/bootstrap-icons.css'
import '../vendor/boxicons/css/boxicons.min.css'
import '../vendor/glightbox/css/glightbox.min.css'
import '../vendor/remixicon/remixicon.css'
import '../vendor/swiper/swiper-bundle.min.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { map, intersection } from 'lodash'
import queryString from 'query-string';



interface Observation {
  orbit_id?: string
  ra_deg: number
  delta_ra_arcsec: number
  dec_deg: number
  delta_dec_arcsec: number
  ra_sigma_arcsec: number
  dec_sigma_arcsec: number
  mag: number
  mag_sigma: number
  distance_arcsec: number
  filter: string
  healpix_id: string
  mjd_utc: number
  obscode: string
  exposure_id: string
  observation_id: string
  pred_dec_deg: number
  pred_ra_deg: number
  pred_vdec_degpday: number
  pred_vra_degpday: number
}


// interface SampleObject {
//   M: string
//   a: string
//   ap: string
//   e: string
//   i: string
//   mjd_tdb: string
//   obj_id: string
//   q: string
//   raan: string
//   tp: string
//   vx: string
//   vy: string
//   vz: string
//   x: string
//   y: string
//   z: string
// }

interface DisplayError {
  errorCode: string,
  errorString: string,
}


const validationSchema = Yup.object().shape({
  "desInput": Yup.string(),
  "coordinateSystem": Yup.string().oneOf(['cartesian', 'keplerian', 'cometary']),
  "x": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cartesian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "y": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cartesian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "z": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cartesian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "vx": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cartesian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "vy": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cartesian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "vz": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cartesian',
      "then": Yup.number().typeError("Must be a number")
    }),
  'mjd_tdb': Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cartesian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "q": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cometary',
      "then": Yup.number().typeError("Must be a number")
    }),
  "e": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cometary',
      "then": Yup.number().typeError("Must be a number")
    }),
  "i": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cometary',
      "then": Yup.number().typeError("Must be a number")
    }),
  "an": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cometary',
      "then": Yup.number().typeError("Must be a number")
    }),
  "ap": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cometary',
      "then": Yup.number().typeError("Must be a number")
    }),
  "tp": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cometary',
      "then": Yup.number().typeError("Must be a number")
    }),
  "mjd_tdbCom": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'cometary',
      "then": Yup.number().typeError("Must be a number")
    }),
  "a": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'keplerian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "eKep": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'keplerian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "iKep": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'keplerian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "anKep": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'keplerian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "apKep": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'keplerian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "ma": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'keplerian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "mjd_tdbKep": Yup.mixed().notRequired()
    .when('coordinateSystem', {
      "is": 'keplerian',
      "then": Yup.number().typeError("Must be a number")
    }),
  "start_mjd": Yup.number()
    .typeError("Must be a number")
    .min(56193, 'Dataset used starts at MJD 56193')
    .max(58804, 'Dataset used ends at MJD 58804')
    .lessThan(yup.ref("end_mjd")),
  "end_mjd": Yup.number()
    .typeError("Must be a number")
    .min(56193, 'Dataset used starts at MJD 56193')
    .max(58804, 'Dataset used ends at MJD 58804')
    .moreThan(yup.ref("start_mjd")),
  "radius": Yup.number()
    .typeError("Must be a number")
    .min(0.0, 'Must pick a positive value'),
  // .max(10.0, 'Values over 10" will result in numerous false positives'),
  "do_cutouts": Yup.boolean(),
  "email": Yup.string().notRequired()
    .when("do_cutouts", {
      "is": true,
      "then": Yup.string().required("Please enter an email").email("Must be a valid email")
    }),

});




// get functions to build form with useForm() hook
const PrecoveryForm = () => {
  const [precoveryResults, setPrecoveryResults] = useState<Observation[]>([]);
  const [sampleObjects, setSampleObjects] = useState<any[]>([]);
  const [displayError, setDisplayError] = useState<DisplayError>();
  const [progress, setProgress] = React.useState(0);
  // We will be modulating this for longer .des files
  const [precoveryRuntime, setPrecoveryRuntime] = useState(50);

  var parsed = queryString.parse(window.location.href);
  const defaultValues = {
    "inputType": "single",
    "desInput": '!!OID FORMAT x y z xdot ydot zdot H t_0 INDEX N_PAR MOID COMPCODE\nS0000001a  CAR 3.1814935923872047 -1.7818842866371896 0.5413047375097928 0.003965128676498027 0.006179760229698789 0.003739659079259056 10.315000000000 56534.00089159205 1 6 -1 MOPS',
    "coordinateSystem": 'keplerian',
    "sampleObjectPicker": "default",
    "do_cutouts": true,
    "email": "",
    "x": "",
    "y": "",
    "z": "",
    "vx": "",
    "vy": "",
    "vz": "",
    'mjd_tdb': "",
    "q": "",
    "e": "",
    "i": "",
    "an": "",
    "ap": "",
    "tp": "",
    "mjd_tdbCom": "",
    "a": "",
    "eKep": "",
    "iKep": "",
    "anKep": "",
    "apKep": "",
    "ma": "",
    "mjd_tdbKep": "",
    "start_mjd": "56193",
    "end_mjd": "58804",
    "radius": "5",
  }

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur"
  })

  const { errors } = formMethods.formState;
  //Sample objects that the user can select and copy into the form to test Precovery

  const ControlledText = ({ name, label, error }: { name: any, label: string, error: any }) => {
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
    setPrecoveryResults([])
    setDisplayError(undefined)
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        // if (oldProgress === 100) {
        //   return 0;
        // }
        const diff = Math.random() * 100 / (precoveryRuntime);
        return Math.min(oldProgress + diff, 99);
      });
    }, 500);


    //TODO - add this as the submit behavior for localhost
    //   const dat = {
    //     'orbit_id': "100.00",
    //   'ra_deg': 100.00,
    //   'delta_ra_arcsec': 100.00,
    //   'dec_deg': 100.00,
    //   'delta_dec_arcsec': 100.00,
    //   'ra_sigma_arcsec': 100.00,
    //   'dec_sigma_arcsec': 100.00,
    //   'mag': 100.00,
    //   'mag_sigma': 100.00,
    //   'distance_arcsec': 100.00,
    //   'filter': "100.00",
    //   'healpix_id': "100.00",
    //   'mjd_utc': 100.00,
    //   'obscode': "100.00",
    //   'exposure_id': "100.00",
    //   'observation_id': "100.00",
    //   'pred_dec_deg':100.00,
    //   'pred_ra_deg': 100.00,
    //   'pred_vdec_degpday': 100.00,
    //   'pred_vra_degpday': 100.00,
    // }
    // setPrecoveryResults([dat, dat,dat, dat,dat])
    // return



    let req = { data: { matches: [], 'error message': undefined } }
    try {
      if (formMethods.getValues("inputType") === "single") {
        const { coordinateSystem, start_mjd, end_mjd, radius, email, do_cutouts } = formMethods.getValues()
        const commonInputs = { "orbit_type": coordinateSystem, start_mjd, end_mjd, email, do_cutouts,  "tolerance": Number(radius) * (1 / 3600) }
        if (formMethods.getValues("coordinateSystem") === "cartesian") {
          const { x, y, z, vx, vy, vz, mjd_tdb } = formMethods.getValues()
          req = await axios.post(`${process.env.REACT_APP_API_URL}precovery/singleorbit`, { x, y, z, vx, vy, vz, mjd_tdb, ...commonInputs })
        }
        else if (formMethods.getValues("coordinateSystem") === "cometary") {
          const { q, e, i, an, ap, tp, mjd_tdbCom } = formMethods.getValues()
          req = await axios.post(`${process.env.REACT_APP_API_URL}precovery/singleorbit`, { q, e, i, an, ap, tp, "mjd_tdb": mjd_tdbCom, ...commonInputs })
        }
        else if (formMethods.getValues("coordinateSystem") === "keplerian") {
          const { a, eKep, iKep, anKep, apKep, ma, mjd_tdbKep } = formMethods.getValues()
          const stateVector = { a, e: eKep, i: iKep, an: anKep, ap: apKep, ma, mjd_tdb: mjd_tdbKep }
          req = await axios.post(`${process.env.REACT_APP_API_URL}precovery/singleorbit`, { ...stateVector, ...commonInputs })
          // req = await axios.post("https://precovery.api.b612.ai/precovery/singleorbit", { "orbit_type": formMethods.getValues("coordinateSystem"), ...stateVector }) 
        }
        console.log(req)
        
        if (req.data['error message']) {
          setDisplayError({
            errorCode: "Error",
            errorString: req.data['error message']
          })
          clearInterval(timer)
          return
        }
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

    clearInterval(timer)
    return

  }

  // This is custom validation to control whether the submit button should be disabled. Essentially we only want them to be able to submit
  // if the current input type's relevant fields are validated.
  const submitDisabled = () => {
    // if (!formMethods.formState.isDirty) return true
    let errorKeys = Object.keys(errors)
    let touchedFields = Object.keys(formMethods.formState.touchedFields)
    const coreErrors = intersection(["start_mjd", "end_mjd", "radius"], errorKeys)
    const emailError = formMethods.getValues("do_cutouts") && (intersection(["email"], errorKeys).length > 0 || intersection(["email"], touchedFields).length !== 1)
    let specificErrors = []
    let allTouched = false
    if (formMethods.getValues("inputType") === "single") {
      if (formMethods.getValues("coordinateSystem") === "cartesian") {
        specificErrors = intersection(["x", "y", "z", "vx", "vy", "vz", 'mjd_tdb'], errorKeys)
        allTouched = intersection(["x", "y", "z", "vx", "vy", "vz", 'mjd_tdb'], touchedFields).length === 7
      }
      else if (formMethods.getValues("coordinateSystem") === "cometary") {
        specificErrors = intersection(["q", "e", "i", "an", "ap", "tp", 'mjd_tdbCom'], errorKeys)
        allTouched = intersection(["q", "e", "i", "an", "ap", "tp", 'mjd_tdbCom'], touchedFields).length === 7
      }
      else if (formMethods.getValues("coordinateSystem") === "keplerian") {
        specificErrors = intersection(["a", "eKep", "iKep", "anKep", "apKep", "ma", 'mjd_tdbKep'], errorKeys)
        allTouched = intersection(["a", "eKep", "iKep", "anKep", "apKep", "ma", 'mjd_tdbKep'], touchedFields).length === 7
      }
    }
    // console.log(errorKeys, coreErrors, [...["start_mjd", "end_mjd", "radius"], ...errorKeys], coreErrors.length, specificErrors.length, allTouched)
    return (coreErrors.length + specificErrors.length) > 0 || !allTouched || emailError
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const watchFields = formMethods.watch(["inputType",
    "desInput",
    "coordinateSystem",
    "sampleObjectPicker",
    "do_cutouts"
  ]);

  return (
    <FormProvider {...formMethods} >
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {parsed.debug === "true" &&
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


        </Grid>

        <br></br>

        <br></br>
        {parsed.debug === "true" &&
          <>
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


            <Divider sx={{ marginTop: 3, marginBottom: 2 }} />
          </>
        }
        {
          formMethods.getValues("inputType") === "single" ?
            <PrecoveryFormSingle
              ControlledText={ControlledText}
              sampleObjects={sampleObjects}
              setSampleObjects={setSampleObjects}
            /> :
            <PrecoveryFormDes />
        }


        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Controller
              control={formMethods.control}
              name="do_cutouts"
              render={({ field: { onChange, value, ref } }) => (
                <FormControlLabel
                  sx={{ paddingTop: 1 }}
                  value="single" control={
                    <Checkbox
                      checked={value}
                      value={value}
                      onChange={(e) => {
                        onChange(e)
                        formMethods.trigger("email")
                        setPrecoveryRuntime(e.target.checked ? 50 : 30)
                      }}
                    />}
                  label="Email Me Candidate Cutouts" />
              )}
            />

          </Grid>


          <Grid item xs={4}>
            <Controller
              control={formMethods.control}
              name={"email"}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  fullWidth
                  error={errors.email ? true : false}
                  helperText={errors.email ? errors.email.message : ''}
                  label={"Email"}
                  disabled={!formMethods.getValues("do_cutouts")}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Grid>

        </Grid>


        {!formMethods.formState.isSubmitting ?
          <Button sx={{ marginTop: 3 }} color="primary" variant="contained" fullWidth type="submit" disabled={submitDisabled()} >
            {formMethods.formState.isSubmitted ? "Resubmit" : "Submit"}
          </Button> :
          <LoadingButton sx={{ marginTop: 3 }} color="primary" loading fullWidth variant="outlined">
            Submit
          </LoadingButton>
        }

        {formMethods.formState.isSubmitting &&
          <LinearProgress
            variant="determinate"
            sx={{
              height: 10,
              borderRadius: 5, marginTop: 3
            }}
            value={progress} />
        }

        {

          displayError?.errorCode &&

          <Alert sx={{ marginTop: 3 }} severity="error">
            <AlertTitle>{displayError.errorCode}</AlertTitle>
            {displayError.errorString}
          </Alert>
        }

        {precoveryResults.length > 0 && formMethods.formState.isSubmitted ?
          <>
            <ResultsTable
              precoveryResults={precoveryResults}
            />
          </>
          :
          (formMethods.formState.isSubmitted && !formMethods.formState.isSubmitting && !displayError?.errorCode) ?
            <Alert sx={{ marginTop: 3 }} severity="warning">
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
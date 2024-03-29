// @ts-nocheck 
import React, { useState } from 'react';
import * as yup from 'yup';
import TransformedCoordsDisplayTable from "./transformedCoordsDisplayTable"
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
import { useForm, FormProvider, Controller } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { intersection } from 'lodash'


interface DisplayError {
  errorName: string,
  errorDesc: string,
}

interface OrbElement {
  key: string
  value: number | string
}

interface TransformedElements {
  coordSystem: string
  orbElements: Array<OrbElement>

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
const OrbElementsTransformForm = () => {
  const [transformResults, setTransformResults] = useState<TransformedElements[]>([]);
  const [displayError, setDisplayError] = useState<DisplayError>();

  const defaultValues = {

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
  }

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur"
  })



  const { errors } = formMethods.formState;



  // This controlled text component is passed downstream to add simple form-enabled text fields 
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

    setDisplayError(undefined)
    setTransformResults([])

    // Select the correct for values to send based on the chosen orbit type
    let req = { data: { matches: [], 'error message': undefined, email_response: undefined } }
    try {
      if (formMethods.getValues("coordinateSystem") === "cartesian") {
        const { x, y, z, vx, vy, vz, mjd_tdb } = formMethods.getValues()
        req = await axios.post(`${process.env.REACT_APP_API_URL}transform/orbital_elements/from_cartesian`, { x, y, z, vx, vy, vz, mjd_tdb })
      }
      else if (formMethods.getValues("coordinateSystem") === "cometary") {
        const { q, e, i, an, ap, tp, mjd_tdbCom } = formMethods.getValues()
        req = await axios.post(`${process.env.REACT_APP_API_URL}transform/orbital_elements/from_cometary`, { q, e, i, an, ap, tp, "mjd_tdb": mjd_tdbCom })
      }
      else if (formMethods.getValues("coordinateSystem") === "keplerian") {
        const { a, eKep, iKep, anKep, apKep, ma, mjd_tdbKep } = formMethods.getValues()
        const stateVector = { a, e: eKep, i: iKep, an: anKep, ap: apKep, "M": ma, mjd_tdb: mjd_tdbKep }
        req = await axios.post(`${process.env.REACT_APP_API_URL}transform/orbital_elements/from_keplerian`, { ...stateVector })
      }
      console.log(req)

      if (req.data) {
        let transResults = []
        for (const [coordSystem, elements] of Object.entries(req.data.orbital_elements)) {
          let orbElements = []

          for (const [param, paramValue] of Object.entries(elements)) {
            orbElements.push({ key: param, value: paramValue })
          }
          transResults.push({
            coordSystem: coordSystem,
            orbElements: orbElements
          })

        }
        setTransformResults(transResults)
      }

    }
    catch (error: any) {
      console.log(error)
      setDisplayError({
        errorName: error.name,
        errorDesc: "An Unhandled Server Error Occured"
      })
    }

    return

  }

  // This is custom validation to control whether the submit button should be disabled. Essentially we only want them to be able to submit
  // if the current input type's relevant fields are validated.
  const submitDisabled = () => {

    let errorKeys = Object.keys(errors)
    let touchedFields = Object.keys(formMethods.formState.touchedFields)
    let specificErrors = []
    let allTouched = false
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
    console.log(errorKeys, specificErrors.length, allTouched)
    return (specificErrors.length) > 0 || !allTouched
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const watchFields = formMethods.watch(["coordinateSystem"]);

  return (
    <FormProvider {...formMethods} >
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Grid
          container spacing={2}
          direction="column"
          sx={{ marginLeft: 3, marginTop: 3 }}
        >
          <div>Source Coordinate System</div>

          <Controller
            control={formMethods.control}
            name="coordinateSystem"
            render={({ field: { onChange, value, ref } }) => (
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                value={value}
                onChange={(e) => {
                  onChange(e)
                  setDisplayError(null)
                  setTransformResults([])
                }}
              >
                <FormControlLabel value="keplerian" control={<Radio />} label="Keplerian" />
                <FormControlLabel value="cartesian" control={<Radio />} label="Cartesian" />
                <FormControlLabel value="cometary" control={<Radio />} label="Cometary" />
              </RadioGroup>

            )}

          />

        </Grid>


        <br></br>
        <br></br>
        <Grid container spacing={2}>
          {
            formMethods.getValues("coordinateSystem") === "keplerian" ?
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"a"} label={'a (au)'} error={errors.a} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"eKep"} label={'e'} error={errors.eKep} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"iKep"} label={'i (deg)'} error={errors.iKep} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"anKep"} label={'an (deg)'} error={errors.anKep} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"apKep"} label={'ap (deg)'} error={errors.apKep} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"ma"} label={'ma (deg)'} error={errors.ma} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"mjd_tdbKep"} label={'Epoch (MJD TDB)'} error={errors.mjd_tdbKep} />
                </Grid>
              </>
              :
              <></>
          }

          {
            formMethods.getValues("coordinateSystem") === "cartesian" ?
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"x"} label={'X (au)'} error={errors.x} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"y"} label={'Y (au)'} error={errors.y} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"z"} label={'Z (au)'} error={errors.z} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"vx"} label={'VX (au/day)'} error={errors.vx} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"vy"} label={'VY (au/day)'} error={errors.vy} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"vz"} label={'VZ (au/day)'} error={errors.vz} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"mjd_tdb"} label={'Epoch (MJD TDB)'} error={errors.mjd_tdb} />
                </Grid>
              </>
              :
              <></>
          }

          {
            formMethods.getValues("coordinateSystem") === "cometary" ?
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"q"} label={'q (au)'} error={errors.q} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"e"} label={'e'} error={errors.e} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"i"} label={'i (deg)'} error={errors.i} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"an"} label={'an (deg)'} error={errors.an} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"ap"} label={'ap (deg)'} error={errors.ap} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"tp"} label={'tp (MJD)'} error={errors.tp} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ControlledText name={"mjd_tdbCom"} label={'Epoch (MJD TDB)'} error={errors.mjd_tdbCom} />
                </Grid>
              </>
              :
              <></>
          }


        </Grid>
        <br></br>


        {transformResults.length > 0 &&

          <Grid container spacing={2} alignItems="stretch">
            {transformResults.map((transformResult) => (
              <Grid item xs={12} sm={6} md={4}>
                <TransformedCoordsDisplayTable
                  transformedElements={transformResult}
                />

              </Grid>
            ))}
          </Grid>

        }

        {!formMethods.formState.isSubmitting ?
          <Button sx={{ marginTop: 3 }} color="primary" variant="contained" fullWidth type="submit" disabled={submitDisabled()} >
            {formMethods.formState.isSubmitted ? "Resubmit" : "Submit"}
          </Button> :
          <LoadingButton sx={{ marginTop: 3 }} color="primary" loading fullWidth variant="outlined">
            Submit
          </LoadingButton>
        }


        {/* Catch-all error message */}
        {
          displayError?.errorName &&
          <Alert sx={{ marginTop: 3 }} severity="error">
            <AlertTitle>{displayError.errorName}</AlertTitle>
            {displayError.errorDesc}
          </Alert>
        }


      </form>
    </FormProvider>
  )

}

export default OrbElementsTransformForm;
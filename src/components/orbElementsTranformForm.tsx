import React, { useState } from 'react';
import * as yup from 'yup';
import PrecoveryFormDes from "./precoveryFormDes"
import PrecoveryFormSingle from "./precoveryFormSingle"
import TransformedCoordsDisplayTable from "./transformedCoordsDisplayTable"
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
import { useForm, FormProvider, Controller, useFieldArray } from 'react-hook-form';
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





interface DisplayError {
  errorName: string,
  errorDesc: string,
}

interface OrbElement {
  key: string
  value: number
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
  const [sampleObjects, setSampleObjects] = useState<any[]>([]);
  const [displayError, setDisplayError] = useState<DisplayError>();
  const [logMessage, setLogMessage] = useState<String>();

  var parsed = queryString.parse(window.location.href);
  const defaultValues = {
    "coordinateSystem": '',
    "x": "-2.33942395564163",
    "y": "-0.3658455137521852",
    "z": "-1.009395236438459",
    "vx": "0.002708132986793148",
    "vy": "-0.01099826393246929",
    "vz": "-0.002996736922710569",
    'mjd_tdb': "57863.0",
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

  const { control } = formMethods

  // const {
  //   fields: cartesianFields,
  //   append: cartesianAppend,
  //   remove: cartesianRemove
  //   // I'm not sure why typescript defs have this as 'never'
  //   // @ts-ignore:
  // } = useFieldArray({ control, name: "cartesian"});

  // const {
  //   fields: keplerianFields,
  //   append: keplerianAppend,
  //   remove: keplerianRemove
  //   // I'm not sure why typescript defs have this as 'never'
  //   // @ts-ignore:
  // } = useFieldArray({ control, name: "keplerian" });

  // const {
  //   fields: cometaryFields,
  //   append: cometaryAppend,
  //   remove: cometaryRemove
  //   // I'm not sure why typescript defs have this as 'never'
  //   // @ts-ignore:
  // } = useFieldArray({ control, name: "cometarys" });



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

    // This sets up an interval timer to handle the progress bar. it is cleared on return



    // Select the correct for values to send based on the chosen orbit type
    let req = { data: { matches: [], 'error message': undefined, email_response: undefined } }
    try {
      const { coordinateSystem } = formMethods.getValues()
      const commonInputs = { "orbit_type": coordinateSystem }
      if (formMethods.getValues("coordinateSystem") === "cartesian") {
        const { x, y, z, vx, vy, vz, mjd_tdb } = formMethods.getValues()
        req = await axios.post(`${process.env.REACT_APP_API_URL}from_cartesian`, { x, y, z, vx, vy, vz, mjd_tdb })
      }
      else if (formMethods.getValues("coordinateSystem") === "cometary") {
        const { q, e, i, an, ap, tp, mjd_tdbCom } = formMethods.getValues()
        req = await axios.post(`${process.env.REACT_APP_API_URL}from_cometary`, { q, e, i, an, ap, tp, "mjd_tdb": mjd_tdbCom })
      }
      else if (formMethods.getValues("coordinateSystem") === "keplerian") {
        const { a, eKep, iKep, anKep, apKep, ma, mjd_tdbKep } = formMethods.getValues()
        const stateVector = { a, e: eKep, i: iKep, an: anKep, ap: apKep, ma, mjd_tdb: mjd_tdbKep }
        req = await axios.post(`${process.env.REACT_APP_API_URL}from_keplerian`, { ...stateVector })
        // req = await axios.post("https://precovery.api.b612.ai/precovery/singleorbit", { "orbit_type": formMethods.getValues("coordinateSystem"), ...stateVector }) 
      }
      console.log(req)


      setTransformResults([
        {
          coordSystem: "cartesian",
          orbElements: [
            { key: "x", value: 1234, },
            { key: "y", value: 1234, },
            { key: "z", value: 1234, },
            { key: "vx", value: 1234, },
            { key: "vy", value: 1234, },
            { key: "vz", value: 1234, },
            { key: "mjd_tdb", value: 1234, },
          ]
        },
        {
          coordSystem: "keplerian",
          orbElements: [
            { key: "a", value: 1234, },
            { key: "e", value: 1234, },
            { key: "i", value: 1234, },
            { key: "an", value: 1234, },
            { key: "ap", value: 1234, },
            { key: "ma", value: 1234, },
            { key: "mjd_tdb", value: 1234, },
          ]
        },

      ])

      // if ("email_response" in req.data) {
      //   setLogMessage(req.data.email_response)
      // }

    }
    catch (error: any) {
      console.log(error)
      setDisplayError({
        errorName: error.name,
        errorDesc: "An Unhandled Error Occured"
      })
    }

    return

  }

  // This is custom validation to control whether the submit button should be disabled. Essentially we only want them to be able to submit
  // if the current input type's relevant fields are validated.
  const submitDisabled = () => {

    // console.log(errorKeys, coreErrors, [...["start_mjd", "end_mjd", "radius"], ...errorKeys], coreErrors.length, specificErrors.length, allTouched)
    return 1
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const watchFields = formMethods.watch(["coordinateSystem"]);


  return (
    <FormProvider {...formMethods} >
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>

          {/* Pick the input mode - single orbit or .des file input. Disabled out of Debug mode  */}


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
                  if (formMethods.formState.isSubmitted) formMethods.trigger()
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
                <Grid item xs={4}>
                  <ControlledText name={"a"} label={'a (au)'} error={errors.a} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"eKep"} label={'e'} error={errors.eKep} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"iKep"} label={'i (deg)'} error={errors.iKep} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"anKep"} label={'an (deg)'} error={errors.anKep} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"apKep"} label={'ap (deg)'} error={errors.apKep} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"ma"} label={'ma (deg)'} error={errors.ma} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"mjd_tdbKep"} label={'Epoch (MJD TDB)'} error={errors.mjd_tdbKep} />
                </Grid>
              </>
              :
              <></>
          }

          {
            formMethods.getValues("coordinateSystem") === "cartesian" ?
              <>
                <Grid item xs={4}>
                  <ControlledText name={"x"} label={'X (au)'} error={errors.x} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"y"} label={'Y (au)'} error={errors.y} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"z"} label={'Z (au)'} error={errors.z} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"vx"} label={'VX (au/day)'} error={errors.vx} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"vy"} label={'VY (au/day)'} error={errors.vy} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"vz"} label={'VZ (au/day)'} error={errors.vz} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"mjd_tdb"} label={'Epoch (MJD TDB)'} error={errors.mjd_tdb} />
                </Grid>
              </>
              :
              <></>
          }

          {
            formMethods.getValues("coordinateSystem") === "cometary" ?
              <>
                <Grid item xs={4}>
                  <ControlledText name={"q"} label={'q (au)'} error={errors.q} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"e"} label={'e'} error={errors.e} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"i"} label={'i (deg)'} error={errors.i} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"an"} label={'an (deg)'} error={errors.an} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"ap"} label={'ap (deg)'} error={errors.ap} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"tp"} label={'tp (MJD)'} error={errors.tp} />
                </Grid>
                <Grid item xs={4}>
                  <ControlledText name={"mjd_tdbCom"} label={'Epoch (MJD TDB)'} error={errors.mjd_tdbCom} />
                </Grid>
              </>
              :
              <></>
          }


        </Grid>
        <br></br>


        {transformResults.length > 0 &&

          <Grid container spacing={2}>
            {transformResults.map((transformResult) => (
              <Grid item xs={4}>
                <TransformedCoordsDisplayTable
                  transformedElements={transformResult}

                />

              </Grid>
            ))}
          </Grid>

        }

        {!formMethods.formState.isSubmitting ?
          <Button sx={{ marginTop: 3 }} color="primary" variant="contained" fullWidth type="submit" >
            {formMethods.formState.isSubmitted ? "Resubmit" : "Submit"}
          </Button> :
          <LoadingButton sx={{ marginTop: 3 }} color="primary" loading fullWidth variant="outlined">
            Submit
          </LoadingButton>
        }

      </form>
    </FormProvider>
  )

}

export default OrbElementsTransformForm;
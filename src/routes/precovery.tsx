import React, { useState } from 'react';
import * as yup from 'yup';
import Header from "../components/header"
import PrecoveryFormDes from "../components/precoveryFormDes"
import PrecoveryFormSingle from "../components/precoveryFormSingle"
import '../css/App.css';
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/bootstrap-icons/bootstrap-icons.css'
import '../vendor/boxicons/css/boxicons.min.css'
import '../vendor/glightbox/css/glightbox.min.css'
import '../vendor/remixicon/remixicon.css'
import '../vendor/swiper/swiper-bundle.min.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import { CSVLink } from 'react-csv'
import axios from 'axios';

interface Observation {
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

// const validationSchema = yup.object({
//   x: yup
//     .string('Enter your x')
//     .required('Email is required'),
//   y: yup
//     .string('Enter your y')
//     .min(8, 'Password should be of minimum 8 characters length')
//     .required('Password is required'),
// });

function Precovery() {

  const [precoveryResults, setPrecoveryResults] = useState<Observation[]>([]);

  const methods = useForm({
    defaultValues: {
      inputType: "des",
      desInput: 'S0000001a  CAR 3.1814935923872047 -1.7818842866371896 0.5413047375097928 0.003965128676498027 0.006179760229698789 0.003739659079259056 10.315000000000 56534.00089159205 1 6 -1 MOPS',
      coordinateSystem: 'cartesian',
      "x": 2.29984500e+00,
      "y": -1.22649119e+00,
      "z": 3.82684685e-01,
      "vx": 5.12953566e-03,
      "vy": 1.01225247e-02,
      "vz": -4.12588907e-04,
      'mjd_tdb': 5.65340001e+04,
      "q": 1, 
      "e": 1, 
      "i": 1, 
      "an": 1, 
      "ap": 1, 
      "tp": 1, 
      "mjd_tdbCom":5.65340001e+04,
      "a": 3.19410998e+00, 
      "eKep": 1.94124171e-01, 
      "iKep": 2.76026153e+01, 
      "anKep": 3.14253651e+02, 
      "apKep": 2.29583820e+02, 
      "ma": 1.35804981e+02, 
      "mjd_tdbKep":5.65340001e+04,
    },
  });

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const onSubmit = async (data: any) => {

    // await sleep(3000);
    console.log(methods.getValues("inputType"))
    console.log(data)
    // setPrecoveryResults([{
    //   ra: 1,
    //   dec: 1,
    //   ra_sigma: 1,
    //   dec_sigma: 1,
    //   mag: 1,
    //   mag_sigma: 1,
    //   id: 88348264
    // }])

    let req = { data: { matches: [] } }
    if (methods.getValues("inputType") === "single") {
      if (methods.getValues("coordinateSystem") === "cartesian") {
        const { x, y, z, vx, vy, vz, mjd_tdb } = methods.getValues()
        req = await axios.post("https://precovery.api.b612.ai/precovery/singleorbit", { "orbit_type": methods.getValues("coordinateSystem"), x, y, z, vx, vy, vz, mjd_tdb })
      }
      else if (methods.getValues("coordinateSystem") === "cometary") {
        const { q, e, i, an, ap, tp, mjd_tdbCom } = methods.getValues()
        req = await axios.post("https://precovery.api.b612.ai/precovery/singleorbit", { "orbit_type": methods.getValues("coordinateSystem"), q, e, i, an, ap, tp, "mjd_tdb": mjd_tdbCom })
      }
      else if (methods.getValues("coordinateSystem") === "keplerian") {
        const { a, eKep, iKep, anKep, apKep, ma, mjd_tdbKep } = methods.getValues()
        const stateVector = {
          a, 
          e: eKep, 
          i: iKep, 
          an: anKep, 
          ap: apKep, 
          ma, 
          mjd_tdb: mjd_tdbKep
        }
        req = await axios.post("https://precovery.api.b612.ai/precovery/singleorbit", { "orbit_type": methods.getValues("coordinateSystem"), ...stateVector }) 
      }
      console.log(req)
        const matches = req.data.matches
        setPrecoveryResults(matches)
    }
    else {
      req = await axios.post("https://precovery.api.b612.ai/precovery/webinput", { "in_string": methods.getValues("desInput"), "file_type": "des" })
      console.log(req)
      const matches = req.data.matches
      setPrecoveryResults(matches)
    }
  };

  const watchFields = methods.watch();

  return (
    <div className="App">
      <Header />

      <section id="hero">
        <div className="hero-container">
          <h1>Test our Precovery Service</h1>
          <h2>Try it on your own orbit today!</h2>
          <a href="#about" className="btn-get-started scrollto">Get Started</a>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">

          <div className="row content">
            <div className="col-lg-4">
              <h2>Test your favorite orbit</h2>
              <h3>B612 Adam's precovery service searches historical data in the NOIRLab Source Catalog (NSC) dataset, along your defined orbit within a tolerance. For more information on the technique used, see: #####</h3>
            </div>
            <div className="col-lg-8 pt-4 pt-lg-0">
              <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <Controller
                    control={methods.control}
                    name="inputType"
                    render={({ field: { onChange, value, ref } }) => (
                      <RadioGroup
                        row
                        value={value}
                        onChange={onChange} // send value to hook form
                      >
                        <FormControlLabel value="des" control={<Radio />} label=".Des File" />
                        <FormControlLabel value="single" control={<Radio />} label="Single Orbit" />
                      </RadioGroup>
                    )}
                  />
                  {
                    methods.getValues("inputType") === "single" ?
                      <PrecoveryFormSingle /> :
                      <PrecoveryFormDes />
                  }

                  {/* <input type="submit"/> */}


                  {!methods.formState.isSubmitting ?
                    <Button color="primary" variant="contained" fullWidth type="submit" disabled={methods.formState.isSubmitted} >
                      Submit
                    </Button> :
                    <LoadingButton color="primary" loading fullWidth variant="outlined">
                      Submit
                    </LoadingButton>
                  }

                  <br></br>

                  <br></br>
                  {precoveryResults.length > 0 ?
                    <Button color="secondary" variant="contained" fullWidth >
                      <CSVLink data={precoveryResults} filename={"precoveryResults.csv"}> here</CSVLink>
                    </Button> :
                    <></>
                  }

                </form>
              </FormProvider>
            </div>

          </div>

        </div>
      </section>


    </div >
  );
}

export default Precovery;

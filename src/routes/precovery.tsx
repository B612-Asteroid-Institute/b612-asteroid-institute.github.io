import React, { useState } from 'react';
import * as yup from 'yup';
import logo from '../logo.svg';
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

interface Observation {
  ra: number
  dec: number
  ra_sigma: number
  dec_sigma: number
  mag: number
  mag_sigma: number
  id: number
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
      desInput: 'S0000001a  COM 1.251458729448 0.382243999742 9.304721017758 252.063850160767 185.610748171983 54067.969963746829 10.315000000000 54466.000000000000 1 6 -1 MOPS',
      coordinateSystem: 'cartesian',
      "x": 2.29984500e+00,
      "y": -1.22649119e+00,
      "z": 3.82684685e-01,
      "vx": 5.12953566e-03,
      "vy": 1.01225247e-02,
      "vz": -4.12588907e-04,
      'mjd_tdb': 5.65340001e+04,
    },
  });

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const onSubmit = async (data: any) => {

    await sleep(3000);
    console.log(methods.getValues("inputType"))
    console.log(data)
    setPrecoveryResults([{
      ra: 1,
      dec: 1,
      ra_sigma: 1,
      dec_sigma: 1,
      mag: 1,
      mag_sigma: 1,
      id: 88348264
    }])
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
                      Download Results
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

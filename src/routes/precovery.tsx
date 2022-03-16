import React from 'react';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';

function Precovery() {
  const formik = useFormik({
    initialValues: {
      inputType: 'des',
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
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
              <form onSubmit={formik.handleSubmit}>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={formik.values.inputType}
                  onChange={formik.handleChange}
                  // helperText={formik.touched.coordinateSystem && formik.errors.coordinateSystem}
                  id="inputType"
                  name="inputType"
                // label="Coordinate System"
                >
                  <FormControlLabel value="des" control={<Radio />} label=".Des File" />
                  <FormControlLabel value="single" control={<Radio />} label="Single Orbit" />
                </RadioGroup>
                {
                  formik.values.inputType === 'single' ?
                    <PrecoveryFormSingle /> :
                    <PrecoveryFormDes />
                }
              </form>
            </div>
          </div>

        </div>
      </section>


    </div >
  );
}

export default Precovery;

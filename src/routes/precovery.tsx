import React, { useState } from 'react';
import * as yup from 'yup';
import Header from "../components/header"
import PrecoveryForm from "../components/precoveryForm"
import '../css/App.css';
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/bootstrap-icons/bootstrap-icons.css'
import '../vendor/boxicons/css/boxicons.min.css'
import '../vendor/glightbox/css/glightbox.min.css'
import '../vendor/remixicon/remixicon.css'
import '../vendor/swiper/swiper-bundle.min.css'
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import { CSVLink } from 'react-csv'
import axios from 'axios';
import { map } from 'lodash'

function Precovery() {

  return (
    <div className="App">
      <Header />

      <section id="heroPrecovery">
        <div className="hero-container">
          <h1>Test our Precovery Service</h1>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <div className="row content">
            <div className="col-lg-12">
              <h2>What is Precovery?</h2>
              <p>The Asteroid Precovery Service extends the observational arc of candidate asteroids by searching the NOIRLab catalog for moving objects consistent with an input state vector.  Asteroid Precovery returns the list of observations (time, RA, DEC) of candidate precovery objects. For more information on the technique used, see <a href={'https://github.com/B612-Asteroid-Institute/precovery'} target={"_blank"} >the repository</a>.
                <br></br>
                <br></br>
                <b>About the NOIRLab catalog:</b> The NoirLab source catalog contains sky images over 7 years down to roughly 23rd magnitude. For more information on the NOIRLab Dataset <a href={'https://datalab.noirlab.edu/nscdr2/index.php'} target={"_blank"} >click here</a>.
              </p>

              <br></br>
              <br></br>
            </div>

          </div>
          <div className="row content">

            <div className="col-lg-4">
              <h4>Test An Orbit</h4>
              <p>State vectors can be input in Cartesian, Keplerian, or Cometary coordinates either as a single state vector, or via a .DES file. Precovery returns moving objects within this angular tolerance of the predicted location of the state vector at the time of the NOIRLab image. For now this is a single angular tolerance of 1 arc second.  Note that you may want to re-fit your orbit with newly found data points, and then search again for precovered observations with the updated orbit.  The reference frame used is that of JPL Horizons.
                <br></br>
                <br></br>
                The NOIRLab data used by the Precovery Service span a seven year range, from 9/23/2012 (MJD 56193) to 11/16/2019 (MJD 58804). Please be aware of this window when picking objects to run - short arcs from recent observations will not be ideal.
                <br></br>
                <br></br>
                After you have input your orbit, press Submit. When the process completes, a download button will appear, and you can download the precovered observations in .csv. Precovery can take up to a minute for each observation, so do not be alarmed if the submit button keeps spinning!
              </p>
            </div>
            <div className="col-lg-8 pt-4 pt-lg-0">
              <PrecoveryForm />
            </div>
          </div>

        </div>
      </section>


    </div >
  );
}

export default Precovery;

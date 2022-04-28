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

      <div id="heroPrecovery" className="hero">
      </div>

      <section id="about" className="about">
        <div className="container">
          <div className="row content">
            <div className="col-lg-12">
              <h3>ADAM :: Precovery</h3>
              <b>Search a set of catalogs for precovery observations of an object.</b>

              <br /><br />

              The objects can be specified via orbital elements or state vectors (given in
              usual IAU76/J2000 reference frame as <a
                href={"https://ssd.jpl.nasa.gov/horizons/manual.html#frames"}>used by JPL
                Horizons</a>), or by selecting one of the sample objects.  The search will
              return all matches within 1" of the predicted object position.  The typical
              search time is about 1 minute.  The results will be downloladable as a CVS
              file.

              <br /><br />

              Currently available catalogs:
              <ul>
                <li><a href={'https://datalab.noirlab.edu/nscdr2/index.php'} target={"_blank"} >NOIRLab Source Catalog</a>,
                  with XXX observations spanning 9/23/2012 (MJD 56193) to 11/16/2019 (MJD 58804).
                </li>
              </ul>

              <br />

              Please suggest potential features or report any bugs to our <a href={"https://github.com/B612-Asteroid-Institute/precovery/issues"}>GitHub Issue Tracker</a>.
              <br /> <br />

            </div>

            <hr />


            <div className="col-lg-12">
              <PrecoveryForm />
            </div>

          </div>

        </div>
      </section>


    </div >
  );
}

export default Precovery;

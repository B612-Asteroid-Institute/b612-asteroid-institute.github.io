import React from 'react';
import Header from "../components/header"
import Alert from '@mui/material/Alert';
import PrecoveryForm from "../components/precoveryForm"
import '../css/App.css';
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/bootstrap-icons/bootstrap-icons.css'
import '../vendor/boxicons/css/boxicons.min.css'
import '../vendor/glightbox/css/glightbox.min.css'
import '../vendor/remixicon/remixicon.css'
import '../vendor/swiper/swiper-bundle.min.css'

function Precovery() {

  return (
    <div className="App">
      <Header />

      <div id="heroThin" className="hero">
      </div>

      <section id="about" className="about">
        <div className="container">
          <div className="row content">
            <div className="col-lg-12">

              <Alert variant="outlined" severity="info">
                ADAM's Precovery Service is currently in a closed beta. If you would like to be kept 
                in the loop about future developments, 
                please <a href={'https://datalab.noirlab.edu/nscdr2/index.php'} target={"_blank"} rel="noreferrer" >join our mailing list</a>.
              </Alert>

              <br /><br />
              <h3>ADAM :: Precovery</h3>
              <b>Search a set of catalogs for precovery observations of an object.</b>

              <br /><br />

              The objects can be specified via orbital elements or state vectors (given in
              usual IAU76/J2000 reference frame as <a
                href={"https://ssd.jpl.nasa.gov/horizons/manual.html#frames"}>used by JPL
                Horizons</a>), or by selecting one of the sample objects.  The search will
              return all matches within 1" of the predicted object position.  The typical
              search time is about 1 minute.  The results will be downloladable as a CSV
              file.

              <br /><br />

              Currently available catalogs:
              <ul>
                <li><a href={'https://datalab.noirlab.edu/nscdr2/index.php'} target={"_blank"} rel="noreferrer" >NOIRLab Source Catalog</a>:
                  Includes 1,763,381,575 observations spanning 9/23/2012 (MJD 56193) to 11/16/2019 (MJD 58804).
                  The full NSC has 67,822,619,019 observations of 3,932,838,064 unique
                  objects, but we exclude any object with more than four detections as those
                  are likely to be static (stars, quasars, galaxies) and not moving
                  (asteroids/TNOs).
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

import Header from "../components/header"
import '../css/App.css';
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/bootstrap-icons/bootstrap-icons.css'
import '../vendor/boxicons/css/boxicons.min.css'
import '../vendor/glightbox/css/glightbox.min.css'
import '../vendor/remixicon/remixicon.css'
import '../vendor/swiper/swiper-bundle.min.css'
function About() {

  return (
    <div className="App">
      
      <Header />

      <section id="hero" className="hero">
        <div className="image-credit">
          <a href="https://eleanorlutz.com/mapping-18000-asteroids" target="_blank" rel="noreferrer" >Image by Eleanor Lutz</a>
        </div>
        <div className="hero-container">
          <h1>Asteroid Discovery, Analysis, and Mapping</h1>
          <h2>The Computational Engine to Map our Solar System
          </h2>
        </div>
      </section>


      <section id="about" className="about">
        <div className="container">

          <div className="row content">
            <div className="col-lg-6">
              <h2>The ADAM Platform: Asteroid Discovery, Analysis, and Mapping</h2>
              <h3>To help build a map of the Solar System that makes it easy to share, organize, calculate, visualize, and understand trajectories and location information for space. </h3>
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0">
              <p>
                As with many frontiers that have come before, the opening
                of the space frontier will be enabled by mapping.  A
                comprehensive map of the solar system enables scientific
                exploration, economic development, and the protection of the
                Earth from asteroid impacts.
                To help support this goal, we are building <b>ADAM</b>,
                the <b>Asteroid Discovery, Analysis and Mapping</b> computational platform. 
              </p>
              <p>
                ADAM implements state-of-the-art algorithms developed in collaboration with 
                our partners at UW's <a href="https://dirac.astro.washington.edu">DiRAC
                Institute</a> and the broader community, leveraging the scalability of the <a className="noDecoA" href="https://cloud.google.com/">Google Cloud Platform</a> to deliver:
              </p>
              <ul>
                <li><i className="ri-check-double-line"></i>Open-source astrodynamics services
                (integration, orbit fitting).</li>
                <li><i className="ri-check-double-line"></i>Algorithms for asteroid discovery (THOR).</li>
                <li><i className="ri-check-double-line"></i>Large-scale solar system simulations (population studies, MCMC trajectory modelling).</li>
                <li><i className="ri-check-double-line"></i>Space navigation services (trajectory optimization).</li>
              </ul>
            </div>
          </div>

        </div>
      </section>



      <section id="services" className="services section-bg">
        <div className="container">

          <div className="section-title">
            <h2>Services and Capabilities</h2>
            <p >A number of ADAM APIs are currently available to researchers in closed beta; contact us if you're interested. 
            Publicly available services can be accessed using the 'Services' menu at the top of the screen. 
            </p>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 icon-box">
              <div className="icon"><i className="bi bi-link-45deg"></i></div>
              <h4 className="title"><a href="#research">Asteroid Discovery</a></h4>
              <p className="description">Identification of previously unknown asteroids in large survey data, using the THOR algorithm and without the need for <i>tracklets</i>.
              </p>
            </div>
            <div className="col-lg-4 col-md-6 icon-box">
              <div className="icon"><i className="bi bi-check-lg"></i></div>
              <h4 className="title">Asteroid Precovery</h4>
              <p className="description">Fast and scalable search for previously unidentified observations of newly discovered asteroids in archival datasets.
              </p>
            </div>
            <div className="col-lg-4 col-md-6 icon-box">
              <div className="icon"><i className="bi bi-arrow-clockwise"></i></div>
              <h4 className="title">Large scale astrodynamics</h4>
              <p className="description">Cloud-based scalable n-body integration of billions of (real or simulated) objects, including monte-carlo simulations for impact scenarios.
              </p>
            </div>
            <div className="col-lg-4 col-md-6 icon-box">
              <div className="icon"><i className="bi bi-gear"></i></div>
              <h4 className="title">Python API</h4>
              <p className="description">Python client libraries to access ADAM's cloud APIs.
              </p>
            </div>
            <div className="col-lg-4 col-md-6 icon-box">
              <div className="icon"><i className="bi bi-brightness-high"></i></div>
              <h4 className="title">Visualization</h4>
              <p className="description">Web-based interactive 3D visualization of asteroid trajectories.
                </p>
                </div>
                <div className="col-lg-4 col-md-6 icon-box">
                  <div className="icon"><i className="bi bi-calendar4-week"></i></div>
                  <h4 className="title">With more to come...</h4>
                  <p className="description">Impact probability computation, space navigation services, and more.</p>
                </div>
            </div>

            <p >The source code is available in our <a href="https://github.com/b612-asteroid-institute">GitHub repositories</a>.</p>
          </div>
      </section>


      <section id="research" className="about">
        <div className="container">

          <div className="row content">
            <div className="col-lg-6">
              <h2>THOR: Tracklet-less Heliocentric Orbit Recovery</h2>
              <h3>Discovering asteroids in <i>any</i> dataset.</h3>
              <br/>
                <h3><a 
                  href="https://iopscience.iop.org/article/10.3847/1538-3881/ac042b/meta">Moeyens et
                  al., "THOR: An Algorithm for Cadence-independent Asteroid
                  Discovery", The Astronomical Journal, Volume 162, Number 4</a></h3>
                <h3><a  href="https://github.com/moeyensj/thor">https://github.com/moeyensj/thor</a></h3>
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0">
              <p>
                Asteroids are typically discovered by taking
                back-to-back images of the same area of the sky, and looking
                for objects whose position has shifted.  But the vast majority of the world's astronomical
                datasets are not taken with this <i>cadence</i>, making them
            difficult to use for asteroid searches. Algorithms to do so
            were generally thought to be computationally infeasible.
          </p>
          <p>
            In 2021, a team lead by UW graduate student and B612 Asteroid
            Institute Fellow <a href="https://dirac.astro.washington.edu/person/joachim-moeyens/">Joachim Moeyens</a> demonstrated
            <a href="https://iopscience.iop.org/article/10.3847/1538-3881/ac042b/meta"> an algorithm
              that can discover asteroid irrespective of the cadence of
              observations</a>. This novel technique &mdash; still under heavy development but already available
            within ADAM &mdash; could significantly increase the
            efficiency of existing survey programs, and enable researchers to
            dramatically expand the datasets usable for mapping of the
            Solar System.
          </p>
          <p>
          Our team is presently working to generalize THOR
            to all populations of the Solar System, including
            NEOs.
          </p>
          <ul>
            <li><i className="ri-checkbox-circle-fill"></i>Discover asteroids without the need for tracklets</li>
          <li><i className="ri-checkbox-circle-fill"></i>97% efficient at finding asteroids in ZTF, 1.5-2x better than existing codes</li>
        </ul>
        
    </div>
        </div >

      </div >
    </section >






    <section id="team" className="team section-bg">
      <div className="container">

        <div className="section-title">
          <h2>Core Project Team</h2>
          <p>ADAM is developed by a team of astrodynamicists, researchers, and enthusiasts supported by the <a href="https://b612foundation.org/">B612 Foundation</a>.</p>
        </div>

        <div className="row">

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/EdLu.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/edward-lu-3a997833/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Dr. Ed Lu</h4>
                <span>Principal Investigator &amp; Asteroid Institute Executive Director</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/MarioJuric.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/majuric/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Prof. Mario Juric</h4>
                <span>DiRAC Institute Director &amp; ADAM Project Scientist, University of Washington</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/JoachimMoeyens.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/joachim-moeyens/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Joachim Moeyens</h4>
                <span>Asteroid Institute Graduate Student Fellow, University of Washington</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/KathleenKiker.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/kathleen-kiker-53543b113/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Kathleen Kiker</h4>
                <span>Software Engineer, Asteroid Institute</span>
              </div>
            </div>
          </div>

        </div>
	      
	<div className="row">

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/NateTellis.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/nate-tellis/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Nate Tellis</h4>
                <span>Software Engineer, Volunteer</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/AllanPosner.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/allan-posner-4a7629/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Allan Posner</h4>
                <span>QA and Testing, Volunteer</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/AidanBerres.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/aidan-berres-4b608b168/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Aidan Berres</h4>
                <span>Science Validation and Software Development, Asteroid Institute and DiRAC</span>
              </div>
            </div>
          </div>

        </div>  
	<div className="section-title">
          <h2 id="supporting-team">Supporting Team</h2>
          
        </div>

        <div className="row">

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/JohnCarrico.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/johncarrico/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>John Carrico</h4>
                <span>Project Manager and Astrodynamicist</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/HankGrabowski.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/hank-grabowski-28448b2/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Hank Grabowski</h4>
                <span>Engineer and Astrodynamicist</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/SarahGreenstreet.jpg")} className="img-fluid" alt=""/>

              </div>
              <div className="member-info">
                <h4>Dr. Sarah Greenstreet</h4>
                <span>Senior Researcher</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/EmmieKing.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/emmie-king-44699550/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Emmie King</h4>
                <span>Software Engineer</span>
              </div>
            </div>
          </div>

        </div>
	      
	<div className="row">

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/SpencerNelson.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/spencer-nelson-41949042/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Spencer Nelson</h4>
                <span>Data Scientist and Software Engineer</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/MikeLoucks.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/mikeloucks/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Mike Loucks</h4>
                <span>Astrodynamicist</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/SamiraMotiwala.jpg")} className="img-fluid" alt=""/>
                <div className="social">

                  <a href="https://www.linkedin.com/in/samira-motiwala/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Samira Motiwala</h4>
                <span>Astrodynamicist</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <div className="member-img">
                <img src={require("../img/team/VivekVittaldev.jpg")} className="img-fluid" alt=""/>
                <div className="social">
                  <a href="https://www.linkedin.com/in/vvittaldev/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Dr. Vivek Vittaldev</h4>
                <span>Mission Researcher</span>
              </div>
            </div>
          </div>

        </div>      
      

      </div>
    </section>


    <footer id="footer">

      <div className="footer-top">

        <div className="social-links">
          <a href="https://twitter.com/b612foundation" className="twitter"><i className="bx bxl-twitter"></i></a>
          <a href="https://www.facebook.com/b612foundation/" className="facebook"><i className="bx bxl-facebook"></i></a>
          <a href="https://www.linkedin.com/company/b612foundation-asteroid/" className="linkedin"><i className="bx bxl-linkedin"></i></a>
        </div>
        <br></br>
        <div >The Asteroid Decision Analysis and Mapping (ADAM) platform is a project of the B612 Foundation's  Asteroid Institute.</div>
    </div>

  </footer >

  {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div >
  );
}

export default About;

import Header from "./components/header"
// import './vendor/bootstrap/css/bootstrap.min.css'
import './vendor/bootstrap-icons/bootstrap-icons.css'
import './vendor/boxicons/css/boxicons.min.css'
import './vendor/glightbox/css/glightbox.min.css'
import './vendor/remixicon/remixicon.css'
import './vendor/swiper/swiper-bundle.min.css'
import './css/App.css';

function App() {

  return (
    <div className="App">
      
      <Header />

      <section id="heroSplash" className="hero">
        <div className="image-credit">
          <a href="https://eleanorlutz.com/mapping-18000-asteroids" target="_blank" rel="noreferrer">Image by Eleanor Lutz</a>
        </div>
        <div className="hero-container">
          <h1>Asteroid Discovery Analysis and Mapping</h1>
          <h2>The Computational Engine to Map our Solar System
          </h2>
        </div>
      </section>

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

export default App;

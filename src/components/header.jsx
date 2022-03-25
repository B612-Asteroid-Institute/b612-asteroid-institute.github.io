import React from 'react';
import logo from '../logo.svg';
import { Outlet, Link } from "react-router-dom";
import '../css/App.css';
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/bootstrap-icons/bootstrap-icons.css'
import '../vendor/boxicons/css/boxicons.min.css'
import '../vendor/glightbox/css/glightbox.min.css'
import '../vendor/remixicon/remixicon.css'
import '../vendor/swiper/swiper-bundle.min.css'
import {v4 as uuidv4} from "uuid"

function Header() {
  const user = uuidv4()
  return (
      <header id="header" className="fixed-top d-flex align-items-center header-transparent">
        <div className="container d-flex align-items-center justify-content-between">

          <div className="logo">
            <h1>
              <Link to="/">
         <img src={require("../img/B612_ADAM_logo.png")} alt="B612 ADAM" class="img-fluid"/></Link></h1>
          </div>

          <nav id="navbar" className="navbar">
            <ul>
              <li><Link to="/"><a className="nav-link scrollto active" href="#hero">Home</a></Link></li>
              {/* <li><a className="nav-link scrollto" href="#about">About</a></li> */}
              {/* <li><a className="nav-link scrollto" href="#services">The Platform</a></li> */}
              {/* <li><a className="nav-link scrollto" href="#research">Algorithms</a></li> */}
              {/* <li><a className="nav-link scrollto" href="#team">Team</a></li> */}
              <li>
                <Link className="nav-link" to={`/precovery?user=${user}`}>Precovery</Link>
              </li>
              <li><a className="nav-link scrollto" href="https://github.com/b612-asteroid-institute">GitHub&nbsp;<span className="bi bi-github"></span></a></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>

            <Outlet />
          </nav>

        </div>
      </header>
  )}

export default Header
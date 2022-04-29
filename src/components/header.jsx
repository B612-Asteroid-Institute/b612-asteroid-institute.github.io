import { React, useState, useEffect } from 'react';
import logo from '../logo.svg';
import { Outlet, Link } from "react-router-dom";
import '../css/App.css';
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/bootstrap-icons/bootstrap-icons.css'
import '../vendor/boxicons/css/boxicons.min.css'
import '../vendor/glightbox/css/glightbox.min.css'
import '../vendor/remixicon/remixicon.css'
import '../vendor/swiper/swiper-bundle.min.css'
import { v4 as uuidv4 } from "uuid"
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Menu as MenuIcon } from "@mui/icons-material";
import Box from '@mui/material/Box';


const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const useWindowDimensions = () =>  {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function Header() {
  const [scroll, setScroll] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { height, width } = useWindowDimensions();
  const heroClientHeight = document.getElementsByClassName('hero')[0]?.clientHeight
  const headerClientHeight = document.getElementById('header')?.clientHeight

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > heroClientHeight - headerClientHeight / 2
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck)
      }
    })
  })

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };


  const LinkList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem >
          <Link className="nav-link" to="/">Home</Link>
        </ListItem>
        <ListItem >
          <Link className="nav-link" to={`/about`}>About</Link>
        </ListItem>
        <ListItem >
          <Link className="nav-link" to={`/precovery?user=${user}`}>Precovery</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem >
          <a className="nav-link scrollto" href="https://github.com/b612-asteroid-institute">GitHub&nbsp;<span className="bi bi-github"></span></a>
        </ListItem>
      </List>
    </Box>
  )


  const DrawerNavigation = () => {
    return (
      <>
        <IconButton
          edge="start"
          sx={{ mr: 2, width: 30, height: 30, color: "#fff" }}
          // aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon color="white" />
        </IconButton>
        <Drawer
          sx={{ width: 1 / 2 }}
          anchor="right" //from which side the drawer slides in

          variant="temporary" //if and how easily the drawer can be closed

          open={drawerOpen} //if open is true, drawer is shown

          onClose={toggleDrawer(false)} //function that is called when the drawer should close

          onOpen={toggleDrawer(true)} //function that is called when the drawer should open
        >
          <LinkList />
        </Drawer>
      </>
    )
  }


  const user = uuidv4()
  return (
    <>
    <header id="header" className={`fixed-top d-flex align-items-center ${scroll ? "header-scrolled" : "header-transparent"}`}>
      <div className="container d-flex align-items-center justify-content-between">

        <div className="logo">
          <h1>
            <Link to="/">
              <img src={require("../img/asteroid-institute.png")} alt="B612 ADAM" className="img-fluid" /></Link></h1>
        </div>

        <nav id="navbar" className="navbar">
          <ul>
            <li><Link className="nav-link" to={`/about`}>About</Link></li>
            {/* <li><a className="nav-link scrollto" href="#about">About</a></li> */}
            {/* <li><a className="nav-link scrollto" href="#services">The Platform</a></li> */}
            {/* <li><a className="nav-link scrollto" href="#research">Algorithms</a></li> */}
            {/* <li><a className="nav-link scrollto" href="#team">Team</a></li> */}
            <li className="dropdown">
              <a href="#">
		<span>Services</span>
		<i className="bi bi-chevron-down"></i>
	      </a>
              <ul>
                  <li><Link className="nav-link" to={`/precovery?user=${user}`}>Precovery</Link></li>
              </ul>
            </li>
            <li><a className="nav-link scrollto" href="https://github.com/b612-asteroid-institute">GitHub&nbsp;<span className="bi bi-github"></span></a></li>
          </ul>
          {/* <i className="bi bi-list mobile-nav-toggle"></i> */}
          { width < 991 ?
            <DrawerNavigation /> : <></>
          }

          <Outlet />
        </nav>

      </div>
    </header>
    </>
  )
}

export default Header
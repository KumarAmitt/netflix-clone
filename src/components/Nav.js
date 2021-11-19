import React, {useEffect, useState} from 'react';
import './Nav.css';


const Nav = () => {
  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false)
      }
    });
    return () => window.removeEventListener("scroll")
  }, [])

  return (
      <div className={`nav ${show && "nav__black"}`}>
        <img className="nav__logo" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="Netflix Logo"/>
        <img className="nav__avatar" src="https://www.shareicon.net/data/2016/05/24/770128_man_512x512.png" alt="Profile Image"/>
      </div>
  );
};

export default Nav;
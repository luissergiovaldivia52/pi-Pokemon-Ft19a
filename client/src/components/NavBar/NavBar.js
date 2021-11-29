import React from "react";
import { NavLink } from "react-router-dom";
import Search from "../Search";
import Logo from "../../logoHenry.png";

import "./NavBar.css";

export default function NavBar() {
  return (
    <header className="navbar">
      <div>
        <img
          id="logoHenry"
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
      </div>
      
      <nav>
        <ul className="list">
          <li className="list-item">
            {/* <NavLink exact={true} to="/" >Inicio</NavLink>
                        <NavLink exact={true} to="/countries">Home</NavLink>
                        <NavLink to="/activity" >Activity</NavLink> */}

            <NavLink end to="/">
              Inicio
            </NavLink>
            <NavLink end to="/pokermons">
              Home
            </NavLink>
            <NavLink to="/type">Type</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

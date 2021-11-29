import React from "react";
//import { NavLink } from "react-router-dom";
// import Logo from  '../../logoHenry.png'
import "./inicio.css";

class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div id="inicio"></div>
        {/* <div id="inicio"> */}
        {/* <NavLink to="/home" > <img className="logo" src={Logo} alt="to home"/> </NavLink> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Inicio;

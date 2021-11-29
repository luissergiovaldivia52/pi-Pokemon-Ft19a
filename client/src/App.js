import React from "react";
import NavBar from "./components/NavBar/NavBar";

import { Route } from "react-router-dom";
import Detalle from "./components/Detalle";
import Home from "./components/Home";
import Inicio from "./components/Inicio/Inicio";
import Formulario from "./components/Formulario/Formulario";


import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Henry Pokemon</h1>
      <NavBar />

<Route exact path="/" component={Inicio} />
<Route exact path="/pokemons" component={Home} />

<Route path="/pokemons/:id" component={Detalle} />
<Route path="/type" component={Formulario} /> 
    </div>
  );
}

export default App;

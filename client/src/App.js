import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";


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
      <Routes>
<Route exact path="/" element={<Inicio/>} /> 
<Route exact path="/pokemons" element={<Home/>} />

<Route path="/pokemons/:id" element={<Detalle/>} />
<Route path="/type" element={<Formulario/>} /> 
</Routes>
    </div>
  );
}

export default App;

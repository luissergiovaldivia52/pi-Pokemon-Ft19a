import React from "react";
import { NavLink } from "react-router-dom";

import "./Card.css";

const Card = ({ image, name, id, continents }) => {
 
  return (
    <div className = "box">
       
        <img src={image} alt={name} />
        
      
 
        
          
            <p>{continents}</p>
          

 

      <NavLink to={`/pokemons/${id}`}>{name}</NavLink>
      <p>{id}</p>
    </div>
  );
};

export default Card;

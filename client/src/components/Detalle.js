import React from "react";
import { connect } from "react-redux";

import { getPokemon } from "../folderRedux/actions/pokemonActions";

import "./Inicio/inicio.css";

//  Los campos mostrados en la ruta principal para cada país
//     (imagen de la bandera, nombre, código de país de 3 letras y continente)
//  Código de país de 3 letras (id)
//  Capital
//  Subregión
// Área (Mostrarla en km2 o millones de km2)
//  Población
//  Actividades turísticas con toda su información asociada

class Detalle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //const { match: { params } } = this.props;
  
    let urlElements = window.location.href.split("/");

   
    let urlElelement = urlElements[4];

    

    //let id =params.id ;
    let id = urlElelement;
    this.props.getPokemons(id);
  }

  render() {
    // const {activity} = this.props.country[1].activity
    return (
      <div>
        <div id="detalle">
          {this.props.pokemon?.length >= 0 && (
            <div>
              <div>
                <p>imagen de la bandera</p>
                <img
                  src={this.props.country[0].flags.png}
                  alt={this.props.country[0].name.official}
                />
              </div>

              <div>
                <p> nombre: {this.props.country[0].name.official} </p>
              </div>

              <div>
                <p>código de país : {this.props.country[0].cca3}</p>
              </div>

              <div>
                <p>continente: {this.props.country[0].continents}</p>
              </div>

              <div>
                <p>Capital: {this.props.country[0].capital} </p>
              </div>

              <div>
                <p>Subregión: {this.props.country[0].subregion}</p>
              </div>

              <div>
                <p> Área: {this.props.country[0].area} m2 </p>
              </div>

              <div>
                <p>Población: {this.props.country[0].population} </p>
              </div>

              <div>
                <p>Actividades turísticas: </p>

                <ul className="activity">
                  {this.props.country[1].activity.map((e) => (
                    <li>
                      <div className="divActivity">
                        <p>{e.name} </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemon,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPokemon: (id) => dispatch(getPokemon(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detalle);

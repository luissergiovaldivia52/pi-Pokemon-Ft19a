import React from "react";
import { connect } from "react-redux";

import { getPokemon } from "../folderRedux/actions/pokemonActions";

import "./Inicio/inicio.css";


// Los campos mostrados en la ruta principal 
//para cada pokemon (imagen, nombre y tipos)
// Número de Pokemon (id)
// Estadísticas (vida, fuerza, defensa, velocidad)
// Altura y peso

class Detalle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        //const { match: { params } } = this.props;

        let urlElements = window.location.href.split("/");


        let urlElelement = urlElements[4];



        //let id =params.id ;
        let id = urlElelement;
        console.log("llama al action getPokemon")
        this.props.getPokemon(id);
    }

    //console.log("Estamos en detalle")

    render() {
        // this.props.getPokemon(11)
        return (
            <div>
                <div id="detalle">
                    {this.props.pokemon?.length > 0 && (
                        <div>
                            <div>
                                <p>imagen del Pokemon</p>
                                <img
                                    src={this.props.pokemon[0].imagen}
                                    alt={this.props.pokemon[0].name}
                                />
                            </div>

                            <div>
                                <p> nombre: {this.props.pokemon[0].name} </p>
                            </div>



                            <div>
                                <p>Id del Pokemon: {this.props.pokemon[0].id}</p>
                            </div>
                            <div>
                                <p>Height : {this.props.pokemon[0].height}</p>
                            </div>
                            <div>
                                <p>Weight: {this.props.pokemon[0].weight}</p>
                            </div>

                            <div>
                                <p>Life: {this.props.pokemon[0].hp} </p>
                            </div>

                            <div>
                                <p>Fuerza: {this.props.pokemon[0].hp}</p>
                            </div>

                            <div>
                                <p> Defense: {this.props.pokemon[0].defense}  </p>
                            </div>

                            <div>
                                <p>Speed {this.props.pokemon[0].speed} </p>
                            </div>

                            <div>
                                <p>Type: </p>

                                <ul className="activity">
                                    {this.props.pokemon[0].type.map((e) => (
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

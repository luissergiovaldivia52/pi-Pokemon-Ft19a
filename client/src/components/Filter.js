import React, { Component } from "react";
import { connect } from "react-redux";
import {setFilter} from "../folderRedux/actions/pokemonActions";


class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSelectFilterOrigen = async (e) => {
    await this.props.setFilter(e.target.value);
  };
  handleSelectFilterType = async (e) => {
    await this.props.setFilter(this.props.pokemons, e.target.value);
  };

  render() {
    return (
      <div className="order">
        <div id="order-type">
          Filter by Origen{" "}
          <select
            name="choiceFilterType"
            onChange={this.handleSelectFilterOrigen}
          >
            <option value=" ">ALL</option>
            <option value="api">API</option>
            <option value="database">dataBase</option>
          </select>
        </div>
        <div id="order-type">
          Filter by Type{" "}
          <select
            name="choiceFilterOrigen"
            value={this.props.size}
            onChange={this.handleSelectFilterType}
          >
            <option value=" ">ALL</option>
            <option value="bug">Bug</option>
            <option value="poison">Poison</option>
            <option value="grass">Grass</option>
            <option value="fire">Fire</option>
            <option value="flying">Flying</option>
            <option value="water">Water</option>
            <option value="normal">Normal</option>
            <option value="electric">Electric</option>
            <option value="ground">Ground</option>
            <option value="fairy">Fairy</option>
            <option value="fighting">Fighting</option>
            <option value="psychic">Psychic</option>
            <option value="rock">Rock</option>
          </select>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemon,
    pokemons: state.pokemons,

    size: state.size,
    page: state.page,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFilter: (pokemons, filter) => dispatch(setFilter(pokemons, filter)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

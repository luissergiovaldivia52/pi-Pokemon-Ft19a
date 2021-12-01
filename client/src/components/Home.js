import React from "react";
import { connect } from "react-redux";

import "./Inicio/Inicio";

import {
  getPokemons,
  setPage,
  setName,
  setOrder,
  setFilter,
} from "../folderRedux/actions/pokemonActions";
import Order from "./Order";
import Card from "./Card/Card.js";
import "./Inicio/Inicio";
import Search from "./Search";
import Timer from "./Time";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",

      menssages: "",
    };
  }

  changePage = (page) => {
    this.props.setPage(page);

    this.props.getPokemons(
      page,
      this.props.order,
      this.props.filter,
      this.props.name
    );
  };

  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (menssage) => {
    await this.setState((currentState) => ({
      menssages: menssage,
    }));
    await this.props.setName(this.state.menssages);

    await this.props.getPokemons(
      this.props.page,
      this.props.order,
      this.props.filter,
      this.props.name
    );
    await this.props.setPage(1);
  };

  render() {
    return (
      <div>
        <div>
          <Order />
        </div>
        <div>
          <Search onSubmit={this.handleSubmit} />

          <p>{this.state.menssages}</p>
        </div>

        <div id="home">
          <button
            disabled={this.props.page === 0}
            onClick={() => {
              this.changePage(this.props.page - 1);
            }}
          >
            previous
          </button>
          <label>{this.props.page}</label>
          <button
            disabled={this.props.pokemons?.count <= this.props.page * 4}
            onClick={() => {
              this.changePage(this.props.page + 1);
            }}
          >
            next
          </button>

          {this.props.pokemons?.result?.length >= 0 &&
            this.props.pokemons.result.map((e) => {
              return <Card image={e.imagen} name={e.name} id={e.id} />;
            })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons,
    name: state.name,

    page: state.page,
    order: state.order,

    filter: state.filter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPokemons: (page, name, order, filter) =>
      dispatch(getPokemons(page, name, order, filter)),

    setName: (name) => dispatch(setName(name)),
    setOrder: (order) => dispatch(setOrder(order)),
    setFilter: (filter) => dispatch(setFilter(filter)),
    setPage: (page) => dispatch(setPage(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

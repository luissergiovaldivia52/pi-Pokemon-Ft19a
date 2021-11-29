import React, { Component } from "react";
import { connect } from "react-redux";

//import styled from 'styled-components'
import {
  getPokemons,
  setPage,
  setOrder,
  setFilter,
  setName,
} from "../folderRedux/actions/pokemonActions";

// const SearchInput = styled.input
// `
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      message: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    //  this.state.name = this.state.input;

    // await this.props.getCountries(this.props.page, this.props.order,this.props.filter,this.props.name )                   //guardamos en store el name
    //  await this.props.setName(this.state.input);
    //await this.props.setPage(1)
     this.props.onSubmit(this.state.message);
    this.setState({ message: "" });
  };

  handleOnChange = (e) => {
    
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit1 = async (e) => {
    e.preventDefault();
    let prueba = "Argentina";
    // await this.props.setName(prueba);
    // await this.props.setPage(1);
    // await  console.log("Estoy en el search " + this.props.name);
    //this.state.name = this.state.input;

    // await this.props.getCountries(this.props.page, this.props.order,this.props.filter,this.props.name )                   //guardamos en store el name
    // buscamos efectivamente
    // await this.props.setPage(1)

    //setInput("")

    //await this.props.onSubmit(this.state.message);
    //this.setState({ message: "" })
  };
  //  filterVivo = ()=>{
  //       this.props.statusFilter("unknown")
  //   }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.message}
          name="message"
          type="text"
          placeholder="Search..."
          onChange={this.handleOnChange}
        />
        {/* <button type="button" onClick={this.filterVivo} >unknown</button> */}
        <button type="submit">🔍</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons,
    name: state.name,
    order: state.order,
    page: state.page,
    filter: state.filter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPage: (page) => dispatch(setPage(page)),
    setName: (name) => dispatch(setName(name)),
    setOrder: (order) => dispatch(setOrder(order)),
    setFilter: (filter) => dispatch(setFilter(filter)),
    getPokemons: (page, order, filter, name) =>
      dispatch(getPokemons(page, order, filter, name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

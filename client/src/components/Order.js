import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPokemons,
  setOrder,

} from "../folderRedux/actions/pokemonActions";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSelectOrder = async (e) => {
    await this.props.setOrder(e.target.value);
    await this.props.getPokemons(
      this.props.page,
      this.props.order,
      this.props.filter,
      this.props.name
    );
  };

  handleSelectFilterOrigen = async (e) => {
    await this.props.setFilter(e.target.value);
    await this.props.getPokemons(
      this.props.page,
      this.props.order,
      this.props.filter,
      this.props.name
    );
  };
  handleSelectFilterType = async (e) => {
    await this.props.setFilter(e.target.value);
    await this.props.getPokemons(
      this.props.page,
      this.props.order,
      this.props.filter,
      this.props.name
    );
  };

  render() {
    return (
      <div className="order">
        <div id="order-type">
          Order{" "}
          <select name="choiceOrder" onChange={this.handleSelectOrder}>
            <option value="lastest">Lastest</option>
            <option value="pokLowest"> Pokemon Lowest</option>
            <option value="pokHighest">Pokemon Highest</option>
            <option value="hpLowest"> Force Lowest</option>
            <option value="hpHighest">Force Highest</option>
          </select>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons,
    name: state.name,
    order: state.order,
    page: state.page,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setOrder: (order) => dispatch(setOrder(order)),

    getPokemons: (page, order, name) =>
      dispatch(getPokemons(page, order, name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);

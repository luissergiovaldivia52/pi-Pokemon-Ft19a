import React from "react";

import { connect } from "react-redux";

import { createPokemon } from "../../folderRedux/actions/pokemonActions";

import "./Formulario.css";

class Formulario extends React.Component {
  constructor(props) {
    super(props);
    this.displayData = [];
    this.allType = [];
    this.estadoActual = false;
    this.estadoAnterior = false;
    this.submitName = false;

    this.state = {
      name: "",
      life: "",
      strenght: "",
      defense: "",
      speed: "",
      hight: "",
      weight: "",
      type: "",

      showdata: this.displayData,
      postVal: "",
    };

    this.appendData = this.appendData.bind(this);
    this.prependData = this.prependData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  appendData(input) {
    this.submitName = true;
    this.displayData.push(
      <div id="display-data">
        <pre>{this.state.postVal}</pre>
      </div>
    );
    this.allType.push(this.state.postVal);
    this.setState({
      showdata: this.displayData,
      type: this.allType,
      postVal: "",
    });
  }

  prependData(input) {
    this.submitName = true;
    this.displayData.shift(
      <div id="display-data">
        <pre>{this.state.postVal}</pre>
      </div>
    );
    this.allType.shift(this.state.postVal);
    this.setState({
      showdata: this.displayData,
      type: this.allType,
      postVal: "",
    });
  }

  handleChange(e) {
    let getTextAreaValue = e.target.value;
    this.setState({
      postVal: getTextAreaValue,
    });
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  subCreatePokemon = (e) => {
    e.preventDefault();

    if (this.submitName) {
      this.submitName = false;

      return;
    }
    let array = this.state.type;
    const pokemon = {
      name: this.state.name,
      life: this.state.life,
      strenght: this.state.strenght,
      defense: this.state.defense,
      speed: this.state.speed,
      height: this.state.height,
      weight: this.state.weight,
    };

    for (let i = 0; i < array.length; i++) {
      pokemon.types = this.state.type.shift();

      this.props.createPokemon(pokemon);
    }

    alert("agregado con exito");
    e.target.reset();

    this.displayData = [];
    this.allPokemon = [];
    this.state.postVal = [];
    this.setState({
      showdata: this.displayData,
    });
  };

  render() {
    return (
      <section id="cart">
        <form onSubmit={this.subCreatePokemon}>
          {/*----------------------------------*/}
          {/* ----------name------------------ */}
          {/*----------------------------------*/}

          <div id="container-name">
            <div id="name">
              {/********************************/}
              {/******** label name************ */}
              {/*********************************/}
              <div id="name-label">
                <label>Pokemon</label>
              </div>
              {/******************************/}
              {/********* input name***********/}
              {/********************************/}
              <div id="name-input">
                <input
                  name="name"
                  type="text"
                  required
                  onChange={this.handleInput}
                ></input>
              </div>
            </div>
          </div>

          {/*-----------------------------------*/}
          {/*------------ life -------------- */}
          {/*------------------------------------*/}
          <div id="life"></div>

          {/*-----------------------------------*/}
          {/*------------  strenght   ------------ */}
          {/*------------------------------------*/}
          <div id="strenght">
            {/********************************/}
            {/******** label life************ */}
            {/*********************************/}
            {/* <div className="life-label">*/}
            <div className="strenght-label">
              <label>Life</label>
            </div>
            {/*******************************************/}
            {/******** input life************ */}
            {/********************************************/}
            <div id="life-input">
              <input
                name="life"
                type="Text"
                required
                onChange={this.handleInput}
              ></input>
            </div>
            {/********************************/}
            {/******** label force************ */}
            {/*********************************/}
            <div className="strenght-label">
              <label>Strenght</label>
            </div>

            {/*******************************************/}
            {/******** input force**************/}
            {/*******************************************/}
            <div id="strenght-input">
              <input
                name="strenght"
                type="Text"
                required
                onChange={this.handleInput}
              ></input>
            </div>

            {/*-----------------------------------*/}
            {/*------------  defense   ------------ */}
            {/*------------------------------------*/}
            <div id="defense">
              {/********************************/}
              {/******** label defense************ */}
              {/*********************************/}

              <div className="defense-label">
                <label>Defense</label>
              </div>
              <div id="defense">
                {/*******************************************/}
                {/******** input defense  ********************/}
                {/*******************************************/}
                <div id="defense-input">
                  <input
                    name="defense"
                    type="Text"
                    required
                    onChange={this.handleInput}
                  ></input>
                </div>
              </div>
            </div>

            {/*-----------------------------------*/}
            {/*------------  speed   ------------ */}
            {/*------------------------------------*/}
            <div id="speed">
              {/********************************/}
              {/******** label speed************ */}
              {/*********************************/}

              <div className="speed-label">
                <label>Speed</label>
              </div>
              <div id="speed">
                {/*******************************************/}
                {/******** input speed**************/}
                {/*******************************************/}
                <div id="speed-input">
                  <input
                    name="speed"
                    type="Text"
                    required
                    onChange={this.handleInput}
                  ></input>
                </div>
              </div>
            </div>

            {/*-----------------------------------*/}
            {/*------------  height   ------------ */}
            {/*------------------------------------*/}
            <div id="height">
              {/********************************/}
              {/******** label height************ */}
              {/*********************************/}

              <div className="height-label">
                <label>Height</label>
              </div>
              <div id="height">
                {/*******************************************/}
                {/******** input height**************/}
                {/*******************************************/}
                <div id="height-input">
                  <input
                    name="height"
                    type="Text"
                    required
                    onChange={this.handleInput}
                  ></input>
                </div>
              </div>
            </div>

            {/*-----------------------------------*/}
            {/*------------  weight   ------------ */}
            {/*------------------------------------*/}
            <div id="weight">
              {/********************************/}
              {/******** label weight************ */}
              {/*********************************/}

              <div className="weight-label">
                <label>Weight</label>
              </div>
              <div id="weight">
                {/*******************************************/}
                {/******** input weight**************/}
                {/*******************************************/}
                <div id="weight-input">
                  <input
                    name="weight"
                    type="Text"
                    required
                    onChange={this.handleInput}
                  ></input>
                </div>
              </div>
            </div>
          </div>

          <div id="container-type-temporada">
            <div>
              {/*---------------------------------------*/}
              {/*-----------Type------------------ */}
              {/*---------------------------------------*/}
              <div id="container-type">
                <div id="type">
                  {/********************************/}
                  {/******** label type************ */}
                  {/*********************************/}
                  <div id="type-label">
                    <label>Type</label>
                  </div>
                  {/******************************/}
                  {/********* input type******/}
                  {/********************************/}
                  <div id="mainContainer">
                    <textarea
                      rows="1"
                      cols="25"
                      value={this.state.postVal}
                      onChange={this.handleChange}
                    ></textarea>
                    <div id="botones">
                      <input
                        type="submit"
                        name="agregar"
                        className="button"
                        onClick={this.appendData}
                        value="Agregar"
                      />
                      <input
                        type="submit"
                        name="quitar"
                        className="button"
                        onClick={this.prependData}
                        value="Quitar"
                      />
                    </div>

                    <div id="display-data-Container">{this.displayData}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="button-checkout">
            <button name="checkout" className="button" type="submit">
              Checkout
            </button>
          </div>
        </form>
      </section>
    );
  }
}
export default connect(
  (state) => ({
    pokemon: state.pokemon,
  }),
  { createPokemon }
)(Formulario);

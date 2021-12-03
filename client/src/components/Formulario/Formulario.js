import React from "react";

import { connect } from "react-redux";

import { createPokemon } from "../../folderRedux/actions/pokemonActions";

import "./Formulario.css";

class Formulario extends React.Component {
  constructor(props) {
    super(props);
    this.displayData = [];
    this.allPokemon = [];

    this.state = {
      name: "",
      life: "",
      force: "",
      defense: "",
      speed: "",  

      showdata: this.displayData,
      postVal: "",
    };

    this.appendData = this.appendData.bind(this);
    this.prependData = this.prependData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  appendData() {
    this.displayData.push(
      <div id="display-data">
        <pre>{this.state.postVal}</pre>
      </div>
    );
    this.allPokemon.push(
        this.state.postVal
    )
    this.setState({
      showdata: this.displayData,
      pokemon:this.allPokemon,
      postVal: "",
    });
    console.log("appendData " + this.allPökemon)
  }

  prependData() {
    this.displayData.shift(
      <div id="display-data">
        <pre>{this.state.postVal}</pre>
      </div>
    );
    this.allPokemon.shift(
      this.state.postVal
  )
    this.setState({
      showdata: this.displayData,
      pokemon:this.allPokemon,
      postVal: "",
    });
    console.log("prependData " + this.allPokemon)
  }

  handleChange(e) {
    let getTextAreaValue = e.target.value;
    this.setState({
      postVal: getTextAreaValue,
    });
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    //e.target.value = "";
  };
  createPokemon = (e) => {
    e.preventDefault();
  let array = this.state.pokemon
  const pokemon = {
    name: this.state.name,
    life: this.state.life,
    force: this.state.force,
   // temporada: this.state.temporada,
    pokemon: "",
  };

    for (let i = 0; i < array.length; i++) {
      pokemon.type = array[i];
      console.log("este es el country primero " +  this.state.pokemon)
      this.props.createPokemon(pokemon);
     
    }
   

    
    alert("agregado con exito");
    e.target.reset();
         
       this.displayData = [];
       this.allPokemon = []
      
       this.setState({
        showdata: this.displayData,
        pokemon: this.pokemon,
        
      });
     
    
    

  };

  render() {
   
    return (
      <section id="cart">
        <form onSubmit={this.createPokemon}>


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


          ,{/*-----------------------------------*/}
          {/*------------ life y fuerza------- */}
          {/*------------------------------------*/}
          <div id="container-life-fuerza">


            {/*-----------------------------------*/}
            {/*------------ life -------------- */}
            {/*------------------------------------*/}
            <div id="life">
              {/********************************/}
              {/******** label life************ */}
              {/*********************************/}
              <div className="life-label">
                <label>Life</label>
              </div>
              <div id="container-dificultad-max-min">
                {/********************************/}
                {/******** life  ************ */}
                {/*********************************/}
                <div id="dificultad-maximun">
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
                </div>
              </div>
            </div>

            {/*-----------------------------------*/}
            {/*------------  force   ------------ */}
            {/*------------------------------------*/}
            <div id="force">
              {/********************************/}
              {/******** label force************ */}
              {/*********************************/}
              <div className="force-label">
                <label>Force</label>
              </div>
              <div id="container-force">
                  {/*******************************************/}
                  {/******** input force**************/}
                  {/*******************************************/}
                  <div id="defense-input">
                    <input
                      name="force"
                      type="Text"
                      required
                      onChange={this.handleInput}
                    ></input>
                  </div>
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
                    <div>
                      <input
                        type="submit"
                        className="button"
                        onClick={this.appendData}
                        value="Agregar"
                      />
                      <input
                        type="submit"
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
            <div>
              {/*---------------------------------------*/}
              {/*-----------temoorada------------------ */}
              {/*---------------------------------------*/}
              <div id="container-temporada">
                <div id="temporada-formulario">
                  {/********************************/}
                  {/******** label temporada************ */}
                  {/*********************************/}
                  <div id="temporada-label">
                    <label>Temporada</label>
                  </div>
                  {/******************************/}
                  {/********* input temporada******/}
                  {/********************************/}
                  <div id="temporada-input">
                    <input
                      name="temporada"
                      type="Text"
                      required
                      onChange={this.handleInput}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="button-checkout">
            <button id="button-form" type="submint">
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

import React from "react";

import { connect } from "react-redux";

import { createPokemon } from "../../folderRedux/actions/pokemonActions";

import "./Formulario.css";

class Formulario extends React.Component {
  constructor(props) {
    super(props);
    this.displayData = [];
    this.allCountry = [];

    this.state = {
      name: "",
      dificultad: "",
      duracion: "",
      temporada: "",
      country: "",  

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
    this.allCountry.push(
        this.state.postVal
    )
    this.setState({
      showdata: this.displayData,
      country:this.allCountry,
      postVal: "",
    });
    console.log("appendData " + this.allCountry)
  }

  prependData() {
    this.displayData.shift(
      <div id="display-data">
        <pre>{this.state.postVal}</pre>
      </div>
    );
    this.allCountry.shift(
      this.state.postVal
  )
    this.setState({
      showdata: this.displayData,
      country:this.allCountry,
      postVal: "",
    });
    console.log("prependData " + this.allCountry)
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
  createActivity = (e) => {
    e.preventDefault();
  let array = this.state.country
  const activity = {
    name: this.state.name,
    dificultad: this.state.dificultad,
    duracion: this.state.duracion,
    temporada: this.state.temporada,
    country: "",
  };

    for (let i = 0; i < array.length; i++) {
      activity.country = array[i];
      console.log("este es el country primero " +  this.state.country)
      this.props.createActivity(activity);
     
    }
   

    
    alert("agregado con exito");
    e.target.reset();
         
       this.displayData = [];
       this.allCountry = []
      
       this.setState({
        showdata: this.displayData,
        country: this.country,
        
      });
     
    
    

  };

  render() {
    //const { dog } = this.props;
    return (
      <section id="cart">
        <form onSubmit={this.createActivity}>
          {/*----------------------------------*/}
          {/* ----------name------------------ */}
          {/*----------------------------------*/}
          <div id="container-name">
            <div id="name">
              {/********************************/}
              {/******** label name************ */}
              {/*********************************/}
              <div id="name-label">
                <label>Actividad</label>
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
          {/*------------ Dificultad y duracion------- */}
          {/*------------------------------------*/}
          <div id="container-dificultad-duracion">
            {/*-----------------------------------*/}
            {/*------------ Dificultad -------------- */}
            {/*------------------------------------*/}

            <div id="dificultad">
              {/********************************/}
              {/******** label Dificultad************ */}
              {/*********************************/}
              <div className="dificultad-label">
                <label>Dificultad</label>
              </div>

              <div id="container-dificultad-max-min">
                {/********************************/}
                {/******** dificultad  ************ */}
                {/*********************************/}
                <div id="dificultad-maximun">
                  {/*******************************************/}
                  {/******** input dificultad************ */}
                  {/********************************************/}
                  <div id="dificultad-input">
                    <input
                      name="dificultad"
                      type="Text"
                      required
                      onChange={this.handleInput}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            {/*-----------------------------------*/}
            {/*------------  duracion------- */}
            {/*------------------------------------*/}
            <div id="duracion">
              {/********************************/}
              {/******** label duracion************ */}
              {/*********************************/}
              <div className="duracion-label">
                <label>duracion</label>
              </div>

              <div id="container-duracion">
                {/********************************/}
                {/******** date ************ */}
                {/*********************************/}
                <div id="duracion">
                  {/********************************/}
                  {/******** label  duracion************ */}
                  {/*********************************/}

                  {/*******************************************/}
                  {/******** input duracion**************/}
                  {/*******************************************/}
                  <div id="duracion-input">
                    <input
                      name="duracion"
                      type="Text"
                      required
                      onChange={this.handleInput}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="container-country-temporada">
            <div>
              {/*---------------------------------------*/}
              {/*-----------country------------------ */}
              {/*---------------------------------------*/}
              <div id="container-country">
                <div id="country">
                  {/********************************/}
                  {/******** label genres************ */}
                  {/*********************************/}
                  <div id="country-label">
                    <label>Country</label>
                  </div>
                  {/******************************/}
                  {/********* input country******/}
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

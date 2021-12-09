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
import Filter from "./Filter"
import Card from "./Card/Card.js";
import "./Inicio/Inicio";
import Search from "./Search";


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
            this.props.filterOrder,
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
            this.props.filterOrder,
            this.props.name
        );
        await this.props.setPage(1);
    };

    render() {


        return (

            < div >


                <div>
                    <Order />
                    <Filter />
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
                        disabled={this.props.pokemons?.count <= 8}
                        onClick={() => {
                            this.changePage(this.props.page + 1);
                        }}
                    >
                        next
                    </button>

                    {this.props.pokemons?.result?.length >= 0 && (!this.props.pokemon?.length != 0
                        && this.props.pokemons.result.map((e) => {
                            return <Card image={e.imagen} name={e.name} id={e.id} />;
                        })
                    )
                    }
                    {this.props.pokemon?.length >= 0 &&
                        this.props.pokemon.map((e) => {
                            return <Card image={e.imagen} name={e.name} id={e.id} />;
                        })}
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        pokemons: state.pokemons,
        name: state.name,
        pokemon: state.pokemon,
        page: state.page,
        order: state.order,

        filter: state.filter,
        filterOrder: state.filterOrder,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPokemons: (page, name, order, filter) =>
            dispatch(getPokemons(page, name, order, filter)),

        setName: (name) => dispatch(setName(name)),
        setOrder: (order) => dispatch(setOrder(order)),

        setPage: (page) => dispatch(setPage(page)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

//disabled = { this.props.pokemons?.count <= this.props.page * 5 }
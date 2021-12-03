import React, {Component} from 'react'
import { connect } from "react-redux";
import { getPokemons, setOrder, setFilter } from '../folderRedux/actions/pokemonActions';
import Search from './Search';


class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }



    handleSelectOrder = async (e)=>{
        //this.props.setOrder("");
      //  console.log(e.target.value)
  await this.props.setOrder(e.target.value)   //({ [e.target.name]: e.target.value })
  await this.props.getPokemons( this.props.page, this.props.order,this.props.filter, this.props.name)
  

   }

   handleSelectFilterOrigen = async (e)=>{
   
    //console.log(e.target.value)
    await this.props.setFilter(e.target.value)   //({ [e.target.name]: e.target.value })
    await this.props.getPokemons( this.props.page,this.props.order, this.props.filter, this.props.name)


}
handleSelectFilterType = async (e)=>{
   
    //console.log(e.target.value)
    await this.props.setFilter(e.target.value)   //({ [e.target.name]: e.target.value })
    await this.props.getPokemons( this.props.page,this.props.order, this.props.filter, this.props.name)


}


    render() {


        return (
            <div className="order">
                <div id="order-type">
                    Order{" "}
                    <select name = "choiceOrder" onChange = {this.handleSelectOrder}>
                        <option value="lastest">Lastest</option>
                        <option value="pokLowest"> Pokemon Lowest</option>
                        <option value="pokHighest">Pokemon Highest</option>
                        <option value="hpLowest"> Force Lowest</option>
                        <option value="hpHighest">Force Highest</option>
                    </select>
                </div>
                    {/* <Search/> */}
                */}
                {/* <div id="order-type">

Filter by Type{" "}
<select name = "choiceFilterOrigen" onChange = {this.handleSelectFilterType}>
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
</div> */}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        pokemons: state.pokemons,
        name: state.name,
        order: state.order,
        page: state.page,
        filter: state.filter
      
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        setOrder: (order) => dispatch(setOrder(order)),
        setFilter: (filter) => dispatch(setFilter(filter)),
        getPokemons: (page, order, name) =>
        dispatch(getPokemons(page, order, name)),

    };
  }

export default connect(mapStateToProps, mapDispatchToProps) (Order)
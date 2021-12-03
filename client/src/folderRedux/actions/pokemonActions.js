import axios from 'axios'
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"
export const GET_ALL_TYPE = "GET_ALL_TYPE"
export const SET_NAME = "SET_NAME"
export const SET_ORDER = "SET_ORDER"
export const SET_FILTER = "SET_FILTER"
export const SET_PAGE = "SET_PAGE"
export const GET_POKEMON = "GET_POKEMON"
export const CREATE_POKEMON = "CREATE_POKEMON"
export const REMOVE_POKEMON = "REMOVE_POKEMON"
export const CREATE_TYPE = "CREATE_TYPE"
export const REMOVE_TYPE = "REMOVE_TYPE"
export const FILTER_STATUS = "FILTER_STATUS"




export const getPokemon = (id)=>{
    
    return async (dispatch)=>{
        try {
            const result = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type: GET_POKEMON,
                payload: result.data
            })

        } catch (error) {
            console.log(error)
        }
     
    }
}

export const getPokemons = (page, order, filter, name) => {
    let paisXPage = 0
    console.log("Estoy en la action get ")
    if (page > 1) {
        paisXPage = 12
    } else {
        paisXPage = 9
    }
    return (dispatch) => {
        
        axios.get(`http://localhost:3001/pokemons?page=${page ? page : 1}&paisXPage=${paisXPage ? paisXPage : 9}&order=${order?order:""}&filter=${filter?filter:""}&name=${name?name:""}`)
            .then(pokemon => {
                if (page === 0) {
                    pokemon.data = []
                }
            return dispatch({
                type: GET_ALL_POKEMONS,
                payload: pokemon.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const createPokemon = (type)=> {
    
    return (dispatch)=>{
        axios.post(`http://localhost:3001/type`,type)
        .then(response =>{
            return dispatch({
                type: CREATE_POKEMON
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
export const setName = (name)=>{
    //console.log("Soy la action name " + name)
    return{
        type: SET_NAME,
        payload: name
    }
}
export const setPage = (page)=>{
    return{
        type: SET_PAGE,
        payload: page
    }
}
export const setOrder = (order)=>{
  //console.log("setOrder " + order)
    return{
        type: SET_ORDER,
        payload: order
    }
}

// export const setFilter = (filter)=>{
//   //console.log("setOrder " + order)
//     return{
//         type: SET_FILTER,
//         payload: filter
//     }
// }
export const setFilter = (pokemons, filter)=>{
   
        let filtro = []
      let  array = pokemons.result
   for (let i = 0; i < array.length; i++) {
       for (let j = 0; j < array[i].type.length; j++) {
        if (array[i].type[j] ===  filter) {
           filtro.push(array[i]);
        
        } 
           
       }
      }
    
    
      return{
          type: SET_FILTER,
          payload: {
            filter: filter,
            pokemon:filtro,
            
            
                                                                        
          }
      }
  }




export const statusFilter =(status)=>{
    return{
        type: FILTER_STATUS,
        payload: status
    }
}


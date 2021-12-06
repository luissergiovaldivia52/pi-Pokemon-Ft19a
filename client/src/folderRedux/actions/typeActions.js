import axios from 'axios'

export const GET_ALL_TYPE = "GET_ALL_TYPE"
export const SET_NAME = "SET_NAME"
export const SET_ORDER = "SET_ORDER"
export const SET_FILTER = "SET_FILTER"
export const SET_PAGE = "SET_PAGE"
export const REMOVE_TYPE = "REMOVE_TYPE"
export const FILTER_STATUS = "FILTER_STATUS"




export const createType = (type)=> {
    
    return (dispatch)=>{
        axios.post(`http://localhost:3001/type`,type)
        .then(response =>{
            return dispatch({
                type: CREATE_TYPE
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const getType = ()=> {
    return (dispatch)=>{
        axios.get(`http://localhost:3001/type`)
        .then(type =>{
            return dispatch({
                type: GET_ALL_TYPE,
                payload: type.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}






export const removeTurism = ()=>{
    return{
        type: REMOVE_ACTIVITY,
        payload: {}
    }
}




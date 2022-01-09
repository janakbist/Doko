import { combineReducers } from 'redux'
import { productReducer } from './product.red';
// combine reducers

export default combineReducers({
    product: productReducer
})


// // imagine data structure
// {
//     products:[],
//     isLoading:[],
//     users:[],
//     nofication:[]
// }

// {
//     product:{
//         isLoading:false,
//         products:[]
//     },
//     user:{
//         isLoading:false,
//         users:[]
//     },
//     nofication:{
//         notifiactions:[]
//     }
// }
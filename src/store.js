import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers';

const middlewares = [thunk]

// redux store goes here
const initialState = {};

export const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))

// {
// product: {
//     isLoading: false,
//         products: []
// }
// }

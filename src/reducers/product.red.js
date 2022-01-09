import { PRODUCT_RECEIVED, PRODUCT_REMOVED, SET_IS_LOADING, SET_PAGE_NUMBER } from "../actions/products/type"

const initialState = {
    isLoading: false,
    products: [],
    currentPage: 1,
    perPage: 10
}

export const productReducer = (state = initialState, action) => {
    console.log('here at reducer', action);
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case PRODUCT_RECEIVED:
            return {
                ...state,
                products: action.payload
            }

        case PRODUCT_REMOVED:
            return {
                ...state,
                products: [...action.payload]
            }
        case SET_PAGE_NUMBER:
            return {
                ...state,
                currentPage: action.payload
            }

        default:
            return {
                ...state
            }
    }

}
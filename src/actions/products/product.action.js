import httpClient from './../../util/httpClient';
import notify from './../../util/notify';
// function getData(params){
//     return function(dispatch){

import { PRODUCT_RECEIVED, PRODUCT_REMOVED, SET_IS_LOADING, SET_PAGE_NUMBER } from "./type"

//     }
// }

export const fetch_product_ac = (params) => (dispatch) => {
    console.log('params >>', params);
    console.log('here at action');
    dispatch(isLoading(true));
    httpClient.GET('/product', true, params)
        .then(response => {
            // we have response now change centralized store
            dispatch({
                type: PRODUCT_RECEIVED,
                payload: response.data
            })
        })
        .catch(err => {
            notify.handleError(err);
        })
        .finally(() => {
            dispatch(isLoading(false))
        })


}

export const remove_product_ac = (id) => (dispatch, getState) => {
    const product = getState().product;
    // console.log('data >>', product);
    product.products.forEach((item, index) => {
        if (item._id === id) {
            product.products.splice(index, 1);
        }
    })

    // dispatch(isLoading(true));
    httpClient.DELETE(`/product/${id}`, true)
        .then(response => {
            dispatch({
                type: PRODUCT_REMOVED,
                payload: product.products
            })
        })
        .catch(err => {
            notify.handleError(err)

        })
        .finally(() => {
            // dispatch(isLoading(false))
        })
}


export const setPageNumber_ac = (pageNumber) => (dispatch) => {
    dispatch({
        type: SET_PAGE_NUMBER,
        payload: pageNumber
    })
}

const isLoading = isLoading => ({
    type: SET_IS_LOADING,
    payload: isLoading
})
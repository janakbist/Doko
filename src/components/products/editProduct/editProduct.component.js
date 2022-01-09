import React, { Component } from 'react'
import httpClient from '../../../util/httpClient';
import notify from '../../../util/notify';
import { Loader } from '../../common/loader/loader.component';
import { ProductForm } from '../productForm/productForm.component';

export class EditProduct extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            isSubmitting: false,
            product: {}
        };
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        })
        const productId = this.props.match.params['id'];
        httpClient.GET(`/product/${productId}`, true)
            .then(response => {
                this.setState({
                    product: response.data
                })
            })
            .catch(err => {
                notify.handleError(err);
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }
    edit = (data, files) => {
        this.setState({
            isSubmitting: true
        })
        const requestData = {
            ...data,
            vendor: Object.keys(data.vendor).length && data.vendor._id,
        }
        httpClient.UPLOAD('PUT', `/product/${requestData._id}`, requestData, files)
            .then(response => {
                notify.showInfo('Product Updated Successfully')
                this.props.history.push('/view_product');
            })
            .catch(err => {
                notify.handleError(err);
                this.setState({
                    isSubmitting: false
                })
            })
    }
    render() {
        let content = this.state.isLoading
            ? <Loader></Loader>
            : <ProductForm
                isSubmitting={this.state.isSubmitting}
                submitCallback={this.edit}
                product={this.state.product}
                title="Edit Product"
            ></ProductForm>
        return content


    }
}

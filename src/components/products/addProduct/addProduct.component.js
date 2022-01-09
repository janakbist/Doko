import React, { Component } from 'react'
import httpClient from '../../../util/httpClient';
import notify from '../../../util/notify';
import { ProductForm } from '../productForm/productForm.component';

export class AddProduct extends Component {

    constructor() {
        super();
        this.state = {
            isSubmitting: false
        };
    }

    add = (data, files = []) => {
        this.setState({
            isSubmitting: true
        })
        httpClient.UPLOAD('POST', '/product', data, files)
            .then(response => {
                notify.showInfo('Product Added successfully')
                this.props.history.push('view_product');
            })
            .catch(err => {
                notify.handleError(err);
                this.setState({
                    isSubmitting: false
                })
            })

    }


    render() {
        return (
            <ProductForm
                title="Add Product"
                submitCallback={this.add}
                isSubmitting={this.state.isSubmitting}
            ></ProductForm>
        )
    }
}

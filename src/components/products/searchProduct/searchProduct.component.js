import React, { Component } from 'react'
import httpClient from '../../../util/httpClient'
import notify from '../../../util/notify'
import { Button } from '../../common/button/button.component'
import { ViewProduct } from '../viewProduct/viewProduct.component'

const defaultForm = {
    category: '',
    name: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    fromDate: '',
    multipleDateRange: '',
    toDate: '',
    tags: '',
    discountedItem: ''
}

export class SearchComponent extends Component {
    constructor() {
        super()

        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isSubmitting: false,
            isValidForm: true,
            isLoading: false,
            categories: [],
            allProducts: [],
            names: [],
            searchResults: []
        }
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        })
        httpClient.POST('/product/search', {})
            .then(response => {
                let categories = [];
                response.data.forEach((item, index) => {
                    if (categories.indexOf(item.category) === -1) {
                        categories.push(item.category);
                    }
                })
                this.setState({
                    categories,
                    allProducts: response.data
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
    handleChange = e => {
        let { name, value, checked, type } = e.target;
        if (type === 'checkbox') {
            value = checked;
        }

        if (name === 'category') {
            this.prepareNames(value);
        }
        this.setState(pre => ({
            data: {
                ...pre.data,
                [name]: value
            }
        }))
    }

    prepareNames = (selectedCategory) => {
        const { allProducts } = this.state;
        let names = allProducts.filter((item, index) => {
            if (item.category === selectedCategory) {
                return true;
            }
        })
        this.setState({
            names
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })
        httpClient.POST('/product/search', this.state.data)
            .then(response => {
                if (!response.data.length) {
                    notify.showInfo("No any Products matched your search query");
                }
                this.setState({
                    searchResults: response.data
                })
            })
            .catch(err => {
                notify.handleError(err);
            })
            .finally(() => {
                this.setState({
                    isSubmitting: false
                })
            })
    }

    resetSearch = () => {
        this.setState({
            searchResults: []
        })
    }

    render() {
        let content = this.state.searchResults.length
            ? <ViewProduct incomingProducts={this.state.searchResults} resetSearch={this.resetSearch}></ViewProduct>
            : <>
                <h2>Search Product</h2>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label>Category</label>
                    <select name="category" value={this.state.data.category || ''} className="form-control" onChange={this.handleChange}>
                        <option disabled value="">(Select Category)</option>
                        {this.state.categories.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    {this.state.data.category && (
                        <>
                            <label>Name</label>
                            <select name="name" value={this.state.data.name || ''} className="form-control" onChange={this.handleChange}>
                                <option disabled value="">(Select Name)</option>
                                {this.state.names.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </>
                    )}
                    <label>Min Price</label>
                    <input type="number" className="form-control" name="minPrice" onChange={this.handleChange}></input>
                    <label>Max Price</label>
                    <input type="number" className="form-control" name="maxPrice" onChange={this.handleChange}></input>
                    <label>Select Date</label>
                    <input type="date" className="form-control" name="fromDate" onChange={this.handleChange}></input>
                    <input type="checkbox" name="multipleDateRange" onChange={this.handleChange}></input>
                    <label>Multiple Date Range</label>
                    <br />
                    {this.state.data.multipleDateRange && (
                        <>
                            <label>To Date</label>
                            <input type="date" className="form-control" name="toDate" onChange={this.handleChange}></input>
                        </>
                    )}

                    <label>Tags</label>
                    <input type="string" className="form-control" name="tags" onChange={this.handleChange}></input>
                    <br />
                    <Button
                        isSubmitting={this.state.isSubmitting}
                        isValidForm={this.state.isValidForm}>

                    </Button>


                </form>

            </>
        return content;


    }
}

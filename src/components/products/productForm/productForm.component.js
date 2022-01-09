import React, { Component } from 'react'
import { Button } from '../../common/button/button.component';
const IMG_URL = process.env.REACT_APP_IMG_URL;


const defaultForm = {
    name: '',
    description: '',
    brand: '',
    category: '',
    price: '',
    color: '',
    modelNo: '',
    discountedItem: '',
    discountType: '',
    discountValue: '',
    tags: '',
    manuDate: '',
    expiryDate: ''

}

export class ProductForm extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            filesToUpload: [],
            isValidForm: false
        };
    }

    componentDidMount() {
        if (this.props.product) {
            this.setState({
                data: {
                    ...defaultForm,
                    ...this.props.product,
                    discountedItem: this.props.product.discount ? this.props.product.discount.discountedItem : '',
                    discountType: this.props.product.discount ? this.props.product.discount.discountType : '',
                    discountValue: this.props.product.discount ? this.props.product.discount.discountValue : '',
                }
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.submitCallback(this.state.data, this.state.filesToUpload)
    }

    handleChange = e => {
        let { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            value = checked
        }
        if (type === 'file') {
            return this.setState({
                filesToUpload: files
            })
        }

        this.setState(pre => ({
            data: {
                ...pre.data,
                [name]: value
            }
        }), () => {
            this.validateForm(name);
        })
    }

    validateForm = (fieldName) => {
        let errMsg;
        switch (fieldName) {
            case 'category':
                errMsg = this.state.data[fieldName]
                    ? ''
                    : 'required field*'
                break;
            default:
                break;
        }
        this.setState(pre => ({
            error: {
                ...pre.error,
                [fieldName]: errMsg
            }
        }), () => {
            const errors = Object
                .values(this.state.error)
                .filter(err => err);

            this.setState({
                isValidForm: errors.length === 0
            })
        })
    }
    render() {
        let discountContent = this.state.data.discountedItem
            ? <>
                <label>Discount Type</label>
                <select name="discountType" className="form-control" value={this.state.data.discountType} value={this.state.data.discountType} onChange={this.handleChange}>
                    <option disabled value="">(Select Type)</option>
                    <option value="percentage">Percentage</option>
                    <option value="quantity"> Quantity</option>
                    <option value="value">Value</option>
                </select>
                <label>Discount Value</label>
                <input type="text" className="form-control" value={this.state.data.discountValue} name="discountValue" placeholder="Discount Value" onChange={this.handleChange}></input>
            </>
            : null

        return (
            <>
                <h2>{this.props.title}</h2>
                <form className="form-group" onSubmit={this.handleSubmit} noValidate>
                    <label>Name</label>
                    <input type="text" className="form-control" value={this.state.data.name} name="name" placeholder="Name" onChange={this.handleChange}></input>
                    <label>Description</label>
                    <input type="text" className="form-control" value={this.state.data.description} name="description" placeholder="Description" onChange={this.handleChange}></input>
                    <label>Category</label>
                    <input type="text" className="form-control" value={this.state.data.category} name="category" placeholder="Category" onChange={this.handleChange}></input>
                    <p className="error">{this.state.error.category}</p>
                    <label>Brand</label>
                    <input type="text" className="form-control" value={this.state.data.brand} name="brand" placeholder="Brand" onChange={this.handleChange}></input>
                    <label>Price</label>
                    <input type="text" className="form-control" value={this.state.data.price} name="price" placeholder="Price" onChange={this.handleChange}></input>
                    <label>Color</label>
                    <input type="text" className="form-control" value={this.state.data.color} name="color" placeholder="Color" onChange={this.handleChange}></input>
                    <label>Model No</label>
                    <input type="text" className="form-control" value={this.state.data.modelNo} name="modelNo" placeholder="Model No" onChange={this.handleChange}></input>
                    <input type="checkbox" name="discountedItem" checked={this.state.data.discountedItem} onChange={this.handleChange}></input>
                    <label>Discounted Item</label>
                    <br />
                    {discountContent}
                    <label>Manu Date</label>
                    <input type="date" className="form-control" value={this.state.data.manuDate} name="manuDate" onChange={this.handleChange}></input>
                    <label>Expiry Date</label>
                    <input type="date" className="form-control" value={this.state.data.expiryDate} name="expiryDate" onChange={this.handleChange}></input>
                    <label>Tags</label>
                    <input type="text" className="form-control" value={this.state.data.tags} name="tags" placeholder="Tags" onChange={this.handleChange}></input>
                    {
                        this.props.product && this.props.product.images && (
                            <>
                                <label>Previous Image</label>
                                <br />
                                <img src={`${IMG_URL}/${this.props.product.images[0]}`} alt="product_img.png" width="600px"></img>
                                <br />
                            </>
                        )
                    }


                    <label>Choose Image</label>
                    <br />
                    <input type="file" onChange={this.handleChange}></input>
                    <br />
                    <br />
                    <Button
                        isValidForm={this.state.isValidForm}
                        isSubmitting={this.props.isSubmitting}
                    ></Button>
                </form>

            </>
        )
    }
}

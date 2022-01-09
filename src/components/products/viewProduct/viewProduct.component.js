import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Loader } from '../../common/loader/loader.component';
import dateUtil from './../../../util/dateProcessing'
import { fetch_product_ac, remove_product_ac, setPageNumber_ac } from './../../../actions/products/product.action';
import { connect } from 'react-redux';

const IMG_URL = process.env.REACT_APP_IMG_URL;

class ViewProductComponent extends Component {

    componentDidMount() {
        console.log('check props in view product >>', this.props)
        if (this.props.incomingProducts) {
            this.setState({
                products: this.props.incomingProducts
            })
        } else {
            this.props.fetch(this.props.currentPage, this.props.perPage);
        }
    }

    remove(id, index) {
        // ask for confirmation
        const confirmation = window.confirm('Are you sure to remove?')
        if (confirmation) {
            this.props.remove(id);
        }
    }

    edit = (id) => {
        this.props.history.push(`edit_product/${id}`);
    }
    changePageNumber = (evt) => {
        let { currentPage } = this.props;
        if (evt === 'next') {
            currentPage += 1;
        } else {
            currentPage -= 1;
        }
        this.props.setPageNumber(currentPage)
        this.props.fetch(currentPage, this.props.perPage);


    }

    render() {
        let content = this.props.isLoading
            ? <Loader></Loader>
            : <>
                <table className="table">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Created Date</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.props.products.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td><Link to={`/product_details/${item._id}`}>{item.name}</Link> </td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>{dateUtil.formatDate(item.createdAt, 'ddd YYYY/MM/DD')}</td>
                                <td>
                                    <img src={`${IMG_URL}/${item.images[0]}`} alt="image.png" width="200px"></img>
                                </td>
                                <td>
                                    <button onClick={() => this.edit(item._id)} className="btn btn-info">edit</button>
                                    <button onClick={() => this.remove(item._id, index)} className="btn btn-danger">delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <button className="btn btn-success" onClick={() => this.changePageNumber()}>Previous</button>
                <button className="btn btn-success" onClick={() => this.changePageNumber('next')}>Next</button>
            </>
        return (
            <div>
                <h2>View Product</h2>
                {this.props.incomingProducts && (
                    <button className="btn btn-success" onClick={this.props.resetSearch}>search again</button>
                )}
                {content}

            </div>
        )
    }
}

// what comes in inside component
const mapStateToProps = (rootStore) => ({
    isLoading: rootStore.product.isLoading,
    products: rootStore.product.products,
    perPage: rootStore.product.perPage,
    currentPage: rootStore.product.currentPage
})

// what actions will go out from component
const mapDispatchToProps = dispatch => ({
    fetch: (currentPage, perPage) => dispatch(fetch_product_ac({
        currentPage,
        perPage
    })),
    remove: (id) => dispatch(remove_product_ac(id)),
    setPageNumber: (pageNumber) => dispatch(setPageNumber_ac(pageNumber))
})

export const ViewProduct = connect(mapStateToProps, mapDispatchToProps)(ViewProductComponent)

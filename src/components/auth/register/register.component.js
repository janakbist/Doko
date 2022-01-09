import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common/button/button.component';
import notify from './../../../util/notify';
import httpClient from './../../../util/httpClient';
// const specialCharacters = ['_', '@', '!'];


const defaultForm = {
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: '',

}
export class Register extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm,
            },
            isSubmitting: false,
            isValidForm: false
        };
    }

    componentDidMount() {
        // console.log('when component is fully loaded', this.props)
        // API call
        // fetch data to show them in UI


    }

    componentDidUpdate(preProps, preState) {
        // console.log('prev props >>', preProps);
        // console.log('pre state >>', preState.data)
        // console.log('when component is updated', this.state.data);
    }
    componentWillUnmount() {
        // console.log('register component is destroyed')
        clearInterval(this.interval)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })
        httpClient
            .POST('/auth/register', this.state.data)
            .then(response => {
                this.props.history.push('/');
                notify.showInfo("Registration sucessfull please login");
            })
            .catch(err => {
                notify.handleError(err);
                this.setState({
                    isSubmitting: false
                })
            })

    }
    handleChange = e => {
        const { name, value } = e.target;
        this.setState(preState => ({
            data: {
                ...preState.data,
                [name]: value
            }
        }), () => {
            this.validateForm(name);
        })
    }

    validateForm = (fieldName) => {
        let errMsg;
        switch (fieldName) {
            case 'username':
                errMsg = this.state.data[fieldName]
                    ? ''
                    : 'required field*'
                break;
            case 'email':
                errMsg = this.state.data[fieldName]
                    ? this.state.data[fieldName].includes('@') && this.state.data[fieldName].includes('.com')
                        ? ''
                        : 'Invalid Email'
                    : 'required field*'
                break;
            case 'password':
                errMsg = this.state.data[fieldName]
                    ? this.state.data[fieldName].length > 6
                        ? ''
                        : 'weak password'
                    : 'required field*';
                break;
            case 'confirmPassword':
                errMsg = this.state.data[fieldName]
                    ? this.state.data[fieldName] === this.state.data.password
                        ? ''
                        : 'Password didnot match'
                    : 'required field*'
                break;
            default:
                break;
        }
        this.setState(preState => ({
            error: {
                ...preState.error,
                [fieldName]: errMsg
            }
        }), () => {
            const errors = Object
                .values(this.state.error)
                .filter(err => err);
            this.setState({
                isValidForm: errors.length === 0
            })
        });
    }

    render() {
        // console.log('render at second')
        return (
            <div>
                <h2>Register</h2>
                <p>Please Register to continue</p>
                <form className="form-group" onSubmit={this.handleSubmit} noValidate>
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Name" onChange={this.handleChange}></input>
                    <label>Address</label>
                    <input type="text" className="form-control" name="address" placeholder="Address" onChange={this.handleChange}></input>
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" placeholder="Email" onChange={this.handleChange}></input>
                    <p className="error">{this.state.error.email}</p>                    <label>Phone Number</label>
                    <input type="number" className="form-control" name="phoneNumber" onChange={this.handleChange}></input>
                    <label>Username</label>
                    <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChange}></input>
                    <p className="error">{this.state.error.username}</p>
                    <label>Password</label>
                    <input type="text" className="form-control" name="password" placeholder="Password" onChange={this.handleChange}></input>
                    <p className="error">{this.state.error.password}</p>
                    <label>Confirm Password</label>
                    <input type="text" className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange}></input>
                    <p className="error">{this.state.error.confirmPassword}</p>

                    <br />
                    <Button
                        isSubmitting={this.state.isSubmitting}
                        isValidForm={this.state.isValidForm}
                    ></Button>
                </form>
                <p> Already Registered?</p>
                <p>Back to <Link to="/">login</Link></p>
            </div>
        )
    }
}


// class based component is generally used to maintain state of component
// render method is mandatory inside class which will return a single html node


// life cycle of a component
// INIT, UPDATE, DESTROY


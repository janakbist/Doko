import React from 'react';
import { Button } from '../../common/button/button.component';
import { Link } from 'react-router-dom';
import notify from './../../../util/notify';
import httpClient from './../../../util/httpClient';

const defaultForm = {
    username: '',
    password: ''
}
export class Login extends React.Component {

    constructor() {
        super(); // parent class constructor call
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            remember_me: false,
            isSubmitting: false,
            isValidForm: false,
        };
    }

    componentDidMount() {
        if (localStorage.getItem('remember_me') === 'true') {
            this.props.history.push('/home/dashboard')
        }
    }

    handleChange = (e) => {
        let { name, value, checked, type } = e.target;

        if (type === 'checkbox') {
            value = checked;
            return this.setState({
                [name]: value
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
        let errMsg = this.state.data[fieldName]
            ? ''
            : `${fieldName} is required`;

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

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })

        httpClient
            .POST('/auth/login', this.state.data, null)
            .then(response => {
                notify.showSuccess(`Welcome ${response.data.user.username}`);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('remember_me', this.state.remember_me);
                this.props.history.push('/dashboard');
            })
            .catch(err => {
                notify.handleError(err);
                this.setState({
                    isSubmitting: false
                })
            })
    }

    // render is mandatory method for class based component
    render() {
        // UI logic reside inside render
        // render  must return html node
        return (
            <div>
                <h2>Login</h2>
                <p>Please Login to start your session</p>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input className="form-control" type="text" placeholder="Username" id="username" name="username" onChange={this.handleChange}></input>
                    <p className="error">{this.state.error.username}</p>
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" placeholder="Password" id="password" name="password" onChange={this.handleChange}></input>
                    <p className="error">{this.state.error.password}</p>
                    <input type="checkbox" name="remember_me" onChange={this.handleChange} ></input>
                    <label>Remeber Me</label>
                    <br />
                    <Button
                        isSubmitting={this.state.isSubmitting}
                        isValidForm={this.state.isValidForm}
                        enabledLabel='Login'
                        disabledLabel='Logingin...'
                    ></Button>
                </form>
                <p>Don't have an account?</p>
                <p>Register <Link to="/register">here</Link></p>
            </div>
        )
    }
}
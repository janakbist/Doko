import React from "react";
import {Button} from '../../common/button/button.component';

export class Login extends React.Component{
    
    constructor() {
        super();
        this.state = {
            username:'',
            password:'',
            remember_me:false,
            isSubmitting:false,
            isValidForm:true,
        };
    }
    handleChange = (e) => {
        const {name, value} =e.target;
        this.setState({
            [name]:value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting:true
        })
        setTimeout(() => {
            this.setState({
                isSubmitting:false
            })
        },3000)
        console.log("this.state is >>",this.state);
    }
    render() {
                      
        return(
            <div>
                <h2>Login</h2>
                <p>Please login to start your session</p>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"id="username"placeholder="Enter Your Name" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="password">Password</label>
                    <input type="password"name="password"id="password" className="form-control" onChange={this.handleChange}></input><br />
                    <Button
                        isSubmitting = {this.state.isSubmitting}
                        isValidForm = {this.state.isValidForm}
                    ></Button>
                </form>
            </div>
        )
    }

}
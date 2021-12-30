import React from "react";

export class Login extends React.Component{
    
    constructor() {
        super();
        this.state = {
            username:'',
            password:'',
            remember_me:false,
            isSubmitting:false,
            isValidForm:false,
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
        },4000)
        console.log("this.state is >>",this.state);
    }
    render() {
        let btn = this.state.isSubmitting
        ? <button disabled className="btn btn-info">Logging...</button>

        : <button type="submit" className="btn btn-primary">Login</button>

                      
        return(
            <div>
                <h2>Login</h2>
                <p>Please login to start your session</p>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"id="username"placeholder="Enter Your Name" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="password">Password</label>
                    <input type="password"name="password"id="password" className="form-control" onChange={this.handleChange}></input><br></br>
                    <button type="submit" className="btn btn-primary">Login</button><br/>
                    {btn}
                </form>
            </div>
        )
    }

}
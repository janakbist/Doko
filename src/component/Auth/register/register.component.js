import React, { Component } from 'react';
import {Button} from './common/button/button.component.js';

const defaultForm = {
    name: '',
    email:'',
    phoneNumber:'',
    userName:'',
    password:'',
    confirmPassword:''

}
 export class Register extends Component {
     constructor() {
         super();
         this.state = {
             data: {
                 ...defaultForm
             },
             error: {
                 ...defaultForm
             },
             isSubmitting:false,
             isValidateForm:true
         };
     }

     handleSubmit = e=>{
         e.preventDefault();
     }
     
     handleChange = e=>{
         const {name,value} = e.target;
     }
     render() {
         return (
             <div>
                 <h2>Register</h2>
                 <p>Please Register to continue</p>
                 <form className="form-group" onSubmit={this.handleChange}>
                     <label>Name</label>
                     <input type="text"name="name" className="form-control" placeholder="Name" onChange={this.handleChange}></input>
                     <label>Address</label>
                     <input type="text"name="address" className="form-control" placeholder="Address" onChange={this.handleChange}></input>
                     <label>Email</label>
                     <input type="text"name="email" className="form-control" placeholder="email" onChange={this.handleChange}></input>
                     <label>Phone Number</label>
                     <input type="number"name="phoneNumber" className="form-control" onChange={this.handleChange}></input>
                     <label>Username</label>
                     <input type="text"name="userName" className="form-control" placeholder="Username" onChange={this.handleChange}></input>
                     <label>Password</label>
                     <input type="password"name="password" className="form-control"  onChange={this.handleChange}></input>
                     <label>Username</label>
                     <input type="password"name="confirmPassword" className="form-control" onChange={this.handleChange}></input>
                     <Button
                         isSubmitting={this.state.isSubmitting}
                         isValidateForm={this.state.isValidateForm}
                     ></Button>
                 </form>
                 <p>Already Registerred</p>
                 <p>Back to <a href="">Login</a></p>
             </div>
         )
     }

 }
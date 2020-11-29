import React, {Component, useState, useEffect} from 'react'

import {Link, Switch, Route, BrowserRouter} from 'react-router-dom'
import { Dashboard } from '../dashboard';
import logo from '../imgs/logo.png'
import axios from 'axios';


export class Login extends Component{
    constructor(props)
    {
        super(props);
        //this.loginhandler =  this.loginaction.bind(this);
        this.state = {  username:"",
                        password:"",
                        error:false 
                    };
        this.state = {value: ''};
        
        this.onSubmit = this.onSubmit.bind(this);
        this.usernameEvent = this.usernameEvent.bind(this);
        this.passwordEvent = this.passwordEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.NoError = this.NoError.bind(this);
    }



     onSubmit = e =>{

        // e.preventDefault()


        



        const { username, password } = this.state;
        const { history } = this.props;

        this.setState({ error: false });
        
        console.log("sending Username: ", this.state.username, " ...password: " ,this.state.password);    
        
        axios.post("http://localhost:5000/company/login", {username: this.state.username, password: this.state.password})  
        .then(response=>console.log("non-error response: ", response))       
                .catch(error=>{  console.log("Error: ", error) })

        // '/company/<company_id>/login' use in the fetch call 
        // look at post request on fetching eerror handling

        // let loginDetails = {
        //     username : this.state.username,
        //     password : this.state.password
        // }

        // let requestOptions = {
        //     method: 'post',
        //     // headers: {
        //     //     'Accept': 'application/json',
        //     //     'Content-Type': 'application/json' },
        //     headers: { 
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer my-token',
        //         'My-Custom-Header': 'foobar'
        //     },
        //     body: JSON.stringify(loginDetails)
        //     // body: loginDetails
        // };

        // fetch('/company/login',requestOptions)
        //     .then(res=>{
        //         console.log("got the server response ",res)
        //         return res.json()
        //         })
        //     .then((data) => {
        //         console.log("got the data!" , data)
        //     })

        
        if ((username === 'admin' && password === 'password')){
            this.setState({islogin:true});
            // console.log(this.state);
            console.log("You're logged in");
            
            history.push('/dashboard');  
        }
        if ((username === 'employee' && password === 'password')){
            this.setState({islogin:true});
            console.log("You're logged in emp");
            history.push('/dashboardemployee');  
        }
        if ((username === 'manager' && password === 'password')){
            this.setState({islogin:true});
            console.log("You're logged in emp");
            history.push('/dashboardmanager');  
        }
        e.preventDefault();
    }

    usernameEvent (e)
    {
        console.log("Inside username change")
        this.setState({username: e.target.value});
    }

    passwordEvent (e)
    {
        this.setState({password: e.target.value});
        console.log(e.target.value)
    }
    handleChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
          });
    }
    
    NoError() {
        this.setState({ error: '' });
      }

    render(){
        return (
        <div className = "loginpage"> 
        <form onSubmit={this.onSubmit}>
        <img src={logo} className="App-logo" alt="logo" />
        <input type="username" name="username" placeholder="Email" value={this.state.username} onChange={this.usernameEvent} required />
        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.passwordEvent} required />
        <button type="submit" value="Submit">Login</button>
        </form>
      </div>);
    }
}
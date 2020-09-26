import React, {Component, useState, useEffect} from 'react'

import {Link, Switch, Route, BrowserRouter} from 'react-router-dom'
import { Dashboard } from '../dashboard';
import logo from '../imgs/logo.png'


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
        const { username, password } = this.state;
        const { history } = this.props;

        this.setState({ error: false });

        if (!(username === 'admin' && password === 'password')) {
            return this.setState({ error: true });
        }
        if ((username === 'admin' && password === 'password')){
            this.setState({islogin:true});
            console.log("You're logged in");
            history.push('/dashboard');  
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
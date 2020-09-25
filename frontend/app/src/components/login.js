import React, {Component, useState, useEffect} from 'react'

import {Link, Switch, Route, BrowserRouter} from 'react-router-dom'
import { Dashboard } from '../dashboard';
import logo from '../imgs/logo.png'


export class Login extends Component{
    constructor(props)
    {
        super(props);
        //this.loginhandler =  this.loginaction.bind(this);
        this.state = {  username:'',
                        password:'',
                        islogin:false,
                        error:false 
                    }
        
        this.loginhandler = this.loginhandler.bind(this);
        this.postinput = this.postinput.bind(this);
    }

    postinput ([name, val])
    {
        console.log("posting");
          //   this.setState({[name]: val});
    }


    loginhandler(e)
    {
        e.preventDefault();

        const { username, password } = this.state;
        const { history } = this.props;

        this.setState({ error: false });

        if (!(username === 'admin' && password === 'password')) {
            return this.setState({ error: true });
        }

        this.state.islogin=true;
        console.log("You're logged in");
        history.push('/dashboard');  
    }
    

    render(){
        return (
        <div className="base-container" ref = {this.props.containerRef}>
        <div className = "App-header"> 
            <img src={logo} className="App-logo" alt="logo" />
            <input type = "text" name="email address"placeholder="email" onChange={this.postinput}  />
            <input type = "password" name="password"placeholder="password" onChange={this.postinput}/>
            <input type = "submit" value="Login" className="button" onSubmit={this.loginhandler}></input>

            

            
        </div>
        </div>

        
    );
    }
}
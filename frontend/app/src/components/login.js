import React, {Component, useState, useEffect} from 'react'
import { Dashboard } from '../dashboard';
import {setUserSession, getUser, removeUserSession}from './session'
import logo from '../imgs/logo.png';
import axios from 'axios';
import './login.css';
import { Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Link } from '@material-ui/core';
import { InputAdornment, IconButton } from "@material-ui/core";
import { Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const url = "http://localhost:5000/"

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

export class Login extends Component{
    constructor(props)
    {
        super(props);
        //this.loginhandler =  this.loginaction.bind(this);
        this.state = {  username:"",
                        password:"",
                        error:false, 
                        companyId : 1,
                        value: '',
                        loading:false,
                        showPassword:false,
                        setShowPassword:false,
                        checked:false,
                    };
        
        this.onSubmit = this.onSubmit.bind(this);
        this.usernameEvent = this.usernameEvent.bind(this);
        this.passwordEvent = this.passwordEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.NoError = this.NoError.bind(this);
    }

    onSubmit = e =>{
        const { username, password } = this.state;
        //check if person is valid user

        const { history } = this.props;
        if ((username === 'admin' && password === 'password')){
            this.setState({islogin:true});
            console.log("You're logged in");
            history.push('/dashboard') ;  
        }
        
        console.log("sending Username: ", this.state.username, " password: " ,this.state.password);
        axios.post(url+"login", {username: this.state.username, password: this.state.password})
        .then(response=>{
                        console.log("non-error response: ", response)
                        if(response.data.code===1)
                        {   
                            //clear props on logout in dashboard.js
                            setUserSession(JSON.stringify(response.data.auth_token), JSON.stringify(response.data.user));
                            console.log("Session set for user: ", getUser())
                            if(response.data.user.employeeId===1)
                                history.push("/dashboard");
                            else if(response.data.user.isManager===true)
                                history.push("/dashboard");
                            else
                                history.push("/dashboardemployee")
                            
                        }
                        else{
                            this.setState({error:true});
                            return;
                        }
                    })
             .catch(error=>{
                 removeUserSession();
                 console.log("Error: ", error)
             })

        
        
        e.preventDefault();
    }

    handleCheck = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
      };
    
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
    handleClickShowPassword () {
        
    };
    
    handleMouseDownPassword  ()
    {

    } 
    
    render(){
        return (
        <div className = "loginpage"> 
         <Paper variant="elevation"elevation={5}className="login-paper">
                <form onSubmit={this.onSubmit}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <TextField  variant="outlined" className="username" margin="normal" value={this.state.username} onChange={this.usernameEvent} required  id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
                    <TextField variant="outlined" margin="normal" className="password" value={this.state.password} onChange={this.passwordEvent} required  name="password" label="Password" type="password" id="password" autoComplete="current-password"
                        type={this.state.showPassword ? "text" : "password"}  />
                    <Button type="submit" variant="contained" color="primary" value="Submit" className="submitbutton">Login</Button>
                </form>
                <a href='http://localhost:3000/forgotpassword' className="forgot"> forgot password ?</a>
                <FormControlLabel id="checkedG" control={ <Checkbox icon={<CheckBoxOutlineBlankIcon fontSize="small" />} checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checkedI" /> } label="Remember Me" />
        </Paper>
        </div>);
    }
}

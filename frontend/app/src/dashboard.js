import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './imgs/logo.png';

export class Dashboard extends Component{
    constructor(props)
    {
        super(props);
        this.logouthandler =  this.logout.bind(this);
    }
     logout = () =>
    {
        console.log("Points inside logout handling function")
    }
    
    render(){
        return (
        <div className = "dash-header"> 
            <div className= 'imageContainer'>
                <img src={logo} className='img' alt="logo" />   
            </div>

            <nav>
            <a href="./login" onClick={this.lgin}>logout</a>
                <a href="./dashboard" onClick={this.Dashboard}>Home</a>
                
            </nav>
            
        </div>
    );
    }
}
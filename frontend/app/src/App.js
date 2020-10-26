import React,{useState, useEffect} from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import {Login} from "./components/login"
import {Dashboard} from "./dashboard"
import {Dashboardemployee} from "./dashboardemployee"
import {Dashboardmanager} from "./dashboardmanager"

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {username: "", passwword:"", isLogin:true}
  }

  render(){
  
  return (
    <div className="App">
      <div className="login">
          <div className = "app-routes">
            <BrowserRouter>
            <Switch>   
                <Route path = "/login" component={Login} />
                <Route path = "/Dashboard" component={Dashboard} />
                <Route path = "/Dashboardemployee" component={Dashboardemployee} />
                <Route path = "/Dashboardmanager" component={Dashboardmanager} />
            </Switch>
            </BrowserRouter>
            </div>
     
     </div>
    </div>
  );
  }
}

  

export default App;

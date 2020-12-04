import React,{useState, useEffect} from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import {Login} from "./components/login"
import {Dashboard} from "./dashboard"
import {Dashboardemployee} from "./dashboardemployee"
import {PrivateRoute, PublicRoute} from "./components/Routes"
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
                <Route exact path = "/" component={Login} />
                <PublicRoute path="/login" component={Login} />
                <PrivateRoute path = "/Dashboard" component={Dashboard} />
                <PrivateRoute path = "/Dashboardemployee" component={Dashboardemployee} />
            </Switch>
            </BrowserRouter>
            </div>
     
     </div>
    </div>
  );
  }
}

  

export default App;

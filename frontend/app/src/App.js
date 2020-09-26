import React,{useState, useEffect} from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import {Login} from "./components/login"
import {Dashboard} from "./dashboard"

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
                <Route path = "/" component={Dashboard} />
            </Switch>
            </BrowserRouter>
            </div>
     
     </div>
    </div>
  );
  }
}

  

export default App;

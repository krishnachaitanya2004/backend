import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Home Page</h1>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

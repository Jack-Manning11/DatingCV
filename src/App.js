import React from 'react';
import { Route, Switch } from 'wouter';
import Landing from './Landing';
import Interactive from './Interactive';
import Output from './Output';
import './App.css';

const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/" component={Landing} />
                <Route path="/interactive" component={Interactive} />
                <Route path="/output" component={Output} />
            </Switch>
        </div>
    );
};

export default App;

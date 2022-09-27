import React from 'react';
import { BrowserRouter, Route  } from 'react-router-dom';
import Home from './home';
import Details from './details';
import Filter from './Filter';

function Router() {
    return (
        <BrowserRouter>
        <Route exact path = "/"  component={Home}></Route>
        <Route path="/details" component={Details}></Route>
        <Route path="/filter" component={Filter}></Route>
            </BrowserRouter>
    )
}
 export default Router;
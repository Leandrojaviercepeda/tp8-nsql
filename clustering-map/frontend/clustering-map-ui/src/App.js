import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

//************************************* React Components ****************************************
import Home from './components/Home'
import NewRestaurant from './components/Restaurant/NewRestaurant'
import DeleteRestaurant from './components/Restaurant/DeleteRestaurant'
import ModifyRestaurant from './components/Restaurant/EditRestaurant'
import Restaurant from './components/Restaurant'
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path='/' render={ () => <Redirect to='/home' component={Home}/>} />
      <Route exact path='/home' component={Home}/>
      <Route exact path='/restaurant/new' component={NewRestaurant}/>
      <Route exact path='/restaurant/delete' component={DeleteRestaurant}/>
      <Route exact path='/restaurant/edit' component={ModifyRestaurant}/>
      <Route exact path='/restaurant/:_id' component={Restaurant}/>
      <Route component={NotFound} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;

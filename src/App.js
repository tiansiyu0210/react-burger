import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/Checkout";
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <div>
          <Layout>
              <Switch>
                  {/*history, location and match only in Checkout and BurgerBuilder*/}
                  <Route path="/checkout" component={ Checkout }/>
                  <Route path="/" exact component={ BurgerBuilder }/>
              </Switch>
          </Layout>
        </div>
    )
  }
}
export default App;

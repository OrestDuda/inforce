import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ListView from './views/ListView';
import ProductView from "./views/ProductView"
function App() {
  return (
  <>
    <h1>inforce</h1>

    <Suspense fallback={"Loading"}>
      <Switch>
        <Route exact path="/" component={ListView} />
        <Route path="/product/:productId" component={ProductView} />
        <Redirect to="/" />
      </Switch>
    </Suspense>


</>
  );
}

export default App;



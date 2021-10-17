import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ListView from "./views/ListView";
import ProductView from "./views/ProductView";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
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

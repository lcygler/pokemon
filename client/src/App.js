import { Route, Switch } from "react-router-dom";
import { Create, Detail, Home, Landing } from "./views/index";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home/:idOrName" component={Detail} />
        <Route exact path="/home" component={Home} />
        <Route path="/create" component={Create} />
      </Switch>
    </div>
  );
}

export default App;

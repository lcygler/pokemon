import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Create, Detail, Home } from "./views/index";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/create" component={Create} />
      </Switch>
    </div>
  );
}

export default App;

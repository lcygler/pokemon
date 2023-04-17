import "./App.css";
import Create from "./views/Create/Create";
import Detail from "./views/Detail/Detail";
import Home from "./views/Home/Home";

function App() {
  return (
    <div className="App">
      <Home />
      <Detail />
      <Create />
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//import {Routes} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import ActivityCreate from "./components/ActivityCreate";
import Detail from "./components/Detail";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route>
            <NavBar />
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/activity" component={ActivityCreate} />
              {/* ↑ en este path renderizame este componente */}
              <Route path="/countries/:id" component={Detail} />
              <Route component ={() => <Redirect to ="/" />} />
            </Switch>
          </Route>
        </Switch>
      </div>
      <footer>
        <div className="footer">
          © Copyright 2022 | Carina Bosio | Diseño y Desarrollo | Todos los
          derechos reservados | Henry`s PI
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;

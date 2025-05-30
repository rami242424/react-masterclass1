import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Tv from "./Routes/Tv";
import Home from "./Routes/Home";
import Search from "./Routes/Search";

function App(){
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={["/", "/movies/movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
import { Provider } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import store from "redux/store";

import Home from "pages/Home/Home";
import Appointments from "pages/Appointments/Appointments";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/appointments" component={Appointments} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

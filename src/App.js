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
import Login from "pages/Login/Login";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/appointments" component={Appointments} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </Provider>
  );
}

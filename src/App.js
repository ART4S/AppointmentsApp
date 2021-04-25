import { Provider } from "react-redux";

import store from "redux/store";

import Home from "pages/Home/Home";

import Appointments from "pages/Appointments/Appointments";

const App = () => {
  return (
    <Provider store={store}>
      {/* <Home /> */}
      <Appointments />
    </Provider>
  );
};

export default App;

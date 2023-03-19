import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ViewOrder from "./pages/ViewOrder";
import AddProduct from "./pages/AddProduct";
import ViewProduct from "./pages/ViewProduct";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import LogOut from "./pages/Logout";

import { getToken } from "./api/authenticationService";
import Registration from "./pages/Registration";
import RoleManagement from "./pages/dashboard/RoleManagement";

function App() {
  const data = getToken();
  // data ? <ViewProduct /> : <Redirect to="/login" />;
  return (
    <BrowserRouter>
      {data ? (
        <>
          <Header />
          <Switch>
            <Route exact path="/" component={ViewProduct} />
            <Route exact path="/viewproduct" component={ViewProduct} />
            <Route exact path="/vieworder" component={ViewOrder} />
            <Route exact path="/addproduct" component={AddProduct} />
            <Route exact path="/logout" component={LogOut} />
            <Route exact path="/role" component={RoleManagement} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <Switch>
            <Route exact path="/" component={LoginPage} />
            {/* <Route exact path="/viewproduct" component={ViewProduct} /> */}
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LoginPage} />
            <Route exact path="/registration" component={Registration} />
            <Redirect to="/login" />
          </Switch>
          <br />
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;

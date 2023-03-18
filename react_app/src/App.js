import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Dashboard } from "./pages/dashboard/dashboard";
import ViewOrder from "./pages/ViewOrder";
import Addproduct from "./pages/AddProduct";
import ViewProduct from "./pages/ViewProduct";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={ViewProduct} />
        <Route exact path="/viewproduct" component={ViewProduct} />
        <Route exact path="/vieworder" component={ViewOrder} />
        <Route exact path="/addproduct" component={Addproduct} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

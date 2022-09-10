import Body from "./components/Body";
import Header from "./components/Header";
import CheckoutPage from "./components/CheckoutPage";
import Login from "./components/Login";
import SearchedItem from "./components/SearchedItem";
import ProductPage from "./components/ProductPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderPlace from "./components/OrderPlace";
import Footer from "./components/Footer";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="App">
              <Header />
              <Body />
              <Footer />

              {/* Home */}
            </div>
          }
        />
        <Route
          exact
          path="/order"
          element={
            <div className="App">
              <Header />
              <OrderPlace />
              <Footer />

              {/* Home */}
            </div>
          }
        />

        {/* test route */}
        <Route
          exact
          path="/test"
          element={
            <div className="App">
              <Header />
              <SearchedItem />
              <Footer />
            </div>
          }
        />

        <Route exact path="/login" element={<Login />} />

        <Route
          exact
          path="checkout"
          element={
            <div className="App">
              <Header />
              <CheckoutPage />
              <Footer />
            </div>
          }
        />
        <Route path="/item">
          <Route
            path=":id"
            element={
              <div className="App">
                <Header />
                <ProductPage />
                <Footer />
              </div>
            }
          />
          {/* <Route exact path="/place-order" element={<Login />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

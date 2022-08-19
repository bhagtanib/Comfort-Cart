import Body from "./components/Body";
import Header from "./components/Header";
import CheckoutPage from "./components/CheckoutPage";
import Login from "./components/Login";
import SearchedItem from "./components/SearchedItem";
import ProductPage from "./components/ProductPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderPlace from "./components/OrderPlace";

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
              {/* Home */}
            </div>
          }
        />

        {/* test route */}
        <Route
          exact
          path="/test"
          element={
            <>
              <Header />
              <SearchedItem />
            </>
          }
        />

        <Route exact path="/login" element={<Login />} />

        <Route
          exact
          path="checkout"
          element={
            <>
              <Header />
              <CheckoutPage />
            </>
          }
        />
        <Route path="/item">
          <Route
            path=":id"
            element={
              <>
                <Header />
                <ProductPage />
              </>
            }
          />
          {/* <Route exact path="/place-order" element={<Login />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

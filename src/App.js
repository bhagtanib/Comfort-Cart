import Body from "./Body";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";
import Login from "./Login";
import SearchedItem from "./SearchedItem";
import ProductPage from "./ProductPage";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "../styles/Header.css";
import { Person, Search, ShoppingBasket } from "@mui/icons-material/";
import { useStateValue } from "../Stateprovider";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { array } from "./searchData";
import SearchedItem from "./SearchedItem";

// clear search result
export const clearSearch = () => {};
const Header = () => {
  //accessing context api
  const [{ basket }, dispatch] = useStateValue();
  const [searchResult, setSearchResult] = useState([]);


  const getdata = async () => {
    if (array.length === 0) {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });
    }
  };

  getdata();

  // get the search result
  const handleSearch = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    if (searchWord === "") {
      setSearchResult([]);
    } else {
      const filteredTitleArray = array.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      });
      const filteredDescriptionArray = array.filter((value) => {
        return value.description
          .toLowerCase()
          .includes(searchWord.toLowerCase());
      });
      filteredTitleArray.map((item1) => {
        let found = false;
        for (var i = 0; i < filteredDescriptionArray.length; i++) {
          if (item1.id === filteredDescriptionArray[i].id) {
            found = true;
            break;
          }
        }
        if (!found) {
          filteredDescriptionArray.push(item1);
        }
      });
      setSearchResult(filteredDescriptionArray);
    }
  };

  //State for current user
  const [currentlyUsing, setCurrentlyUsing] = useState();

  // Function for getting Basket information
  const getBasketLength = () => {
    var total = 0;
    basket?.map((item) => {
      total += item.quantity;
    });
    return total;
  };

  // Rerender on user change
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentlyUsing(currentUser);
    });
  }, []);

  // get the cart from server
  useEffect(() => {
    const getCart = async () => {
      let cart = [];
      const q = query(collection(db, "users", currentlyUsing?.uid, "cart"));
      const data = await getDocs(q);
      cart = data.docs.map((doc) => ({ ...doc.data() }));
      dispatch({
        type: "EMPTY_BASKET",
      });
      console.log("cart", cart);
      cart.map((item) => {
        dispatch({
          type: "ADD_TO_BASKET",
          item: item,
        });
      });
    };

    if (currentlyUsing) {
      getCart();
    }
  }, [currentlyUsing]);

  //sign out fucntion
  const appSignOut = async (event) => {
    event.preventDefault();
    dispatch({
      type: "EMPTY_BASKET",
    });
    signOut(auth);
    dispatch({
      type: "LOG_IN_USER",
      newUser: [],
    });
  };

  return (
    <div className="header-container">
      <div className="header">
        <Link to="/">
          <img
            className="amazon-icon"
            alt="#"
            src="https://img.icons8.com/parakeet-line/144/FFFFFF/add-shopping-cart.png"
          />
        </Link>

        <div className="header-search">
          <div className="header-search-box">
            <input
              type="text"
              id="header-search-input"
              className="header-search-input"
              placeholder="Search..."
              onChange={handleSearch}
            ></input>
            <SearchedItem className="header-search-list" array={searchResult} />
          </div>
          <Search className="search-icon" />
        </div>
        <div className="header-nav">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="header-options">
              {currentlyUsing && (
                <>
                  <span className="header-options-two">
                    {currentlyUsing?.email}
                  </span>
                  <button
                    className="header-options-two-button"
                    onClick={appSignOut}
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <div className="header-options">
              {!currentlyUsing && (
                <span className="header-options-one">Hello Guest</span>
              )}
              {!currentlyUsing && (
                <span className="header-options-two">Sign in</span>
              )}
            </div>
          </Link>
          <div className="header-options">
            <span className="header-options-one">Return</span>
            <span className="header-options-two">& Orders</span>
          </div>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Person className="header-options-profile-icon"></Person>
          </Link>
          <Link to="/checkout">
            <div className="header-option-basket">
              <ShoppingBasket />
              {
                <span className="header-options-two">
                  {getBasketLength() ? getBasketLength() : 0}
                </span>
              }
            </div>
          </Link>
        </div>
      </div>

      {/* Header Search Bar for mobile devices */}

      <div className="header-search-mobile">
        <input
          type="text"
          className="header-search-input-mobile"
          placeholder="Search..."
        ></input>
        <Search className="search-icon" />
      </div>
    </div>
  );
};

export default Header;

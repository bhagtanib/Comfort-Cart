import "../styles/CheckoutPage.css";
import { useStateValue } from "../Stateprovider";
import CheckItem from "./CheckItem";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [{ basket }] = useStateValue();

  const getBasketTotal = () => {
    var total = 0;
    basket?.map((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };
  getBasketTotal();
  const placeOrder = () => {
    console.log("place order");
  };
  return (
    <div className="checkoutPage">
      <div className="checkout-left">
        <div className="checkout-left-top">
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt="Check out"
          />
          <h1 className="checkout-text">This is checking out</h1>
        </div>
        <div className="checkout-left-bottom">
          {basket.map((item, index) => (
            <div key={index} className="checkout-product-container">
              <CheckItem
                className="checkout-product"
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                quantity={item.quantity}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="checkout-right">
        <div className="checkout-right-container">
          <h1>
            {" "}
            Subtotal ( {basket.length} items): ${getBasketTotal().toFixed(2)}{" "}
          </h1>
          <div className="gift-button-container">
            <button type="radio" className="gift-button-check"></button>
            <p>This is a gift</p>
          </div>
          <Link to="/order">
            <button className="basket-button" onClick={placeOrder}>
              Proceed to checkout{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

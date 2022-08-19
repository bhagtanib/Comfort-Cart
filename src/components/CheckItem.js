import React from "react";
import { useStateValue } from "../Stateprovider";
import "../styles/CheckItem.css";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { updateDoc } from "firebase/firestore";

const CheckItem = ({ id, title, price, image, rating, quantity }) => {
  const user = auth.currentUser;
  const changeQuantity = async (change) => {
    const newQuantity = change === "increase" ? quantity + 1 : quantity - 1;

    dispatch({
      type: "REMOVE_FROM_BASKET",
      item: {
        id: id,
      },
    });

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        rating: rating,
        price: price,
        quantity: newQuantity,
      },
    });
    if (user !== null) {
      newQuantity === 0
        ? removeFromBasket()
        : await updateDoc(doc(db, `users/${user.uid}/cart/${id}`), {
            quantity: newQuantity,
          });
    } else {
      console.log("No user");
    }
  };

  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = async () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      item: {
        id: id,
      },
    });
    await deleteDoc(doc(db, `users/${user.uid}/cart/${id}`));
  };
  return (
    <div className="check-container">
      <div className="check-top">
        <p className="title-tag">{title}</p>
        <p>${price}</p>
        <div className="check-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>
      <div className="check-bottom">
        <img className="check-image" src={image} alt="#"></img>
        <button className="checkout-basket-button" onClick={removeFromBasket}>
          {" "}
          Remove
        </button>
        <div className="quantity-container">
          <RemoveIcon
            onClick={(e) => {
              changeQuantity("decrease");
            }}
          />
          <p>{quantity}</p>
          <AddIcon
            fontSize="medium"
            onClick={(e) => {
              changeQuantity("increase");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckItem;

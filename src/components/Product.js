import "../styles/Product.css";
import { useStateValue } from "../Stateprovider";
import { db, auth } from "../firebase";
// import { collection, getDocs, getFirestore, onSnapshot, addDoc, deleteDoc, doc,
// query, where  } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Product = ({ id, title, price, image, rating }) => {
  const user = auth.currentUser;
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = async () => {
    if (user !== null) {
      const docSnap = await getDoc(doc(db, `users/${user.uid}/cart/${id}`));
      if (docSnap.exists()) {
        const quantity = docSnap.data().quantity + 1;
        await updateDoc(doc(db, `users/${user.uid}/cart/${id}`), {
          quantity: quantity,
        });

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
            quantity: quantity,
          },
        });
      } else {
        const item = {
          id: id,
          title: title,
          image: image,
          rating: rating,
          price: price,
          quantity: 1,
        };
        await setDoc(doc(db, `users/${user.uid}/cart/${id}`), item);
        dispatch({
          type: "ADD_TO_BASKET",
          item: item,
        });
      }
    } else {
      dispatch({
        type: "UPDATE_BASKET",
        item: {
          id: id,
          title: title,
          image: image,
          rating: rating,
          price: price,
        },
      });
    }
  };
  return (
    <div className="product-container">

      <Link to={`/item/${id}`}>
        <div className="product-top">
          <p>{title}</p>
          <p>${price}</p>
          <div className="product-rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p key={i}>⭐</p>
              ))}
          </div>
        </div>
      </Link>
      <div className="product-bottom">
        <img className="product-image" src={image} alt="#"></img>
        <button className="basket-button" onClick={addToBasket}>
          Add to basket
        </button>
      </div>
    </div>
  );
};

export default Product;

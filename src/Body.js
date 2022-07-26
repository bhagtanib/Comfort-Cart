import React, { useEffect, useState } from "react";
import "./Body.css";
import Product from "./Product";
import { imageArray } from "./ImageArray";

const Body = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [imageLoaded, setImageLoaded] = React.useState(false);

  useEffect(() => {
    const interval = setInterval(() => {

      if (currentImageIndex === imageArray.length - 1) {
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="body">
      <div className="body-poster">
        <img
          className={`smooth-image image-${imageLoaded ? "visible" : "hidden"}`} 
          onLoad={()=> setImageLoaded(true)}
          src={imageArray[currentImageIndex].image}
          alt="#"
        ></img>
      </div>
      <div className="body-items">
        <div className="product-row">
          <Product
            id={52143104}
            title="Thereye Countertop Nugget Ice Maker, Pebble Ice Maker Machine, 30lbs Per Day, 2 Ways Water Refill"
            image="https://m.media-amazon.com/images/I/71YvvbiTR-L._SX522_.jpg"
            rating={4}
            price={399.99}
          />
          <Product
            id={52143}
            title="Amazon Fire TV 55 inch Omni Series 4K UHD smart TV, hands-free with Alexa"
            image="https://m.media-amazon.com/images/I/618Yxam1kWL._AC_SX679_.jpg"
            rating={5}
            price={199.99}
          />
        </div>
        <div className="product-row">
          <Product
            id={521434}
            title="Amazon Fire TV 55 inch Omni Series 4K UHD smart TV, hands-free with Alexa"
            image="https://m.media-amazon.com/images/I/51Y2XPwLkoL._AC_SX466_.jpg"
            rating={5}
            price={578.92}
          />
          <Product
            id={52434}
            title="Echo Dot (3rd Gen, 2018 release) - Smart speaker with Alexa - Charcoal"
            image="https://m.media-amazon.com/images/I/6182S7MYC2L._AC_SX679_.jpg"
            rating={5}
            price={29.99}
          />
          <Product
            id={52144}
            title="Reverbix E7 PRO Active Noise Cancelling Headphones Overhead Bluetooth with Mic for Phone-Call, Comfortable Wireless & Light Weight"
            image="https://m.media-amazon.com/images/I/61XsRAjmd9L._AC_SX466_.jpg"
            rating={4}
            price={199.99}
          />
        </div>
        <div className="product-row">
          <Product
            id={21434}
            title="Amazon Fire TV 55 inch Omni Series 4K UHD smart TV, hands-free with Alexa"
            image="https://m.media-amazon.com/images/I/618Yxam1kWL._AC_SX679_.jpg"
            rating={5}
            price={199.99}
          />
        </div>
      </div>

    </div>
  );
};

export default Body;

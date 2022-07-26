import { useParams } from "react-router-dom";
import "./ProductPage.css";
import { useStateValue } from "./Stateprovider";

const ProductPage = () => {
  const [{ }, dispatch] = useStateValue();
    let {id} = useParams();
    console.log(id);
  return <div className="product-page">ID : {id}</div>;
};


export default ProductPage;

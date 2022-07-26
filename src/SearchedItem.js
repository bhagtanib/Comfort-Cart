import { Link } from "react-router-dom";
import "./SearchedItem.css";
const SearchedItem = ({ array }) => {
  const handleClick = () => { 
  }
  if (array.length > 0) {
    return (
      <div className="searched-items">
        {array.map((item, index) => {
          const link = `/item/${item.id}`;
          return (
            <Link to = {link}>
            <a onClick={handleClick} key={index} className="searched-item">
              {item.title}
            </a>
            </Link>
          );
        })}
      </div>
    );
  }
};

export default SearchedItem;

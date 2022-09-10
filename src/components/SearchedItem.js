import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SearchedItem.css";
const SearchedItem = ({ array }) => {
  // const [filteredData, setFilteredData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const handleClick = () => {
     setIsExpanded(false);
  }
  useEffect(() => {
     setIsExpanded(true);
     array.length = 0;
  }, [isExpanded])

  if (array.length > 0) {
    return (
      <div className="searching">
        {isExpanded && (
          <div className="searched-items">
            {array.map((item, index) => {
              const link = `/item/${item.id}`;
              return (
                <Link className="searched-item" to={link}>
                  <h1
                    onClick={handleClick}
                    key={index}
                    className="searched-item"
                  >
                    {item.title}
                  </h1>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }
};

export default SearchedItem;

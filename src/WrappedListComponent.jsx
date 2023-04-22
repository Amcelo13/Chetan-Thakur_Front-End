import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      // added a key prop
      key={index}
      // changed isSelected to a function
      style={{ backgroundColor: isSelected(index) ? "lightgreen" : "darkgray" }}
      // Declaration as an arrow function 
      onClick={() => onClickHandler(index)}                                                                                             
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  // changed isSelected type to function
  isSelected: PropTypes.func.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
  // Interchanging selectedIndex and setSelectedIndex 
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(-1);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };



  return (
    <ul style={{ textAlign: "left" }}>

      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          // Modified
          isSelected={(ind) => ind === selectedIndex}
        />
      ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  // Modified array -> arrayOf and shapeOf -> shape
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  // passing an empty array
  items: [],
};

const List = memo(WrappedListComponent);

export default List;
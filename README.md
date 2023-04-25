#  STEELEYE LIMITED FRONTEND ENGINEER ASSIGNMENT
Deployed Link - https://chetan-steeleye-assign.netlify.app/ <br/> <br/>
Here below are the solutions for the assignment

# Q1. Explain what the simple List component does.

A list of items is rendered as an unordered list on the webpage using the basic List component, a React component.'WrappedListComponent' and 'WrappedSingleListItem' are two components in the code.The relationship between the components is as follows: WrappedSingleListItem is a child component, whereas WrappedListComponent is a parent component. Here, "items" is an array of objects in the code, and each object contains an element "text" of the string type that is shown on the website.

## Functioning of Simple List component ##

* The `WrappedSingleListComponent` is a memoized functional component since it makes use of `memo` to show a single item with a backdrop colour of either green or red depending on the value of the boolean flag isSelected.
Re-rendering the component will only occur if its props have changed. As a result, performance may be enhanced by reducing the need for extra renderings. Using the `WrappedSingleListComponent` as a child component, the `WrappedListComponent` generates an exhaustive list of items.
* The List component receives an array of objects named `items` as props 
* The item array are mapped in `WrappedListComponent` inside `ul` tag
* Below are the set of props are passed in `WrappedSingleListItem` component 
    * { key={index}, text={item.text} ,index={index},isSelected={setSelectedIndex === index} ,onClickHandler={() => handleClick(index)} }
* The Items are displayed on the webpage and whenever user click on a single list item it should change colour from red to green and vice versa.
* The `isSelected` boolean variable is use for changing the background color of the clicked list item to green if true or else red if false.
* The `onClickHandler()` function sets the index of the particular item using the 'useState' hook named as 'selectedIndex'.
* So Combining both `isSelected` and `onClickHandler` trigger the `selectedIndex` hook and the  variable is compared to all the mapped indices where it checks the indices if matched then it become green or else becomes red.


## Q2. What problems/warnings are there with code? ##

* The `WrappedListComponent` erroneously uses the `useState` hook. When given an initial state, the function useState returns two values: the "current state" and "function that updates the state." Here, "[setSelectedIndex, selectedIndex]" should be used instead of "[selectedIndex, setSelectedIndex]".
* In `WrappedListComponent.propTypes`, `PropTypes.array` and `PropTypes.shapeOf` have invalid type definitions.
* The lack of a "key" prop in the "SingleListItem" component raises an alert because using the array "map" function to map array components requires a unique "key" to distinguish between them.
* The isSelected prop of the SingleListItem component is a boolean value that indicates whether the item is selected or not. However, the code is passed with  selectedIndex value, which is a  null. This will cause a type mismatch warning and may result in incorrect behavior of the component. So, changing `isSelected` prop of the `SingleListItem` component to be a function that compares the index with the selectedIndex value and returns a boolean.
* The onClickHandler props is assigned incorrectly, it should be called as a callback to be called when the list item is clicked.

## Q3. Please fix, optimize, and/or modify the component as much as you think is necessary. ##

* In the `useState` hook, the order of "setSelectedIndex" and "selectedIndex" was switched.
* `PropTypes.array` and `PropTypes.shapeOf` have been redefined in `WrappedListComponent.propTypes` as `PropTypes.array` and `PropTypes.shapeOf,` respectively.
* A 'key' in prop equal to a 'index' has been added to the 'SingleListItem' component for uniquely identifying items.
* The value of selectedIndex is assigned to “null” changed to -1 as in the beginning it will reflect that nothing is selected.
* onClickHandler prop changed from `onClick={onClickHandler(index)}` to  `onClick={() => onClickHandler(index)}`.

### CODE ###

```
import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      // added a key prop
      key={index}
      // changed isSelected to a function
      style={{ backgroundColor: isSelected(index) ? "green" : "red" }}
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


```

**Name** : Chetan Thakur <br/>
**Reg No**. : 12012993 <br/>
**Course** : Btech (CSE) <br/>
**Email id** : tchetan308@gmail.com <br/>
**Mobile No.** : 6284959387 <br/>

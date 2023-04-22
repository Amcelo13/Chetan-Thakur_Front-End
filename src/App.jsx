import "./App.css";
import WrappedListComponent from "./WrappedListComponent.jsx";

const items = [
  {
    "text": "Chetan",
  },
  {
    text: "Thakur",
  },
  {
    text: "Alex",
  },
];
function App() {
  return (
    <div style={{cursor:'pointer'}}>
      <WrappedListComponent items = {items}/>
    </div>
  );
}

export default App;

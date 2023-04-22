import "./App.css";
import WrappedListComponent from "./WrappedListComponent.jsx";

const items = [
  {
    "text": "Harsh",
  },
  {
    text: "Ravi",
  },
  {
    text: "John",
  },
];
function App() {
  return (
    <div>
      <WrappedListComponent items = {items}/>
    </div>
  );
}

export default App;

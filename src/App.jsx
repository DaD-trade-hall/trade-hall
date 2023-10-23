import { useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import ItemList from "./components/ItemList";
import ItemDetail from "./components/ItemDetail";
import ItemCard from "./components/ItemCard";
import enchantments from "./constants/enchantments.json";
import itemTypes from "./constants/itemTypes.json";

function App() {
  const [items, setItems] = useState([]);
  const [itemsFilter, setItemsFilter] = useState({});

  useEffect(() => {
    document.title = "Trade Hall";

    fetch(
      "https://2wolo16gne.execute-api.us-east-2.amazonaws.com/PROD/fetch-items"
    )
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  useEffect(() => {
    if (itemsFilter && Object.keys(itemsFilter).length) {
      fetch(
        "https://2wolo16gne.execute-api.us-east-2.amazonaws.com/PROD/fetch-items",
        {
          method: "POST",
          body: JSON.stringify(itemsFilter),
        }
      )
        .then((response) => response.json())
        .then((data) => setItems(data));
    }
  }, [itemsFilter]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/items" />} />
      <Route
        path="items"
        element={
          <ItemList
            items={items}
            setItemsFilter={setItemsFilter}
            enchantments={enchantments}
            itemTypes={itemTypes}
          />
        }
      />
      <Route path="items/:itemId" element={<ItemDetail items={items} />} />
      <Route path="test" element={<ItemCard item={items[2]} />} />
    </Routes>
  );
}

export default App;

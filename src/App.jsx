import { useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import ItemList from "./components/ItemList";
import ItemDetail from "./components/ItemDetail";
import ItemCard from "./components/ItemCard";

function App() {
  const [items, setItems] = useState([]);
  const [enchantments, setEnchantments] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);

  useEffect(() => {
    document.title = "Trade Hall";

    console.log(import.meta.env.VITE_ITEMS_FETCH_URL);

    fetch(import.meta.env.VITE_ITEMS_FETCH_URL)
      .then((response) => response.json())
      .then((data) => setItems(data));

    fetch("http://localhost:3000/itemTypes")
      .then((response) => response.json())
      .then((data) => setItemTypes(data));

    fetch("http://localhost:3000/enchantments")
      .then((response) => response.json())
      .then((data) => setEnchantments(data));
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/items" />} />
      <Route
        path="items"
        element={
          <ItemList
            items={items}
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

import { useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import ItemList from "./components/ItemList";
import ItemDetail from "./components/ItemDetail";
import ItemCard from "./components/ItemCard";

function App() {
  const [items, setItems] = useState([]);
  const [itemsFilter, setItemsFilter] = useState({});
  const [enchantments, setEnchantments] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);

  useEffect(() => {
    document.title = "Trade Hall";

    console.log(import.meta.env.VITE_ITEMS_FETCH_URL);

    fetch(
      "https://vay104njmg.execute-api.us-east-2.amazonaws.com/prod/fetch-items",
      {
        method: "POST",
        body: JSON.stringify(itemsFilter),
        mode: "cors",
      }
    )
      .then((response) => response.json())
      .then((data) => setItems(data));

    fetch("http://localhost:3000/itemTypes")
      .then((response) => response.json())
      .then((data) => setItemTypes(data));

    fetch("http://localhost:3000/enchantments")
      .then((response) => response.json())
      .then((data) => {
        setEnchantments(data);
      });
  }, []);

  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

  // useEffect(() => {
  //   console.log(enchantments);
  // }, [enchantments]);

  useEffect(() => {
    if (itemsFilter && Object.keys(itemsFilter).length) {
      fetch(import.meta.env.VITE_ITEMS_FETCH_URL, {
        method: "POST",
        body: JSON.stringify(itemsFilter),
      })
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

import "../App.css";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { SimpleGrid } from "@chakra-ui/react";
import { ItemSearch } from "./ItemSearch";
import { ItemFilterBuilder } from "./ItemFilterBuilder";

function ItemList({ items, setItemsFilter, itemTypes, enchantments }) {
  return (
    <>
      <ItemFilterBuilder
        enchantments={enchantments}
        itemTypes={itemTypes}
        setItemsFilter={setItemsFilter}
      />
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
        spacing={8}
        width={"80vw"}
      >
        {items.map((item, index) => {
          return <ItemCard item={item} key={`item-card-${index}`} />;
        })}
      </SimpleGrid>
    </>
  );
}

export default ItemList;

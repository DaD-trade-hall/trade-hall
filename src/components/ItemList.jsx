import "../App.css";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { SimpleGrid } from "@chakra-ui/react";
import { ItemSearch } from "./ItemSearch";
import { ItemFilterBuilder } from "./ItemFilterBuilder";

function ItemList({ items, setItemsFilter, itemTypes, enchantments }) {
  const enchantmentFilterTags = enchantments.map((enchantment, index) => {
    return {
      value: index,
      name: enchantment.name,
      label: enchantment.name
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
        .replace("Damage", "Dmg"),
    };
  });

  const itemTypeFilterTags = itemTypes.map((itemType, index) => {
    return {
      value: index,
      name: Object.keys(itemType)[0],
      label: Object.keys(itemType)[0]
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    };
  });

  const [enchantmentFilters, setEnchantmentFilters] = useState([]);

  const [itemTypeFilters, setItemTypeFilters] = useState([]);

  // [weaponDamage, quality, itemType]
  const [sortingMode, setSortingMode] = useState("weapon_damage");

  const itemsFilteredByEnchantments = items.filter((item) =>
    enchantmentFilters.every((filter) =>
      item.enchantments
        .map((enchantment) => enchantment.name)
        .includes(filter.name)
    )
  );

  const itemsFilteredByItemType =
    itemTypeFilters.length > 0
      ? itemsFilteredByEnchantments.filter((item) =>
          itemTypeFilters.map((filter) => filter.name).includes(item.itemType)
        )
      : itemsFilteredByEnchantments;

  let sortedList = itemsFilteredByItemType;

  const qualityTable = {
    uncommon: 1,
    rare: 2,
    epic: 3,
    legendary: 4,
    unique: 5,
  };

  switch (sortingMode) {
    case "weapon_damage":
      sortedList = itemsFilteredByItemType.sort(
        (prev, next) =>
          (prev.weaponDamage || 0) +
          (prev.magicWeaponDamage || 0) +
          (prev.magicDamage || 0) -
          ((next.weaponDamage || 0) +
            (next.magicWeaponDamage || 0) +
            (next.magicDamage || 0))
      );
      break;
    case "quality":
      sortedList = itemsFilteredByItemType.sort(
        (prev, next) => qualityTable[prev.quality] - qualityTable[next.quality]
      );
      break;
    case "highest_offer":
      sortedList = itemsFilteredByItemType.sort(
        (prev, next) => next.initialOffer - prev.initialOffer
      );
  }

  return (
    <>
      {/* <ItemSearch
        enchantments={enchantmentFilterTags}
        setEnchantmentFilters={setEnchantmentFilters}
        itemTypes={itemTypeFilterTags}
        setItemTypeFilters={setItemTypeFilters}
        setSortingMode={setSortingMode}
      /> */}
      <ItemFilterBuilder
        enchantments={enchantments}
        setItemsFilter={setItemsFilter}
      />
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
        spacing={8}
        width={"80vw"}
      >
        {sortedList.map((item) => {
          return <ItemCard item={item} />;
        })}
      </SimpleGrid>
    </>
  );
}

export default ItemList;

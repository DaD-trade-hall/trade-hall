import React, { useCallback, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";
import { Box, Select } from "@chakra-ui/react";
import "../styles/ItemSearch.css";

export function ItemSearch({
  enchantments,
  setEnchantmentFilters,
  itemTypes,
  setItemTypeFilters,
  setSortingMode,
}) {
  const [selectedEnchantments, setSelectedEnchantments] = useState([]);
  const [selectedItemTypes, setSelectedItemTypes] = useState([]);

  const onAddEnchantment = useCallback(
    (newTag) => {
      setSelectedEnchantments([...selectedEnchantments, newTag]);
      setEnchantmentFilters([...selectedEnchantments, newTag]);
    },
    [selectedEnchantments]
  );

  const onDeleteEnchantment = useCallback(
    (tagIndex) => {
      const updated = selectedEnchantments.filter((_, i) => i !== tagIndex);
      setSelectedEnchantments(updated);
      setEnchantmentFilters(updated);
    },
    [selectedEnchantments]
  );

  const onAddItemType = useCallback(
    (newTag) => {
      setSelectedItemTypes([...selectedItemTypes, newTag]);
      setItemTypeFilters([...selectedItemTypes, newTag]);
    },
    [selectedItemTypes]
  );

  const onDeleteItemType = useCallback(
    (tagIndex) => {
      const updated = selectedItemTypes.filter((_, i) => i !== tagIndex);
      setSelectedItemTypes(updated);
      setItemTypeFilters(updated);
    },
    [selectedItemTypes]
  );

  return (
    <Box marginLeft={12} w={"20vw"}>
      <Select
        onChange={(event) => setSortingMode(event.target.value)}
        placeholder="Sorting Mode"
      >
        <legend>Test Value</legend>
        <option value="weapon_damage">Damage</option>
        <option value="quality">Quality</option>
        <option value="highest_offer">Highest Offer</option>
      </Select>
      <ReactTags
        placeholderText="Filter enchantments"
        selected={selectedEnchantments}
        suggestions={enchantments}
        onAdd={onAddEnchantment}
        onDelete={onDeleteEnchantment}
        noOptionsText="No matching enchantments"
      />
      <ReactTags
        placeholderText="Filter item types"
        selected={selectedItemTypes}
        suggestions={itemTypes}
        onAdd={onAddItemType}
        onDelete={onDeleteItemType}
        noOptionsText="No matching item types"
      />
    </Box>
  );
}

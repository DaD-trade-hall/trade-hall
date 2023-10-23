import { useState, useEffect } from "react";
import "react-querybuilder/dist/query-builder.css";
import { QueryBuilder, formatQuery } from "react-querybuilder";
import { ValueEditor as DefaultValueEditor } from "react-querybuilder";
import { customRuleProcessor } from "../util/customRuleProcessor";
import Select from "react-select";

function ValueEditor(props) {
  const { field, handleOnChange, value, values } = props;

  if (
    field === "class" ||
    field === "quality" ||
    field === "enchantment" ||
    field === "itemType"
  ) {
    return (
      <Select
        onChange={handleOnChange}
        value={value}
        options={values}
        styles={{
          option: (styles) => {
            return {
              ...styles,
              color: "black",
            };
          },
        }}
      />
    );
  }

  return <DefaultValueEditor {...props} />;
}

export function ItemFilterBuilder({ enchantments, itemTypes, setItemsFilter }) {
  const fields = [
    {
      name: "class",
      label: "Class",
      values: [
        { value: "cleric", label: "Cleric" },
        { value: "warlock", label: "Warlock" },
        { value: "barbarian", label: "Barbarian" },
        { value: "bard", label: "Bard" },
        { value: "wizard", label: "Wizard" },
        { value: "fighter", label: "Fighter" },
        { value: "rogue", label: "Rogue" },
      ],
      operators: [
        { name: "=", label: "IS" },
        { name: "!=", label: "IS NOT" },
      ],
    },
    {
      name: "quality",
      label: "Quality",
      values: [
        { value: "uncommon", label: "Uncommon" },
        { value: "rare", label: "Rare" },
        { value: "epic", label: "Epic" },
        { value: "legendary", label: "Legendary" },
        { value: "unique", label: "Unique" },
      ],
      operators: [
        { name: "=", label: "IS" },
        { name: "!=", label: "IS NOT" },
      ],
    },
    {
      name: "enchantment",
      label: "Enchantment",
      values: enchantments.map((enchantment) => {
        return {
          value: enchantment,
          label: enchantment
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
            .replace("Damage", "Dmg"),
        };
      }),
      operators: [
        { name: "=", label: "IS" },
        { name: "!=", label: "IS NOT" },
      ],
    },
    {
      name: "itemType",
      label: "Item Type",
      values: itemTypes.map((itemType) => {
        return {
          value: itemType,
          label: itemType
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        };
      }),
      operators: [
        { name: "=", label: "IS" },
        { name: "!=", label: "IS NOT" },
      ],
    },
  ];

  const [query, setQuery] = useState({
    combinator: "and",
    rules: [
      {
        field: "class",
        operator: "=",
        value: { value: "cleric", label: "Cleric" },
      },
      {
        field: "quality",
        operator: "=",
        value: { value: "rare", label: "Rare" },
      },
    ],
  });

  useEffect(() => {
    setItemsFilter(
      formatQuery(query, {
        format: "mongodb",
        ruleProcessor: customRuleProcessor,
      })
    );
  }, [query]);

  return (
    <>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={(q) => setQuery(q)}
        controlElements={{ valueEditor: ValueEditor }}
      />
      <h4>Query Output:</h4>
      <pre>
        {formatQuery(query, {
          format: "mongodb",
          ruleProcessor: customRuleProcessor,
        })}
      </pre>
    </>
  );
}

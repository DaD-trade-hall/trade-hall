import { defaultRuleProcessorMongoDB } from "react-querybuilder";

export function customRuleProcessor(rule, options) {
  if (rule?.value == null) return;
  let { value } = rule?.value;

  let chunk;

  switch (rule.field) {
    case "quality":
      if (rule.operator === "=") {
        chunk = { quality: value };
      } else if (rule.operator === "!=") {
        chunk = { quality: { $ne: value } };
      }
      break;
    case "class":
      if (rule.operator === "=") {
        chunk = { classes: value };
      } else if (rule.operator === "!=") {
        chunk = { classes: { $ne: value } };
      }
      break;
    case "enchantment":
      if (rule.operator === "=") {
        chunk = { "enchantments.name": value };
      } else if (rule.operator === "!=") {
        chunk = { "enchantments.name": { $ne: value } };
      }
      break;
    case "itemType":
      if (rule.operator === "=") {
        chunk = { itemType: value };
      } else if (rule.operator === "!=") {
        chunk = { itemType: { $ne: value } };
      }
      break;
  }

  if (chunk) return JSON.stringify(chunk);

  // switch (rule.field) {
  //   case "quality":
  //     return `{"quality":"${value}"}`;
  //   case "class":
  //     return `{"classes":"${value}"}`;
  //   case "enchantment":
  //     return `{"enchantments.name":"${value}"}`;
  //   case "itemType":
  //     return `{"itemType":"${value}"}`;
  // }

  return defaultRuleProcessorMongoDB(rule, options);
}

import { defaultRuleProcessorMongoDB } from "react-querybuilder";

export function customRuleProcessor(rule, options) {
  if (rule?.value == null) return;
  let { value } = rule?.value;

  switch (rule.field) {
    case "quality":
      return `{"quality":"${value}"}`;
    case "class":
      return `{"classes":"${value}"}`;
    case "enchantment":
      return `{"enchantments.name":"${value}"}`;
  }

  return defaultRuleProcessorMongoDB(rule, options);
}

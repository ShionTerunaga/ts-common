import { type Option, optionUtility } from "./option.js";

export function envParse(env: string | undefined): Option<string> {
  const { optionConversion } = optionUtility;

  return optionConversion(env);
}

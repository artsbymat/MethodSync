import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function extractFunctionName(code) {
  // get function declaration
  let match = code.match(/function\s+([a-zA-Z0-9_$]+)\s*\(/);
  if (match) return match[1];

  // get arrow function (const/let/var)
  match = code.match(/(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*\(/);
  if (match) return match[1];

  return null;
}

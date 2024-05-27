import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractJson = (data: any) => {
  console.log(data);
  const regex = /'''json\s*([\s\S]*?)\s*'''/;
  const match = data.match(regex);
  if (match && match[1]) {
    try {
      const jsonData = JSON.parse(match[1]);
      return jsonData;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  } else {
    console.log("No JSON data found");
    return null;
  }
};

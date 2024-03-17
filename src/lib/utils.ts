import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export const groupBy = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string
) =>
  array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });

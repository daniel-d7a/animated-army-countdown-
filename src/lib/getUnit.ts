import { Unit } from "@/Types/counter";

export function getUnit(value: number, unit: Unit) {
  return value === 1 ? unit : `${unit}s`;
}

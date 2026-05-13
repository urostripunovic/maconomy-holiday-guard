import type { Branded } from "../types/type"

export type Holiday = Branded<string, "Holiday">
export type Date = Branded<string, "Date">

export type HolidayMap = Map<Date, Holiday>

// Maps Maconomy's DOM field IDs to day offset from Monday
export const DAY_OFFSETS = {
  numberday1: 0,
  numberday2: 1,
  numberday3: 2,
  numberday4: 3,
  numberday5: 4,
  numberday6: 5,
  numberday7: 6,
} as const

export type DayColumn = keyof typeof DAY_OFFSETS;

export type Day = Branded<number, "Day">
export type Year = Branded<number, "Year">


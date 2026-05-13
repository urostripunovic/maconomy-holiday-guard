import { Temporal } from "temporal-polyfill"
import type { HolidayMap, Year, Date, Holiday } from "./holiday.ts"
import type { Result } from "../types/type.ts";

const FIXED_HOLIDAYS = [
  { month: 1, day: 1, name: 'Nyårsdagen' },
  { month: 1, day: 6, name: 'Trettondedag jul' },
  { month: 5, day: 1, name: 'Första maj' },
  { month: 6, day: 6, name: 'Nationaldagen' },
  { month: 12, day: 24, name: 'Julafton' },
  { month: 12, day: 25, name: 'Juldagen' },
  { month: 12, day: 26, name: 'Annandag jul' },
  { month: 12, day: 31, name: 'Nyårsafton' },
] as const;

/**
 * Meeus/Jones/Butcher algorithm for Easter Sunday.
 * Returns the date of Easter Sunday for a given year.
 */
function easterSunday(year: Year) {
  return new Date()
}

/**
 * Midsommarafton — the Friday between June 19-25.
 */
//     # Utgå från den 19 juni (tidigast möjliga datum)
//     datum = datetime.date(ar, 6, 19)
//     # weekday() returnerar 0=måndag, ..., 4=fredag, 5=lördag, 6=söndag
//     # Vi vill hitta fredagen (4)
//     dag_i_veckan = datum.weekday()
//     # Räkna ut hur många dagar som behöver läggas till för att nå fredag
//     dagar_till_fredag = (4 - dag_i_veckan) % 7
//     midsommarafton = datum + datetime.timedelta(days=dagar_till_fredag)
function midsommarafton(year: Year) {
  return new Date()
}

/**
 * Alla helgons dag — the Saturday between Oct 31 - Nov 6.
 */
//     # Utgå från 31 oktober
//     datum = datetime.date(ar, 10, 31)
//     # 0=måndag, ..., 5=lördag, 6=söndag. Vi söker lördag (5)
//     dag_i_veckan = datum.weekday()
//     # Räkna ut dagar kvar till lördag
//     dagar_till_lordag = (5 - dag_i_veckan) % 7
//     allaHelgonsDag = datum + datetime.timedelta(days=dagar_till_lordag)
function allaHelgonsDag(year: Year) {
  return new Date()
}

export function getSwedishHolidays(year: Year): Result<HolidayMap> {
  const map: HolidayMap = new Map()
  // Fixed
  for (const { month, day, name } of FIXED_HOLIDAYS) {
    const date = Temporal.PlainDate.from({ year, month, day }).toString();
    if (!isValidDate(date)) {
      return {
        success: false,
        error: {
          code: "PARSE_ERROR",
          message: "unable to parse fixed date, shouldn't be possible"
        }
      }
    }

    if (!isValidHolidayName(name)) {
      return {
        success: false,
        error: {
          code: "PARSE_ERROR",
          message: "unable to parse fixed holiday name, shouldn't be possible"
        }
      }
    }
    add(map, date, name);
  }

  // Movable

  return { success: true, data: map }
}

export function isHoliday(date: Year, map?: HolidayMap) {
}

function add(map: HolidayMap, date: Date, name: Holiday) {
  map.set(date, name)
}

function isValidHolidayName(value: string): value is Holiday {
  return value.length > 0 && value.length <= 128
}

function isValidDate(value: string): value is Date {
  try {
    Temporal.PlainDate.from(value)
    return true
  } catch {
    return false
  }
}

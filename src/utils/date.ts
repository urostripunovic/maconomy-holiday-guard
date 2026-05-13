import type { Temporal } from 'temporal-polyfill';
import { DAY_OFFSETS, type DayColumn } from "../holidays/holiday";
import type { MaconomyRowIndex, Result } from '../types/type';

/**
 * Extract the DayColumn token from an input ID like:
 *   timeregistrationtable_numberday3_field_0_c1_e1
 */
export function extractDayColumn(id: string): Result<DayColumn> {
  const match = /_(numberday[1-7])(?=_)/.exec(id)
  if (!match) return {
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "unable to locate day column index in html id element"
    }
  };
  // {
  //   "scope": "extractRowIndex",
  //   "level": "error",
  //   "message": "Failed to extract row index",
  //   "context": {
  //     "id": "timeregistrationtable_numberday3_field_0_c1_e1"
  //   }
  // }

  const dayColoumn = match[1];

  if (!isDayColumn(dayColoumn)) {
    return {
      success: false,
      error: {
        code: "PARSE_ERROR",
        message: "extracted column html element is not of type number"
      }
    };

  }
  return { success: true, data: dayColoumn };
}

function isDayColumn(value?: string): value is DayColumn {
  return typeof value === "string" && Object.hasOwn(DAY_OFFSETS, value)
}

/**
 * Extract the row index from an input ID like:
 *   timeregistrationtable_numberday3_field_0_c1_e1 → 0
 */
export function extractRowIndex(id: string): Result<MaconomyRowIndex> {
  const match = /_field_(\d+)(?=_)/.exec(id)
  if (!match) return {
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "unable to locate row index in html id element"
    }
  };

  const maconomyRowIndex = Number(match[1]) //Number(undefined) = NaN --> typeof Number(undefined) === 'number' --> true
  if (!isMaconomyRowIndex(maconomyRowIndex))
    return {
      success: false,
      error: {
        code: "PARSE_ERROR",
        message: "extracted row html element is not of type number"
      }
    };


  return { success: true, data: maconomyRowIndex };
}

function isMaconomyRowIndex(value: number): value is MaconomyRowIndex {
  return Number.isInteger(value) && value >= 0
}

/**
 * Get the actual calendar date for a given column within a week.
 * numberday1 = Monday, numberday7 = Sunday.
 */
export function getDateForColumn(column: DayColumn, week: Temporal.PlainDate) {
  const offset = DAY_OFFSETS[column];
  return week.add({ days: offset });
}

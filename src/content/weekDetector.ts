import { Temporal } from 'temporal-polyfill';
import type { Result } from '../types/type';

/**
 * Extract a WeekContext from dm-calendar's .date-heading element.
 *
 * The heading text is always: " Week 20: 2026-05-11 - 2026-05-17 "
 * We grab the first ISO date (the Monday) directly.
 */
export function detectCurrentWeek(el: Element): Result<Temporal.PlainDate> {
  const text = el.textContent ?? '';
  // Match the start date: "Week N<A|B>: YYYY-MM-DD - YYYY-MM-DD"
  const match = text.match(/Week\s+\d+[AB]?:\s*(\d{4}-\d{2}-\d{2})/i);
  if (!match) {
    return {
      success: false,
      error: {
        code: "INVALID_WEEK_HEADER",
        message: "unable to extract heading text from html header element"
      }
    }
  }

  //Gregory calendar
  try {
    const dateString = match[1]
    const date = Temporal.PlainDate.from(`${dateString}[u-ca=gregory]`)
    return { success: true, data: date };
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: {
        code: "PARSE_ERROR",
        message: "unable to parse date"
      }
    }
  }
}

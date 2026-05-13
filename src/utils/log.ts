import { Temporal } from "temporal-polyfill"

type LogLevel = "debug" | "info" | "warn" | "error"

type LogEvent = {
  level: LogLevel
  message: string
  context?: Record<string, unknown>
  timestamp: Temporal.PlainDateTime
  scope: string
}

export function createLogger(scope: string) {
  return function log(event: Omit<LogEvent, "scope" | "timestamp">) {
    const fullEvent: LogEvent = {
      ...event,
      scope,
      timestamp: Temporal.Now.plainDateTimeISO(),
    }

    console.log(fullEvent)
  }
}

type Brand<B> = { __brand: B }
export type Branded<T, B> = T & Brand<B>

type Success<T> = {
  success: true
  data: T
  error?: never
}

type Failure<E> = {
  success: false
  error: E
  data?: never
}

const ErrorCodes = {
  NOT_FOUND: "NOT_FOUND",
  INVALID_DAY_COLUMN: "INVALID_DAY_COLUMN",
  INVALID_WEEK_HEADER: "INVALID_WEEK_HEADER",
  PARSE_ERROR: "PARSE_ERROR",
} as const

type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes]

type Error = {
  code: ErrorCode
  message: string
}

export type Result<T, E = Error> =
  | Success<T>
  | Failure<E>

export type MaconomyRowIndex = Branded<number, "MaconomyRowIndex">

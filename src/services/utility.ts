import { AxiosResponse } from 'axios'
import { ZodSchema, ZodTypeDef } from 'zod'
import { statusMessages } from '@/services/constants'

export type ApiResponse<T> = {
  status: number
  data: T
  error: false
}

export type ApiError = {
  status: number
  message: string
  error: true
}

/**
 * Exception for use of 'any' type as we rely on optional chaining to handle a possible Axios response
 * but have fallbacks for other value types.
 */
export function formatApiError(error: any, message?: string): ApiError {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const axiosStatus: unknown = error?.response?.status
  const status = typeof axiosStatus === 'number' ? axiosStatus : 500

  return {
    status,
    // TODO: Depending on error display approach this can be sanitized differently to remove unsafe messages
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    message: message ?? statusMessages[status] ?? error?.message ?? 'Unknown error',
    error: true,
  }
}

export function formatApiResponse<T>(
  response: AxiosResponse<unknown>,
  schema: ZodSchema<T, ZodTypeDef, any>,
): ApiResponse<T> | ApiError {
  /** Validate data meets expected schema on ingress */
  const sanitized = schema.safeParse(response.data)
  if (!sanitized.success) {
    console.error('Invalid data', sanitized.error)
    return formatApiError(null, 'Invalid server response. Please contact support.')
  }

  return {
    status: response.status,
    data: sanitized.data,
    error: false,
  }
}

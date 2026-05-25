import axios from 'axios'

export interface CallApiArgs {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
  headers?: Record<string, string> | undefined
  query?: Record<string, string> | undefined
  body?: unknown
  successCodes?: number[]
}

export interface CallApiResult {
  content: { type: 'text'; text: string }[]
  isError?: boolean
}

export async function callApi(args: CallApiArgs): Promise<CallApiResult> {
  const headers: Record<string, string> = { ...(args.headers ?? {}) }

  // No auth — endpoints are public

  try {
    const res = await axios.request({
      method: args.method,
      url: args.url,
      headers,
      params: args.query,
      data: args.body,
      validateStatus: () => true,
      timeout: 30_000,
    })

    const success = (args.successCodes ?? [200, 201, 204]).includes(res.status)
    if (!success) {
      return {
        content: [
          {
            type: 'text',
            text: `HTTP ${res.status}: ${typeof res.data === 'string' ? res.data : JSON.stringify(res.data, null, 2)}`,
          },
        ],
        isError: true,
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: typeof res.data === 'string' ? res.data : JSON.stringify(res.data, null, 2),
        },
      ],
    }
  } catch (err) {
    return {
      content: [
        {
          type: 'text',
          text: `Network error: ${err instanceof Error ? err.message : String(err)}`,
        },
      ],
      isError: true,
    }
  }
}

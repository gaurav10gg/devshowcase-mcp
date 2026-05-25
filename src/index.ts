import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import * as dotenv from 'dotenv'
import { TOOLS, HANDLERS } from './tools.js'

dotenv.config()

const server = new Server(
  { name: "dev-showcase-mcp", version: '0.1.0' },
  { capabilities: { tools: {} } },
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}))

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const handler = HANDLERS[req.params.name as keyof typeof HANDLERS]
  if (!handler) {
    return {
      content: [{ type: 'text', text: `Unknown tool: ${req.params.name}` }],
      isError: true,
    }
  }
  try {
    return await handler((req.params.arguments ?? {}) as Record<string, unknown>)
  } catch (err: unknown) {
    return {
      content: [
        {
          type: 'text',
          text: `Tool ${req.params.name} threw: ${err instanceof Error ? err.message : String(err)}`,
        },
      ],
      isError: true,
    }
  }
})

await server.connect(new StdioServerTransport())
console.error("dev-showcase-mcp", 'started over stdio · 22 tools')

# Framework Trails — Trail Data Reference

Trail definitions for each supported framework. Each trail maps the framework's request/render pipeline to ~8 stops on the Coderegon Trail.

---

## Next.js — "The App Router Trail"

### Trail Overview
Follow a request from the browser through Next.js App Router's middleware, file-based routing, layout nesting, server/client component boundary, data fetching, and final response rendering.

### Stops

#### Stop 0: Independence, MO — The Entry Point
- **concept**: Project initialization
- **landmarkType**: town
- **code**:
  ```typescript
  // app/layout.tsx:1-18
  import type { Metadata } from 'next'
  import './globals.css'

  export const metadata: Metadata = {
    title: 'My App',
    description: 'Built with Next.js App Router',
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }
  ```
- **narration**: "Every Next.js journey starts here — the root layout. This file wraps your entire application. Notice the metadata export: Next.js reads this at build time to set your HTML head. The children prop is where every page in your app gets rendered. Think of this as the wagon that carries everything."

#### Stop 1: Middleware Pass
- **concept**: Request interception
- **landmarkType**: mountain
- **code**:
  ```typescript
  // middleware.ts:1-20
  import { NextResponse } from 'next/server'
  import type { NextRequest } from 'next/server'

  export function middleware(request: NextRequest) {
    const token = request.cookies.get('session')

    if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const response = NextResponse.next()
    response.headers.set('x-request-id', crypto.randomUUID())
    return response
  }

  export const config = {
    matcher: ['/dashboard/:path*', '/api/:path*'],
  }
  ```
- **narration**: "Before any page renders, the request passes through middleware. This runs on the Edge Runtime — fast and lightweight. Here it checks for a session cookie. No token? Redirected to login. The matcher config at the bottom tells Next.js which routes this middleware applies to. It's your first line of defense."

#### Stop 2: File Router Fork
- **concept**: File-system routing
- **landmarkType**: camp
- **code**:
  ```
  // File system IS the router:
  app/
  ├── page.tsx              → /
  ├── about/
  │   └── page.tsx          → /about
  ├── blog/
  │   ├── page.tsx          → /blog
  │   └── [slug]/
  │       └── page.tsx      → /blog/:slug
  ├── dashboard/
  │   ├── layout.tsx        → wraps all dashboard pages
  │   ├── page.tsx          → /dashboard
  │   └── settings/
  │       └── page.tsx      → /dashboard/settings
  └── api/
      └── users/
          └── route.ts      → /api/users
  ```
- **narration**: "Here's where Next.js gets clever — the file system IS the router. Every folder in the app directory becomes a URL segment. Drop a page dot tsx in a folder, and you've got a route. Square brackets mean dynamic segments — blog slash slug catches any blog post. No router configuration file needed. This is convention over configuration at its finest."

#### Stop 3: Layout Nesting Camp
- **concept**: Nested layouts
- **landmarkType**: camp
- **code**:
  ```typescript
  // app/dashboard/layout.tsx:1-22
  import { Sidebar } from '@/components/sidebar'
  import { getUser } from '@/lib/auth'
  import { redirect } from 'next/navigation'

  export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const user = await getUser()

    if (!user) {
      redirect('/login')
    }

    return (
      <div className="flex">
        <Sidebar user={user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    )
  }
  ```
- **narration**: "Layouts nest automatically. This dashboard layout wraps every page under slash dashboard. Notice it's an async function — it fetches the user on the server before rendering. If there's no user, it redirects. The sidebar renders once and persists across all dashboard pages. When you navigate between settings and the main dashboard, only the children swap. The layout stays put."

#### Stop 4: Server Component Ridge
- **concept**: Server Components
- **landmarkType**: mountain
- **code**:
  ```typescript
  // app/dashboard/page.tsx:1-24
  import { Suspense } from 'react'
  import { getStats } from '@/lib/data'
  import { StatsCard } from '@/components/stats-card'
  import { RecentActivity } from './recent-activity'

  // This is a Server Component by default (no 'use client')
  export default async function DashboardPage() {
    const stats = await getStats()

    return (
      <div>
        <h1>Dashboard</h1>

        <div className="grid grid-cols-3 gap-4">
          {stats.map(stat => (
            <StatsCard key={stat.id} {...stat} />
          ))}
        </div>

        <Suspense fallback={<div>Loading activity...</div>}>
          <RecentActivity />
        </Suspense>
      </div>
    )
  }
  ```
- **narration**: "Welcome to Server Component Ridge — the biggest mental shift in modern React. This page component is a server component by default. No 'use client' directive at the top. It can directly await data fetches — no useEffect, no loading state management. The Suspense boundary around RecentActivity lets that section stream in later. The server sends HTML progressively. Zero JavaScript shipped for the static parts."

#### Stop 5: Client Hydration Falls
- **concept**: Client components and hydration
- **landmarkType**: river
- **code**:
  ```typescript
  // app/dashboard/recent-activity.tsx:1-22
  'use client'

  import { useState, useEffect } from 'react'
  import { getRecentActivity } from '@/lib/api'

  export function RecentActivity() {
    const [activities, setActivities] = useState([])
    const [filter, setFilter] = useState('all')

    useEffect(() => {
      getRecentActivity(filter).then(setActivities)
    }, [filter])

    return (
      <div>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="commits">Commits</option>
          <option value="deploys">Deploys</option>
        </select>
        {activities.map(a => <ActivityRow key={a.id} {...a} />)}
      </div>
    )
  }
  ```
- **narration**: "Now we cross the client-server river. See 'use client' at the top? That's the boundary marker. This component needs interactivity — a dropdown filter that re-fetches data. It uses useState and useEffect, which only work in the browser. When the server renders this page, it sends the initial HTML, then ships the JavaScript for this component to 'hydrate' — attach event handlers to the existing DOM. The server components above? They never hydrate. No JS sent."

#### Stop 6: Data Fetching Gorge
- **concept**: Data fetching patterns
- **landmarkType**: forest
- **code**:
  ```typescript
  // lib/data.ts:1-24
  import { cache } from 'react'
  import { db } from './db'

  // React cache() deduplicates calls in a single render
  export const getUser = cache(async () => {
    const session = await getSession()
    if (!session) return null
    return db.user.findUnique({ where: { id: session.userId } })
  })

  export const getStats = cache(async () => {
    const user = await getUser()
    if (!user) throw new Error('Unauthorized')

    return db.stat.findMany({
      where: { orgId: user.orgId },
      orderBy: { date: 'desc' },
      take: 6,
    })
  })

  // Next.js extends fetch with caching options
  export async function getExternalData() {
    const res = await fetch('https://api.example.com/data', {
      next: { revalidate: 3600 },  // Cache for 1 hour
    })
    return res.json()
  }
  ```
- **narration**: "Data Fetching Gorge — where many developers get lost. Next.js gives you three patterns here. First, React's cache function deduplicates — if getUser is called by multiple server components in one render, the database is only hit once. Second, direct database access in server components — no API layer needed. Third, Next.js extends the fetch API with caching: that revalidate option means this data refreshes every hour. The gorge is deep, but these patterns keep you from falling."

#### Stop 7: Response Frontier
- **concept**: Response rendering and streaming
- **landmarkType**: town
- **code**:
  ```typescript
  // What Next.js generates (conceptual):
  // 1. Server renders layout + page as HTML stream
  // 2. Suspense boundaries become placeholder HTML
  // 3. As async components resolve, HTML chunks stream in
  // 4. Client components get their JS bundles
  // 5. Hydration attaches interactivity

  // The response looks like:
  // <html>
  //   <body>
  //     <div class="flex">         ← layout (static HTML)
  //       <aside>Sidebar</aside>   ← server component (static)
  //       <main>
  //         <h1>Dashboard</h1>     ← server component (static)
  //         <div>Stats...</div>    ← server component (static)
  //         <!--$?-->              ← Suspense placeholder
  //         <template>Loading...</template>
  //         <!--/$-->
  //       </main>
  //     </div>
  //     <script>/* client component JS */</script>
  //   </body>
  // </html>
  ```
- **narration**: "You made it to Response Frontier! Here's what Next.js actually sends to the browser. The server streams HTML progressively — layouts and server components arrive as static HTML immediately. Suspense boundaries ship with a loading placeholder, then get replaced when the async data resolves. Only client components get JavaScript bundles. The result: fast initial page load, progressive enhancement, and minimal client-side JavaScript. Your wagon has arrived."

### Events

#### Event 1 (after Stop 1): Weather — Middleware Storm
- **type**: weather
- **title**: "Middleware Storm!"
- **text**: "A storm of requests is hitting your server. Your middleware is running on every single request, even for static assets like images and CSS files."
- **choices**:
  - "Add a matcher config to limit which routes use middleware" (correct) — "The config.matcher property lets you specify exactly which routes the middleware runs on. Without it, middleware fires on every request — including static files. The matcher uses path patterns to be selective."
  - "Move the middleware logic into each page component" (incorrect) — "That would mean duplicating protection logic across every page. Middleware exists precisely to centralize cross-cutting concerns like auth checks."
  - "Cache the middleware results to avoid re-running" (incorrect) — "Middleware runs per-request by design — it needs to check the current request's cookies and headers. Caching auth checks would be a security risk."
- **concept**: "File Router"
- **difficulty**: easy

#### Event 2 (after Stop 3): Encounter — Convention Wisdom
- **type**: encounter
- **title**: "A Seasoned Developer Appears"
- **text**: "A fellow traveler shows you their project structure. 'In Next.js App Router, if I put a loading.tsx file in any folder, it automatically becomes the Suspense fallback for that route segment. No wiring needed.' What principle is this?"
- **choices**:
  - "Convention over configuration" (correct) — "Exactly. Next.js uses file naming conventions — loading.tsx, error.tsx, not-found.tsx — to automatically wire up React features like Suspense and Error Boundaries. You just follow the naming convention."
  - "Dependency injection" (incorrect) — "Dependency injection is about providing dependencies from the outside rather than creating them internally. This is about file naming conventions that trigger automatic behavior."
  - "Inversion of control" (incorrect) — "While related, inversion of control is more about frameworks calling your code rather than you calling the framework. This specific pattern is about naming conventions providing automatic behavior."
- **concept**: "Layouts"
- **difficulty**: easy

#### Event 3 (after Stop 4): River — The Client-Server Boundary
- **type**: river
- **title**: "The Client-Server River"
- **text**: "You've reached the biggest river on the trail — the boundary between server and client components. Your dashboard needs an interactive chart that also fetches data. How do you cross?"
- **choices**:
  - "Make the whole page a client component with 'use client'" (incorrect) — "This works but you lose all the benefits of server components — the entire page's JavaScript ships to the client, data fetching requires API routes or useEffect, and you can't directly access the database."
  - "Keep the page as a server component, fetch data there, pass it as props to a client chart component" (correct) — "This is the recommended pattern. Fetch data on the server where you have direct DB access, then pass the serialized data down to a 'use client' chart component that handles interactivity. Best of both worlds."
  - "Use getServerSideProps to fetch data at request time" (incorrect) — "getServerSideProps is a Pages Router pattern. In App Router, you fetch data directly in server components using async/await. No special function wrapper needed."
- **concept**: "Server Components"
- **difficulty**: medium

#### Event 4 (after Stop 5): Misfortune — Hydration Mismatch
- **type**: misfortune
- **title**: "Hydration Mismatch!"
- **text**: "Disaster! Your client component renders a timestamp using new Date(). The server renders one time, the client hydrates with a different time. The console is screaming about hydration mismatches."
- **choices**:
  - "Use useEffect to set the timestamp only on the client after hydration" (correct) — "Correct. For values that differ between server and client — like timestamps, random numbers, or browser-specific APIs — use useEffect to set them after hydration. The initial render must match between server and client."
  - "Add suppressHydrationWarning to the element" (incorrect) — "suppressHydrationWarning silences the warning but doesn't fix the underlying issue. The DOM will still flash when it corrects itself. It's a band-aid, not a solution."
  - "Convert the entire page to a server component" (incorrect) — "You still need the interactive features in this component. And server components can't use useState or event handlers. The real fix is to handle the mismatch properly."
- **concept**: "Server Components"
- **difficulty**: medium

#### Event 5 (after Stop 6): Weather — Caching Confusion
- **type**: weather
- **title**: "The Fog of Caching"
- **text**: "Dense fog rolls in. Your page shows stale data — a user updated their profile but the dashboard still shows the old name. Where's the caching issue?"
- **choices**:
  - "The fetch call is using the default cache, which caches indefinitely in Next.js" (correct) — "In Next.js App Router, fetch requests are cached by default with 'force-cache'. You need to opt into revalidation with next: { revalidate: N } or use cache: 'no-store' for data that must be fresh every request."
  - "React's cache() function is holding onto old data" (incorrect) — "React.cache() only deduplicates within a single render pass — it doesn't persist between requests. It's not the source of stale data across page loads."
  - "The browser is caching the HTML response" (incorrect) — "While browser caching can cause staleness, Next.js server-side caching is the more likely culprit here. The server is returning cached data before the browser even gets involved."
- **concept**: "Data Fetching"
- **difficulty**: hard

#### Event 6 (after Stop 6): Fortune — Clean Code Spring
- **type**: fortune
- **title**: "Spring of Clean Patterns"
- **text**: "You've been on a roll! Your understanding of the data layer is solid. You found a spring of clean code patterns — your health is restored."
- **choices**: [] (no choices — auto-reward)
- **concept**: "Data Fetching"
- **difficulty**: easy

### Death Messages
- "Here lies your app. It died of unhandled promise rejections."
- "Drowned in the hydration mismatch river."
- "Lost in the file router — too many nested layouts."
- "Killed by a rogue 'use client' directive in a server component."
- "Died of caching confusion. The data was stale for weeks."
- "Your session expired of old age. No middleware to refresh it."
- "Starved waiting for the API response. No Suspense boundary configured."
- "The N+1 query problem consumed all your server resources."

---

## Rails — "The Convention Trail" (Phase 2)

*Trail data to be added in Phase 2.*

### Stops (outline)
0. Rack Junction — `config.ru`, Rack middleware stack
1. Router Pass — `config/routes.rb`, RESTful resource routing
2. Controller Canyon — `app/controllers/`, action methods, strong params
3. Model Meadows — `app/models/`, ActiveRecord associations, validations
4. View Valley — `app/views/`, ERB templates, partials
5. ERB Rendering Post — template rendering, helpers, layouts
6. Response River — response headers, status codes, formats
7. Response Frontier — complete request cycle visualization

### Party Members
- ActiveRecord
- Convention Routing
- ERB Templates
- Migrations

---

## Django — "The WSGI Wagon Trail" (Phase 2)

*Trail data to be added in Phase 2.*

### Stops (outline)
0. WSGI Outpost — `wsgi.py`, application entry point
1. Middleware Mountains — `settings.py` MIDDLEWARE list
2. URLconf Crossroads — `urls.py`, path patterns, includes
3. View Vista — function-based and class-based views
4. ORM Oasis — models, QuerySets, managers
5. Template Territory — template inheritance, tags, filters
6. Context Canyon — context processors, template context
7. Response Frontier — HttpResponse, JsonResponse, streaming

### Party Members
- ORM QuerySets
- URL Patterns
- Template Inheritance
- Admin Panel

---

## Express.js — "The Middleware Prairie" (Phase 2)

*Trail data to be added in Phase 2.*

### Stops (outline)
0. Server Startup Camp — `app.js`/`index.js`, express() initialization
1. Body Parser Bridge — body-parser, json/urlencoded middleware
2. CORS Crossing — cors middleware configuration
3. Auth Checkpoint — passport/jwt middleware, auth strategies
4. Route Matching Mesa — express.Router(), route parameters
5. Controller Gulch — request handlers, req/res patterns
6. Service Springs — business logic layer, async patterns
7. JSON Response Frontier — res.json(), status codes, error handling

### Party Members
- Middleware Chain
- Route Handlers
- Error Handling
- Async Patterns

---

## React/Vite — "The Component Canyon" (Phase 2)

*Trail data to be added in Phase 2.*

### Stops (outline)
0. Index.html Outpost — the single HTML file, Vite entry
1. Main.jsx Junction — createRoot, StrictMode, provider wrapping
2. App Component Fort — App.tsx, top-level composition
3. Router Rapids — react-router, route definitions, outlet
4. Page Component Pass — page-level components, data loading
5. Hooks Hollow — useState, useEffect, custom hooks
6. State Update Gorge — state management, re-render triggers
7. Re-render Frontier — virtual DOM diff, commit phase

### Party Members
- Component Tree
- Hooks
- State Management
- Effect Lifecycle

---

## Laravel — "The Artisan Trail" (Phase 2)

*Trail data to be added in Phase 2.*

### Stops (outline)
0. Bootstrap Base — `public/index.php`, kernel bootstrap
1. Service Provider Pass — `app/Providers/`, service container bindings
2. Middleware Mountains — HTTP kernel middleware stack
3. Router Ravine — `routes/web.php`, route groups, named routes
4. Controller Canyon — resource controllers, form requests
5. Eloquent Oasis — Eloquent models, relationships, scopes
6. Blade Valley — Blade templates, components, slots
7. Response Frontier — response macros, JSON resources

### Party Members
- Eloquent ORM
- Blade Templates
- Service Container
- Artisan CLI

---

## OpenClaw — "The Gateway Trail"

### Trail Overview
Follow a message from a user on WhatsApp (or any of 13+ messaging platforms) through OpenClaw's gateway control plane: channel plugin normalization, route resolution and agent binding, session persistence, JSON-RPC dispatch to the AI agent, tool execution on the host, and response delivery back through the channel. OpenClaw is a local-first, multi-channel AI assistant platform — the gateway is the control plane, and the product is the assistant.

**Tech Stack**: TypeScript (primary), Swift (macOS/iOS), Kotlin (Android). Node.js runtime, WebSocket control plane, pnpm monorepo, SQLite for sessions and vector memory.

### Stops

#### Stop 0: Channel Outpost — Message Arrives
- **concept**: Channel plugins
- **landmarkType**: town
- **code**:
  ```typescript
  // extensions/whatsapp/src/plugin.ts (conceptual)
  import { ChannelPlugin } from '@openclaw/types'

  export const whatsappPlugin: ChannelPlugin = {
    config: {
      listAccountIds(cfg) {
        return cfg.whatsapp?.accounts?.map(a => a.id) ?? []
      },
      async isConfigured(account) {
        return !!account.phoneNumber
      },
      resolveAccount(cfg, id) {
        return cfg.whatsapp.accounts.find(a => a.id === id)
      },
    },
    gateway: {
      async startAccount({ account, gateway }) {
        // Connect to WhatsApp Web via Baileys
        const sock = makeWASocket({ auth: account.auth })
        sock.ev.on('messages.upsert', async ({ messages }) => {
          for (const msg of messages) {
            await gateway.handleInbound({
              channel: 'whatsapp',
              peer: msg.key.remoteJid,
              text: msg.message?.conversation,
              accountId: account.id,
            })
          }
        })
      },
      async stopAccount({ account }) {
        // Graceful disconnect
      },
    },
  }
  ```
- **narration**: "Every journey starts at a channel outpost. OpenClaw connects to thirteen different messaging platforms — WhatsApp, Telegram, Slack, Discord, Signal, iMessage, and more. Each platform has a channel plugin that follows the same interface. Here's the WhatsApp plugin using Baileys to listen for messages. When a message arrives, it normalizes it into a common format — peer, channel, text — and hands it to the gateway. Every channel speaks its own protocol, but the gateway only speaks one."

#### Stop 1: Normalization Pass — Common Message Format
- **concept**: Message normalization
- **landmarkType**: camp
- **code**:
  ```typescript
  // src/channels/plugins/types.ts (simplified)
  export interface ChannelPlugin {
    config: {
      listAccountIds(cfg: Config): string[]
      isConfigured(account: AccountConfig): Promise<boolean>
      resolveAccount(cfg: Config, id: string): AccountConfig
    }
    gateway?: {
      startAccount(opts: StartAccountOpts): Promise<void>
      stopAccount(opts: StopAccountOpts): Promise<void>
    }
  }

  // The normalized inbound message shape:
  interface InboundMessage {
    channel: string        // "whatsapp" | "telegram" | "slack" | ...
    accountId: string      // which bot account received it
    peer: RoutePeer        // who sent it (phone, userId, etc.)
    text: string           // message content
    threadId?: string      // conversation thread
    attachments?: Media[]  // images, files, voice
    guildId?: string       // Discord server / Slack workspace
    teamId?: string        // Teams team
  }
  ```
- **narration**: "At the Normalization Pass, chaos becomes order. Every messaging platform has its own format — WhatsApp sends phone numbers and JIDs, Discord sends guild IDs and user snowflakes, Slack sends workspace and channel tokens. The ChannelPlugin interface forces them all into one shape. Peer, channel, text, optional thread and attachments. The gateway never needs to know whether you messaged from WhatsApp or Telegram. It just sees a normalized inbound message."

#### Stop 2: Route Resolution Fork — Finding the Right Agent
- **concept**: Route resolution
- **landmarkType**: mountain
- **code**:
  ```typescript
  // src/routing/resolve-route.ts (simplified)
  export function resolveAgentRoute({
    cfg, channel, accountId, peer, guildId, teamId,
  }: ResolveRouteInput): ResolvedRoute {

    for (const agent of cfg.agents.list) {
      const routing = agent.routing

      // 1. Exact peer match (highest priority)
      const peerMatch = routing.peer?.find(
        b => b.peer === peer.id && b.channel === channel
      )
      if (peerMatch) return { agentId: agent.id, matchedBy: 'peer' }

      // 2. Guild/server match
      const guildMatch = routing.guild?.find(
        b => b.guildId === guildId && b.channel === channel
      )
      if (guildMatch) return { agentId: agent.id, matchedBy: 'guild' }

      // 3. Account-level match
      const accountMatch = routing.account?.find(
        b => b.accountId === accountId && b.channel === channel
      )
      if (accountMatch) return { agentId: agent.id, matchedBy: 'account' }
    }

    // 4. Default agent (fallback)
    return { agentId: cfg.agents.default, matchedBy: 'default' }
  }
  ```
- **narration**: "Here's where the trail forks — route resolution. One OpenClaw instance can run multiple AI agents, each with their own personality and tools. The route resolver figures out which agent should handle this message. It checks in priority order: first, is this specific person bound to an agent? Then, is this Discord server or Slack workspace assigned? Then the account level. And if nothing matches, the default agent catches it. This is how one gateway serves different agents to different people."

#### Stop 3: Session Persistence Camp — Loading Conversation State
- **concept**: Session persistence
- **landmarkType**: camp
- **code**:
  ```typescript
  // src/sessions/session-utils.ts (simplified)
  import { readFile, writeFile, mkdir } from 'fs/promises'

  const SESSIONS_DIR = '~/.openclaw/sessions'

  export async function loadSessionEntry(
    agentId: string,
    sessionKey: string,
  ): Promise<SessionEntry> {
    const path = `${SESSIONS_DIR}/${agentId}/${sessionKey}.json`

    try {
      const raw = await readFile(path, 'utf-8')
      return JSON.parse(raw)
    } catch {
      // New session — create with defaults
      return {
        sessionKey,
        agentId,
        transcript: [],
        metadata: {
          model: 'anthropic/claude-opus-4-6',
          thinkingLevel: 'medium',
          tokensUsed: 0,
          createdAt: Date.now(),
        },
      }
    }
  }

  export async function saveSession(
    entry: SessionEntry,
  ): Promise<void> {
    const dir = `${SESSIONS_DIR}/${entry.agentId}`
    await mkdir(dir, { recursive: true })
    await writeFile(
      `${dir}/${entry.sessionKey}.json`,
      JSON.stringify(entry, null, 2),
    )
  }
  ```
- **narration**: "Welcome to Session Persistence Camp. OpenClaw doesn't use a traditional database for conversations — sessions are just JSON files on disk. Each agent-plus-peer combination gets its own file under dot openclaw slash sessions. The session holds the full transcript, the model configuration, thinking level, and token budget. If the file doesn't exist, a fresh session starts with sensible defaults. This file-system approach means zero database dependencies, easy backup, and you can literally read your conversation history in a text editor."

#### Stop 4: Gateway Control Ridge — The WebSocket Command Center
- **concept**: Gateway control plane
- **landmarkType**: mountain
- **code**:
  ```typescript
  // src/gateway/server-chat.ts (simplified)
  export function createChatRunRegistry(gateway: GatewayServer) {

    async function handleChatSend(
      sessionEntry: SessionEntry,
      message: InboundMessage,
    ) {
      // Append user message to transcript
      sessionEntry.transcript.push({
        role: 'user',
        content: message.text,
        timestamp: Date.now(),
      })

      // Dispatch to agent via RPC
      const agentRpc = gateway.acp.getClient(sessionEntry.agentId)

      const stream = await agentRpc.call('chat.send', {
        sessionId: sessionEntry.sessionKey,
        messages: sessionEntry.transcript,
        tools: sessionEntry.metadata.enabledTools,
        model: sessionEntry.metadata.model,
      })

      // Stream responses back
      for await (const chunk of stream) {
        if (chunk.type === 'text') {
          gateway.broadcast('chat.stream', {
            sessionKey: sessionEntry.sessionKey,
            text: chunk.text,
          })
        } else if (chunk.type === 'tool_use') {
          const result = await executeTool(chunk.tool, chunk.input)
          agentRpc.sendToolResult(chunk.id, result)
        }
      }

      // Save updated session
      await saveSession(sessionEntry)
    }

    return { handleChatSend }
  }
  ```
- **narration**: "You've climbed to Gateway Control Ridge — the beating heart of OpenClaw. The gateway server sits at port eighteen seven eight nine, accepting WebSocket connections from channels, the CLI, and native apps. When a message arrives, it appends it to the session transcript, then dispatches to the agent over RPC. Notice the streaming loop — it handles text chunks and tool calls differently. Text streams to the UI in real time. Tool calls get executed right here on the gateway, and results feed back to the agent. The gateway is the control plane. Everything flows through here."

#### Stop 5: Agent RPC Rapids — Talking to the AI
- **concept**: Agent RPC protocol
- **landmarkType**: river
- **code**:
  ```typescript
  // src/acp/client.ts (simplified)
  export function createAcpClient(agentId: string, wsUrl: string) {
    const ws = new WebSocket(wsUrl)

    async function* call(
      method: string,
      params: ChatSendParams,
    ): AsyncGenerator<AgentChunk> {
      const requestId = crypto.randomUUID()

      ws.send(JSON.stringify({
        jsonrpc: '2.0',
        id: requestId,
        method,
        params,
      }))

      // Yield chunks as they stream back
      while (true) {
        const msg = await nextMessage(ws, requestId)
        if (msg.type === 'done') break
        yield msg
      }
    }

    function sendToolResult(toolCallId: string, result: ToolResult) {
      ws.send(JSON.stringify({
        jsonrpc: '2.0',
        method: 'tool.result',
        params: { toolCallId, result },
      }))
    }

    return { call, sendToolResult }
  }
  ```
- **narration**: "Now we cross the RPC Rapids — the boundary between the gateway and the AI agent. OpenClaw separates these into different processes communicating over JSON-RPC. The gateway sends a chat dot send request with the full transcript and available tools. The agent streams back chunks — text blocks, thinking blocks, and tool-use requests. When the agent wants to run a tool, the gateway executes it locally and sends the result back. This separation is the key security insight: the agent decides what to do, but the gateway controls what actually happens on your machine."

#### Stop 6: Tool Execution Gorge — Running Commands on the Host
- **concept**: Tool execution
- **landmarkType**: forest
- **code**:
  ```typescript
  // src/agents/bash-tools.exec.ts (simplified)
  export async function executeBashTool(
    input: { command: string },
    context: ToolContext,
  ): Promise<ToolResult> {
    const { command } = input
    const { sessionEntry, securityPolicy } = context

    // Security check: does this session allow bash execution?
    if (!securityPolicy.allowBash) {
      return { error: 'Bash execution not permitted for this session' }
    }

    // Execute in PTY for proper terminal emulation
    const pty = spawn('bash', ['-c', command], {
      cwd: sessionEntry.metadata.workingDir,
      env: { ...process.env, ...sessionEntry.metadata.env },
      timeout: 120_000,  // 2 minute timeout
    })

    let stdout = ''
    let stderr = ''

    pty.onData(data => { stdout += data })
    pty.onError(data => { stderr += data })

    const exitCode = await pty.wait()

    return {
      stdout: stdout.slice(0, 100_000),  // Truncate large outputs
      stderr,
      exitCode,
    }
  }

  // Other tools follow the same pattern:
  // browser.snapshot → CDP screenshot
  // canvas.eval     → Push HTML to A2UI
  // nodes.run       → Device RPC (camera, screen, location)
  ```
- **narration**: "Deep in Tool Execution Gorge, the agent's intentions become real actions. When the agent asks to run a shell command, it lands here. Notice the security check first — each session has a policy controlling what tools are allowed. Then it spawns a real PTY, a proper terminal emulator, with the session's working directory and environment. There's a two-minute timeout to prevent runaway processes. Output is truncated at a hundred thousand characters. Bash is just one tool — the same pattern handles browser control via Chrome DevTools Protocol, canvas UI rendering, and device actions on mobile nodes."

#### Stop 7: Response Delivery Frontier — Back Through the Channel
- **concept**: Response delivery
- **landmarkType**: town
- **code**:
  ```typescript
  // src/gateway/server-channels.ts (simplified)
  export function createChannelManager(gateway: GatewayServer) {

    async function deliverResponse(
      sessionEntry: SessionEntry,
      response: AgentResponse,
    ) {
      const { channel, peer, accountId } = sessionEntry.routing

      // Get the channel plugin
      const plugin = gateway.channels.get(channel)
      if (!plugin) throw new Error(`Channel ${channel} not loaded`)

      // Format for the target platform
      const formatted = formatForChannel(channel, response.text, {
        maxLength: getChannelLimit(channel),
        // WhatsApp: 4096, Discord: 2000, Slack: 40000, etc.
      })

      // Send through the channel — may split into multiple messages
      for (const chunk of formatted) {
        await plugin.send({
          accountId,
          peer,
          text: chunk,
          threadId: sessionEntry.threadId,
        })
      }

      // Append assistant message to transcript
      sessionEntry.transcript.push({
        role: 'assistant',
        content: response.text,
        timestamp: Date.now(),
        tokensUsed: response.usage?.totalTokens,
      })

      // Persist session
      await saveSession(sessionEntry)

      // Broadcast to connected UIs (WebChat, macOS app)
      gateway.broadcast('chat.response', {
        sessionKey: sessionEntry.sessionKey,
        text: response.text,
      })
    }

    return { deliverResponse }
  }
  ```
- **narration**: "You made it to Response Delivery Frontier! The agent has spoken, and now the response travels back through the same channel it arrived on. The channel manager looks up the right plugin, formats the text for the platform's limits — WhatsApp caps at four thousand characters, Discord at two thousand, Slack gets a generous forty thousand. Long responses get chunked automatically. Then the response is appended to the transcript, the session is saved to disk, and a broadcast goes out to any connected UIs like WebChat or the macOS app. The loop is complete: message in, intelligence applied, response out. Your wagon has arrived at the frontier."

### Events

#### Event 1 (after Stop 1): Weather — The Protocol Storm
- **type**: weather
- **title**: "Protocol Storm!"
- **text**: "A storm of messages is hitting your gateway from every direction — WhatsApp sends phone numbers, Discord sends snowflake IDs, Slack sends workspace tokens. Your code is full of platform-specific conditionals. How do you weather this storm?"
- **choices**:
  - "Define a common interface that all channel plugins must implement" (correct) — "Exactly. OpenClaw's ChannelPlugin interface forces every platform into the same shape: listAccountIds, isConfigured, resolveAccount, and gateway start/stop methods. New channels can be added without touching gateway code. The interface IS the weather protection."
  - "Write a giant switch statement in the gateway to handle each platform" (incorrect) — "That would make the gateway a tangled mess of platform-specific logic. Every new channel means modifying core code. The plugin architecture exists precisely to avoid this."
  - "Only support one messaging platform to keep things simple" (incorrect) — "Multi-channel support is core to OpenClaw's value. The whole point is that your assistant is reachable everywhere. The trick is making multi-channel clean — through the plugin interface."
- **concept**: "Channel Plugins"
- **difficulty**: easy

#### Event 2 (after Stop 2): Encounter — The Multi-Agent Traveler
- **type**: encounter
- **title**: "A Fellow Operator Appears"
- **text**: "A seasoned OpenClaw operator shares their setup: 'I run three agents — a personal assistant on WhatsApp, a work agent in my company's Slack, and a social media bot on Discord. All from one gateway.' How does the gateway know which agent handles which message?"
- **choices**:
  - "Route bindings in the config map channels, peers, and guilds to specific agents" (correct) — "That's the routing system. Config bindings map at multiple levels — a specific phone number to an agent, a Discord server to an agent, or a whole Slack workspace to an agent. Priority order: peer, guild, team, account, channel, then default."
  - "Each agent runs its own separate gateway server on a different port" (incorrect) — "One gateway, multiple agents. That's the architecture. Running separate gateways would mean separate configs, separate channel connections, and no shared infrastructure. The routing layer solves this elegantly."
  - "The user specifies which agent to use in every message" (incorrect) — "That would be terrible UX. The routing is automatic and invisible to the user. You just message your assistant on WhatsApp — the gateway figures out which agent should respond based on the config bindings."
- **concept**: "Route Resolution"
- **difficulty**: easy

#### Event 3 (after Stop 3): River — The Session State River
- **type**: river
- **title**: "The Session State River"
- **text**: "You've reached the Session River — the boundary between stateless request handling and persistent conversation memory. Your assistant needs to remember a conversation from last week across a gateway restart. How do you cross?"
- **choices**:
  - "Store sessions as JSON files on disk, loaded on demand per agent-plus-peer key" (correct) — "That's OpenClaw's approach. Each session is a JSON file at a predictable path — dot openclaw slash sessions slash agent ID slash session key. No database needed. Sessions load on demand when a message arrives, and save after each response. The file system IS the persistence layer."
  - "Keep all sessions in memory with a Redis cache for speed" (incorrect) — "In-memory state is lost on restart. Redis adds an external dependency. OpenClaw is local-first — JSON files mean zero dependencies, easy backup, and you can edit sessions with a text editor if needed."
  - "Store conversation history in the AI model's context and let it remember" (incorrect) — "LLM context windows are limited and expensive. The session file holds the full transcript, which gets pruned to fit the model's context window on each call. The persistence layer is separate from the inference layer — that's the key insight."
- **concept**: "Session Persistence"
- **difficulty**: medium

#### Event 4 (after Stop 5): Misfortune — Runaway Tool Execution!
- **type**: misfortune
- **title**: "Runaway Process!"
- **text**: "Disaster strikes! The AI agent asked to run a shell command, but the command is an infinite loop consuming 100% CPU. Your gateway is grinding to a halt. How did this slip through?"
- **choices**:
  - "Tool execution needs timeouts and the session security policy should gate which commands are allowed" (correct) — "OpenClaw enforces both. Bash tools have a two-minute timeout by default, and each session's security policy controls whether bash is even allowed. The gateway is the security boundary — the agent suggests actions, but the gateway decides what actually runs."
  - "The agent should be smarter and never request dangerous commands" (incorrect) — "Never rely on the AI to be the security boundary. Models can be jailbroken or simply make mistakes. Defense in depth means the gateway enforces limits regardless of what the agent requests."
  - "Run all tools in the agent's process so only the agent crashes" (incorrect) — "Tools run on the gateway intentionally — they need access to the local machine (file system, browser, devices). The agent is a remote process that might run in the cloud. The separation is a feature, not a bug."
- **concept**: "Gateway Control Plane"
- **difficulty**: medium

#### Event 5 (after Stop 5): River — The Agent-Gateway Boundary
- **type**: river
- **title**: "The RPC River"
- **text**: "You've reached the deepest river on the trail — the boundary between the gateway control plane and the AI agent runtime. The agent needs to execute a browser screenshot, but it runs in a different process. How does this work?"
- **choices**:
  - "JSON-RPC over WebSocket: agent sends tool requests, gateway executes them, sends results back" (correct) — "The agent and gateway communicate via JSON-RPC. The agent streams a tool_use block, the gateway intercepts it, runs the tool locally, and sends the result back. This decoupling means the agent could run on a different machine entirely — the gateway always controls what happens on the host."
  - "The agent directly imports and calls the browser module" (incorrect) — "The agent is a separate process — it can't directly call gateway code. The RPC boundary exists specifically so the agent doesn't have direct access to the host machine. Security through architecture."
  - "The agent writes the command to a shared file that the gateway watches" (incorrect) — "File watching would be slow, unreliable, and hard to correlate requests with responses. WebSocket RPC gives real-time bidirectional streaming with proper request-response correlation."
- **concept**: "Gateway Control Plane"
- **difficulty**: hard

#### Event 6 (after Stop 6): Fortune — Clean Architecture Spring
- **type**: fortune
- **title**: "Spring of Clean Architecture"
- **text**: "You've been navigating the gateway beautifully! Your understanding of the control plane architecture is solid. A group of friendly contributors join your camp and share their plugin templates."
- **choices**: []
- **concept**: "Channel Plugins"
- **difficulty**: easy

#### Event 7 (after Stop 6): Weather — The Chunking Fog
- **type**: weather
- **title**: "Message Chunking Fog"
- **text**: "Dense fog rolls in. Your assistant wrote a beautiful three-thousand-word response, but WhatsApp only allows four thousand ninety six characters per message. The user sees a truncated response. What went wrong?"
- **choices**:
  - "The response formatter should chunk long messages based on each channel's character limit" (correct) — "Each channel has different limits — WhatsApp at four thousand ninety six, Discord at two thousand, Slack at forty thousand. The delivery layer must split long responses into properly-sized chunks, breaking at sentence or paragraph boundaries."
  - "Tell the AI to always write short responses" (incorrect) — "You can't reliably enforce output length on LLMs, and sometimes long detailed responses are exactly what the user needs. The delivery layer should handle formatting, not the model."
  - "Switch to a channel with no message limits" (incorrect) — "The whole point of multi-channel support is meeting users where they are. Your assistant should work correctly on every channel, handling each platform's constraints gracefully."
- **concept**: "Channel Plugins"
- **difficulty**: easy

### Death Messages
- "Here lies your gateway. It died of unhandled WebSocket disconnections."
- "Lost in the route resolver — no default agent configured."
- "Drowned in the RPC River. The agent sent a tool call but nobody was listening."
- "Died of session bloat. The transcript grew to ten million tokens and nobody pruned it."
- "Killed by a runaway bash command. No timeout configured."
- "Your channel plugin threw an unhandled exception. Thirteen platforms went silent."
- "Starved waiting for the API response. Anthropic rate limits consumed all resources."
- "The N+1 message problem consumed all your WebSocket connections."
- "Died of dependency conflicts. pnpm install will not save you now."
- "Your sessions expired of old age. The JSON files outlived the server."
- "Buried under an avalanche of Discord snowflake IDs. Should have normalized the peer format."
- "Lost in the config — routing bindings pointed to an agent that doesn't exist."

### Party Members
- Gateway Control Plane
- Channel Plugins
- Route Resolution
- Session Persistence

# ShipLink Frontend UI – Copilot Instructions

## Project Snapshot

- Maritime B2B platform supporting vessel chartering, cargo negotiations, countdown-driven workflows, and documentation.
- Runs on Node.js 22.x with Next.js 15.5.4 (App Router + legacy routes) and React 19.2.0.
- Uses Yarn exclusively; automated formatting via Prettier and linting via ESLint (Airbnb config).

## Tech Stack Highlights

- **Styling**: Tailwind CSS with custom theme and breakpoint `3md: 1024px`.
- **Forms**: React Hook Form 7 with Yup validation.
- **State**: Redux Toolkit + Redux Persist; selectors live in `store/selectors/`.
- **HTTP**: Axios in the `services/` layer; adapters transform data between API handlers and services.
- **Realtime & Maps**: SignalR for notifications and React Leaflet for vessel positioning.

## Architecture & Directories

- `components/`
  - **modules/** – Complex domain flows; orchestrate state, API calls, and role-based rendering.
  - **units/** – Reusable medium-complexity UI; require `PropTypes` (except `children`) and optional `defaultProps`.
  - **elements/** – Pure presentational building blocks with no business logic.
- `adapters/` – `${domain}${Direction}Adapter` for request/response shaping; prefer shared adapters from `@/adapters/common`.
- `services/` – Domain-specific business logic; never call APIs directly from components.
- `store/` – Redux setup with slices and memoized selectors (use `useSelector` + exported selectors).
- `utils/` – Pure, framework-agnostic helpers grouped by concern.
- `lib/` – Application-level constants, configs, and core helpers (e.g., `lib/constants`, `lib/schemas.js`).
- `pages/api/` – API handlers that validate via adapters before delegating to services.

## Implementation Rules

- **Code Style**
  - Maintain `import/order`: built-ins → external (incl. `@/*`) → internal groups (`hooks`, `services`, etc.) → relative paths. Separate groups with blank lines.
  - Prettier handles formatting (print width 120, single quotes, trailing commas). No manual inline styling tweaks.
  - Keep logic out of JSX where possible; avoid nested ternaries (>2) and magic strings/numbers—extract to constants.
  - Optional chaining for deep access; prefer memoized helpers over repeated calculations.
- **Forms**
  - Define Yup schemas in `lib/schemas.js` as functions (e.g., `loginSchema()`).
  - Initialize forms via `useHookFormParams({ state, schema, mode })` and access context with `useHookForm`.
  - Keep validation logic inside schemas; components focus on rendering and submission handling.
- **Styling**
  - Use Tailwind utility classes; for conditional classes use `classnames`/`clsx` instead of template literals.
  - Favor theme tokens from `tailwind.config.js`; add global CSS only when unavoidable.
- **Services & API**
  - Flow: API Handler → Request Adapter → Service → optional Response Adapter → Handler response.
  - Services return raw business data; adapters handle null guards (`arrayAdapter`, `objectAdapter`, etc.).
  - Keep maritime calculations (laytime, demurrage, freight, bunker) accurate per domain standards.
- **Dropdowns**
  - Prefer `FormDropdown` (React Hook Form `Controller`) wrapping `SimpleDropdown` for form fields; supply options via `convertDataToOptions`.
  - `SimpleDropdown` uses `react-select`; set `asyncCall` for remote data and pass `loadOptions` or rely on the built-in `filterDataByLowerCase`.
  - Localization support depends on `turkishToLowerCase`; avoid custom filters unless they preserve Turkish character matching.
  - Reuse `dropdownStyles`/`dropdownTheme`, propagate loading states, and toggle menu state through the provided `onOpen` callback.
- **Role Awareness**
  - Derive role data from Redux (`getUserDataSelector`) or cookies (`session-user-role`) and normalize via `getRoleIdentity`.
  - Gate actions/UI by role flags (`isOwner`, `isCharterer`, `isAnon`) and fall back to shared UX copy sourced from `lib/constants`.
  - When calling services, pick endpoints based on role (e.g., owner vs charterer offer routes) to avoid 403 responses.
- **Constants & Utilities**
  - Global constants live in `lib/constants.js` and use `SCREAMING_SNAKE_CASE`.
  - Component-only constants may stay local if not reused elsewhere.
  - Utilities remain pure and side-effect free; if logic becomes domain-specific, promote it to `lib/` or `services/`.
- **State Management**
  - Normalize data within slices; expose selectors (e.g., `getNegotiatingDataSelector`) for component consumption.
  - Dispatch actions via `useDispatch`; keep async flows inside thunks/services.
- **Testing**
  - Jest + React Testing Library; place tests in `__tests__/` next to source (`Component/__tests__/Component.test.js`).
  - Use accessible queries (`getByRole`, `getByLabelText`) and Jest mocks for services/API.
  - Cover critical business paths, especially countdown timers and negotiation flows.
- **Maritime Standards**
  - Units: DWT/MT for weight, m³ for volume, mt/m³ for density.
  - State progression: Negotiating → On Subs → Failed → Completed → Lifted → Cancelled.
  - Respect tolerance ranges (±5–10%), laytime (12–120 h), density (0.6–2.0 mt/m³); include unit conversions when relevant.

## Realtime & SignalR

- Instantiate controllers from `utils/signalr` (`NotificationController`, `ChatSessionController`, `ChatNotificationController`) and call `init` with the auth token.
- Connections use HubConnectionBuilder with `getRtURL` + `getSocketConnectionsParams` (WebSockets, `skipNegotiation: true`, token factory); keep `.withAutomaticReconnect()`.
- Always listen and clean up with `connection.off`/`stop` on unmount; reuse `cleanup`/`stop` helpers to avoid duplicate listeners.
- Dispatch store updates through provided actions (`fetchNotifications`, `updateUserConversation`, `messageAlert`, `typingStatus`) and respect local sound toggles from `localStorage`.
- For chat sessions, persist `currentChatId` so `ReceiveMessage` handlers ignore other chats and invoke `ReadMessage` only when connected.

## Role-Based Access Patterns

- `ROLES` enum lives in `lib`; rely on it for comparisons rather than string literals.
- Middleware and components share the `getRoleIdentity` helper; use the same helper for consistent boolean flags.
- Align routing and guard logic with cookies set during auth (`session-user-id`, `session-user-role`); anonymous flows should check `isAnon`.
- When building UI variants, co-locate owner/charterer branches in the same component and keep copy in `lib/constants.js` or domain-specific constants.

## API Endpoints & Service Conventions

- Core account endpoints: `account/fleets`, `account/positions`, `account/pre-fixture/*`, `account/on-subs/*`, `account/user-profile-cargoes`.
- Negotiation lifecycle: `offer/*`, `counteroffer/*`, `deals/*`, `assigned-tasks/*` for countdown/extension management, `countdown-configs`.
- Messaging/notifications: `notifications/*`, `chat/*`, `chatlist`, plus file/document routes under `file/get` with `NEXT_PUBLIC_FILE_API_URL`.
- Before sending data, use adapters (e.g., `sendOfferAdapter`, `acceptOfferAdapter`) to conform payloads; services return `{ ...response }` and sometimes set `message` for success feedback.
- Use `errorToast` or service-level messages for user feedback; treat `response.error` truthy value as failure and surface fallback messaging.

## Workflow & Git Practices

- Branch strategy: feature → `dev` (deploy) → `stage` (deploy) → release branch → `main` (prod). Hotfixes branch from `main` only.
- Commit messages must follow **Conventional Commits** (`type(scope): subject`). Preferred scopes: `owner`, `charterer`, `vessel`, `cargo`, `ui`, `api`, `fix`, `negotiation`.
- Use Yarn scripts for tooling (`yarn lint`, `yarn test`, etc.); Husky enforces lint/format on commit.

## Additional Guidance

- Avoid direct API calls in components; delegate to services to keep UI lean.
- Use domain terminology consistently (vessel, laycan, offer, countdown status).
- Ensure countdown and task management features surface `countdownStatus` instead of deprecated fields like `frozenAt`.
- Keep accessibility in mind: semantic HTML, proper ARIA roles, keyboard interactions for modals/forms.
- Centralize option builders (`convertDataToOptions`, adapters) and share pagination defaults (`page`, `perPage`, `sortBy`) to keep API expectations predictable.
- Favor `useMemo`/`useCallback` for derived data passed to heavy components (tables, dropdowns) and reset component state when modals close to prevent stale values.

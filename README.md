# BurnRate
### A Subscription Expense Tracker for Gen-Z Software Workers

---

## Project Description

BurnRate is a full-stack-feeling React application that helps users track recurring subscription expenses — the kind that quietly drain money every month without anyone noticing (Netflix, Spotify, gym memberships, cloud tools). The name "BurnRate" borrows a real startup/finance term meaning *how fast a company burns through its cash* — applied here to personal subscription spending.

The target user is a young software professional who signs up for free trials and forgets to cancel them, loses track of multiple recurring payments across different apps and cards, and wants one dashboard that shows exactly where their money is going every month.

The app is a single-page application (SPA) built entirely with React, using a mock REST API (json-server) to simulate a real backend, so the project demonstrates full CRUD functionality without needing an actual server.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Library** | React (with Vite) | Component-based UI, fast dev server and build tool |
| **Routing** | React Router DOM | Client-side navigation between pages without full reloads |
| **State Management** | useReducer + Context API | Global state for both subscriptions and authentication, without prop drilling |
| **HTTP Client** | Axios | Communicates with the mock backend for all CRUD operations |
| **Mock Backend** | json-server | Turns a local `db.json` file into a working REST API instantly |
| **Styling** | CSS Modules | Component-scoped styles, no class name collisions |
| **UI Framework** | Bootstrap | Layout utilities and base styling |
| **Notifications** | react-toastify | Non-blocking success/error toast messages |
| **Persistence** | localStorage | Keeps the user logged in across page refreshes |

---

## Core Functionality

### 1. Authentication (Login / Register)
- Users register with a username and password, stored via json-server's `/users` endpoint
- Duplicate usernames are rejected at registration
- Login validates credentials against stored user records
- Logged-in state persists across refresh via `localStorage`
- Protected routes — the dashboard and all subscription pages are inaccessible without logging in; unauthenticated users are redirected to `/login`

### 2. Animated Splash Screen
- Plays after every successful login/registration, before the dashboard loads
- Subscription brand icons (Netflix, Spotify, Prime, etc.) orbit around a fire emoji "nucleus" on tilted elliptical rings, each at a different speed and angle — built entirely with CSS keyframe animations and CSS custom properties
- Icons then "burst" into outward-flying particles
- The BurnRate logo reveals itself beside the fire icon using a CSS typewriter animation
- Purely decorative but demonstrates advanced CSS animation skill and `useEffect`-driven timing

### 3. Dashboard
- Total monthly spend and yearly projection, calculated live from active subscriptions
- Active / Paused / Cancelled subscription counts
- Alert banner for subscriptions renewing within 7 days
- Category-wise monthly spend breakdown (Entertainment, Tools, Fitness, etc.)
- All calculations are derived using a custom hook (`useSubscriptionSummary`) with `useMemo`, so expensive calculations only re-run when the underlying data actually changes

### 4. Subscriptions Management (Full CRUD)
- **Create** — Add new subscriptions through a validated form (name, amount, billing cycle, category, status, dates, notes)
- **Read** — View all subscriptions with live search by name and filters by category/status
- **Update** — Edit existing subscriptions; data is passed between pages via `useNavigate`'s state and read with `useLocation`, avoiding the need for URL params
- **Delete** — Permanently remove a subscription with a confirmation prompt
- Status toggling — Pause/Activate a subscription, or Cancel it (moves to History instead of deleting)

### 5. History Page
- Shows all cancelled subscriptions
- Restore option moves a subscription back to active status
- Permanent delete option for records no longer needed

### 6. Form Validation
- Fully manual validation (no external library) — checks for empty fields, invalid amounts, and logical date ordering (next billing date must be after start date)
- Inline error messages shown per field

---

## React Concepts Demonstrated

| Concept | Where It's Used |
|---|---|
| `useState` | Form inputs, search/filter state, splash animation phases |
| `useEffect` | Initial data fetch on app load, splash screen timing with cleanup |
| `useContext` | Global access to both subscription data and auth state |
| `useReducer` | Centralized state transitions for subscriptions (`ADD`, `UPDATE`, `DELETE`, `CHANGE_STATUS`) and for auth (`LOGIN_SUCCESS`, `LOGOUT`) |
| `useMemo` | Filtered subscription lists, dashboard financial summaries, category breakdowns — all recalculate only when dependencies change |
| `useRef` | Direct DOM access for dynamically injecting particle animation elements |
| `useNavigate` / `useLocation` | Page-to-page navigation and passing data between Subscriptions and Edit pages without URL parameters |
| Custom Hooks | `useSubscriptionSummary` extracts all dashboard calculation logic out of the component |
| Context API | Two separate contexts (`SubscriptionContext`, `AuthContext`) — each with a single responsibility, mirroring how larger apps separate concerns |
| Controlled Forms | Every form input is driven by React state with manual validation |
| CSS Modules | Every component's styles are scoped locally, preventing class name conflicts |

---

 Architectural Decisions Worth Highlighting

Why useReducer + useContext together:** Context makes state available globally without prop drilling. Reducer centralizes how that state changes in response to different actions. Together they function like a lightweight Redux — without needing the actual Redux library.

Why two separate contexts instead of one:** Subscriptions and authentication are different concerns with different lifecycles. Keeping them separate means each context has a single responsibility, making the codebase easier to reason about and extend.

Why useLocation instead of useParams for editing:** Passing the full subscription object through navigation state avoids an extra API round-trip to re-fetch by ID, while staying within deliberately scoped, well-understood React Router features.

Why useMemo in the financial calculations:** Filtering and summing subscription data on every render — even renders triggered by unrelated state changes — would be wasteful. Memoization ensures these derived values only recompute when the subscriptions array, search term, or filters actually change.

---

Summary Statement (for presentations)

*"BurnRate is a subscription expense tracker built with React, using useReducer and Context API as a lightweight Redux-style state management pattern across two separate contexts — one for subscriptions, one for authentication. It includes full CRUD operations against a mock REST API via Axios and json-server, manual form validation, protected routing based on auth state with persistence via localStorage, and a custom-built CSS animation splash screen. Performance-sensitive calculations are optimized with useMemo through a custom hook that derives all dashboard financial summaries."*

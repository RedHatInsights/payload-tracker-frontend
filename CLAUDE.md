# payload-tracker-frontend

Frontend for the Payload Tracker — tracks payloads as they pass through the Red Hat Insights platform. Connects to the payload-tracker-go REST API.

## Commands

```bash
npm run start    # Dev server (webpack-dev-server, port 3000)
npm run build    # Production build (webpack)
npm run lint     # ESLint (src/)
npm run analyze  # Bundle analyzer (ANALYZE=true build)
```

There is no test script or test framework configured.

## Tech Stack

- React 18, JavaScript (no TypeScript), Redux + redux-thunk
- PatternFly 6 (react-core, react-table, react-icons)
- Axios for HTTP requests
- Luxon for date handling, humanize-duration for durations
- react-csv for CSV export
- Webpack 5 (custom config, not fec)
- Babel with `@babel/preset-env` and `@babel/preset-react` (automatic JSX runtime)

## Architecture

```
src/
  App.js               # Root component (routing, layout)
  AppConstants.js       # Redux action types, filter configs, defaults
  AppReducer.js         # Root reducer
  actions.js            # Redux action creators
  components/
    Payloads/           # Payloads list view
    Statuses/           # Statuses list view
    Track/              # Track by request_id view
    Table.js            # Shared table component
    Pagination.js       # Pagination component
    Filters/            # Filter toolbar and chips
    DateFilter/         # Date range filtering
    MainHeader.js       # Header navigation
    MainSidebar.js      # Sidebar navigation
    ErrorBoundary.js    # Error boundary
    ExportsDropdown.js  # CSV export dropdown
  reducers/             # Redux reducers (Cell, Data, Payloads, Track)
  store/                # Redux store configuration
  utilities/
    Api.js              # Axios API wrapper
    Common.js           # Shared utilities
```

Routes: `/app/payload-tracker/payloads`, `/app/payload-tracker/statuses`, `/app/payload-tracker/track`

API: `/api/v1/` endpoints via payload-tracker-go backend.

## Deployment

- Dockerized with nginx for production
- Tekton pipelines in `.tekton/` for CI/CD via Konflux
- Build/deploy scripts: `build_deploy.sh`, `pr_check.sh`

## Conventions

- ESLint 9 (flat config) with eslint-plugin-react and eslint-plugin-react-hooks
- 4-space indentation, single quotes, semicolons required
- Max line length 150
- Pure JavaScript — no TypeScript
- Redux pattern: constants in AppConstants.js, actions in actions.js, reducers in reducers/
- Page-level components in subdirectories (Payloads/, Statuses/, Track/)

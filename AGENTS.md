# AGENTS.md

This file provides guidance for agentic coding agents working on the **Open My Tabs** Chrome Extension.

---

## 1. Project Overview
Open My Tabs is a lightweight Manifest V3 Chrome Extension designed to open a predefined set of URLs simultaneously when the extension icon is clicked.

### Key Technologies
- **JavaScript (ES6+):** Vanilla JS used in the background service worker.
- **Chrome Extensions API:** Specifically `chrome.action` and `chrome.tabs`.
- **Manifest V3:** Adheres to modern extension security and performance standards.

---

## 2. Build, Lint, and Test Commands

Currently, this project is a "raw" extension without a node-based build system.

### Manual Verification
- **Loading the Extension:** 
  1. Open Chrome and navigate to `chrome://extensions/`.
  2. Enable "Developer mode".
  3. Click "Load unpacked" and select the project root directory.
- **Reloading:** Click the "Refresh" icon on the extension card after making changes to `background.js` or `manifest.json`.
- **Debugging:** Click the `service worker` link in the extension card to open the DevTools console for the background script.

### Proposed Automated Tooling
If a `package.json` is introduced, these standard scripts should be implemented:
- **Linting:** `npm run lint` (using ESLint with `eslint-plugin-webextensions`).
- **Formatting:** `npm run format` (using Prettier with 2-space indentation).
- **Tests (All):** `npm run test` (using Jest or Vitest).
- **Single Test:** `npx jest path/to/file.test.js` or `npm run test -- path/to/file.test.js`.

---

## 3. Code Style Guidelines

### General Principles
- **Simplicity:** Favor flat logic over deep abstractions.
- **Modern JS:** Utilize ES6+ (arrow functions, template literals, destructuring, and async/await).
- **Immutability:** Prefer `const` over `let` whenever possible; avoid `var` entirely.

### Naming Conventions
- **Variables & Functions:** `camelCase`.
- **Global Constants:** `SCREAMING_SNAKE_CASE` (e.g., `DEFAULT_URL_LIST`).
- **Local Constants:** `camelCase`.
- **Files:** `kebab-case` for all new filenames (e.g., `utility-functions.js`).

### Formatting & Structure
- **Indentation:** 2 spaces.
- **Quotes:** Double quotes (`"`) for strings, unless backticks are needed for interpolation.
- **Semicolons:** Required for all statements.
- **Trailing Commas:** Required in multi-line arrays and objects to maintain clean git diffs.

### Imports & Modularization
- **ES Modules:** Use `import` and `export` statements. Manifest V3 service workers support ES modules natively if declared as such.
- **Grouping:** 
  1. Built-in modules / Chrome APIs.
  2. Third-party libraries (if any).
  3. Internal project files.

### Error Handling
- **Async Safety:** Wrap all Chrome API calls in `try/catch` blocks when using `await`.
- **Callback Verification:** If using callbacks, always check `chrome.runtime.lastError`.
- **Graceful Degradation:** If a tab fails to open, log a descriptive error to the console rather than allowing the script to fail silently or crash.

### Typing
- **JSDoc:** Provide JSDoc comments for all non-trivial functions to aid IntelliSense and agent understanding.
- **TypeScript:** If migrating to TS, use `strict` mode, avoid `any`, and define interfaces for all data structures.

---

## 4. Extension Specific Rules (Manifest V3)

### Security & Permissions
- **Principle of Least Privilege:** Request only the absolute minimum permissions (e.g., current: `["tabs"]`).
- **Content Security Policy (CSP):** Do not attempt to use inline scripts or `eval()`. All code must be local to the extension package.
- **Safe URLs:** Validate all URLs before passing them to `chrome.tabs.create`.

### Service Worker Architecture
- **Ephemerality:** Service workers can terminate at any time. Do not store state in global variables; use `chrome.storage.local` or `chrome.storage.session` for persistence.
- **Events:** Register listeners (e.g., `chrome.action.onClicked`) at the top level of the script to ensure they are captured when the worker wakes up.

---

## 5. Debugging and Logging

### Best Practices
- **Console Logs:** Use `console.log` for flow tracking and `console.error` for failures.
- **Contextual Info:** Include relevant IDs (tab ID, URL) in logs to make debugging easier in the service worker console.
- **Cleanup:** Remove or comment out verbose debugging logs before finalizing changes.

---

## 6. Implementation Workflow

1. **Analysis:** Explore `manifest.json` and existing scripts to understand dependencies and permissions.
2. **Development:** Implement changes following the established style.
3. **Manifest Sync:** Update `manifest.json` if new permissions, scripts, or assets are added.
4. **Validation:**
   - Reload the extension in `chrome://extensions/`.
   - Perform a manual click test.
   - Inspect the Service Worker console for any errors or logs.
5. **Git:** Commit changes with descriptive messages that explain the "why" behind the modification.

---

## 7. Project-Specific Constraints
- **URL Configuration:** Keep the list of target URLs grouped together for easy modification.
- **Icon Integrity:** Ensure the referenced `icon.png` is optimized and present in the root directory.

---

## 8. State Management and Persistence

### chrome.storage API
- **Local vs. Sync:** Use `chrome.storage.local` for machine-specific data and `chrome.storage.sync` if user-customizable settings (like the URL list) should persist across devices.
- **Asynchronous Access:** Always use `await` when interacting with storage to ensure the service worker state is consistent.
- **Storage Limits:** Be mindful of quotas; avoid storing large binary blobs in `chrome.storage`.

---

## 9. Versioning and Manifest Updates

### Manifest Versioning
- **Semantic Versioning:** Follow `major.minor.patch` for the `version` field in `manifest.json`.
- **Manifest V3:** Maintain compatibility with Manifest V3. Avoid using deprecated V2 APIs (like `chrome.browserAction` or persistent background pages).
- **Permissions Audit:** Regularly review and remove unused permissions to maintain the extension's security posture.

---

## 10. Documentation Standards

### Inline Comments
- Use comments to explain the "why" for complex logic or workarounds for browser-specific quirks.
- Avoid obvious comments that restate what the code is doing.

### README and AGENTS.md
- Keep the project's README updated with installation and usage instructions.
- If significant architectural changes are made, update this `AGENTS.md` file to reflect the new standards.

---

## 11. User Interface (UI) Guidance

### Popups and Options Pages
- **Consistency:** If adding a popup (`default_popup`), ensure its design matches the clean, lightweight aesthetic of the extension.
- **Performance:** Keep UI scripts small and fast to ensure the popup opens instantly.
- **Accessibility:** Use standard HTML elements and provide ARIA labels where necessary.

---
*Note: This file is intended for use by LLM-based coding assistants to ensure consistency and quality across the codebase.*

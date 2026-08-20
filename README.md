# ScripBook — Privacy Policy

Public privacy policy for the ScripBook budgeting app, hosted with GitHub Pages.

- `index.html` — the policy itself, the URL submitted to both app stores
- `STORE-FORMS.md` — exact answers for Apple's App Privacy questionnaire and
  Google's Data Safety form (not published; reference only)

## Why this repo exists

Apple and Google both require a privacy policy at a publicly reachable URL,
entered in the store listing. A reviewer, and anyone browsing the store page,
must be able to open it **without installing the app**, so an in-app screen
alone does not satisfy the requirement.

## Keep in mind

ScripBook currently collects nothing — no accounts, no servers, no analytics,
no network requests. The policy says so plainly.

**If a future version transmits anything** (cloud sync, crash reporting,
analytics), update `index.html` *and* the store forms **before** that build
ships. Publishing a build whose behaviour contradicts this page is a
compliance problem, not a paperwork one.

# Store privacy forms — exact answers for ScripBook

Both stores make you declare data practices separately from the policy URL.
These answers reflect what the app actually does (verified: no network calls,
no analytics or ad SDKs, fonts bundled rather than fetched).

If you ever add crash reporting, analytics, or cloud sync, **these answers and
the policy must be updated before that build ships.**

---

## Apple — App Privacy ("Nutrition Label")

App Store Connect → your app → App Privacy.

**"Do you or your third-party partners collect data from this app?"**
→ **No**

That single answer ends the questionnaire. Apple defines "collect" as
transmitting data off the device. Data that stays local and is never
transmitted is explicitly out of scope, which is exactly this app.

Your label will read **"Data Not Collected."**

### If asked about tracking (App Tracking Transparency)
→ The app does **not** track. No ATT prompt is needed, because there is no
advertising identifier and nothing is shared with data brokers.

### Export compliance
Already handled in `app.json` via `ITSAppUsesNonExemptEncryption: false`, so
the per-upload prompt is skipped. This is accurate — the app uses no encryption.

---

## Google — Data Safety form

Play Console → your app → App content → Data safety.

**Does your app collect or share any of the required user data types?**
→ **No**

**Is all of the user data collected by your app encrypted in transit?**
→ Not applicable (no data is transmitted). If the form forces an answer,
choose the option indicating no data is collected or transmitted.

**Do you provide a way for users to request that their data is deleted?**
→ **No** — and the reason is legitimate: there is no account and no server-side
data. Users delete everything by removing entries or uninstalling the app.

### Data types — all answered "No"
| Category | Collected? |
|---|---|
| Location | No |
| Personal info (name, email, address) | No |
| Financial info | **No** — amounts are entered and stored locally, never transmitted |
| Health and fitness | No |
| Messages | No |
| Photos and videos | No |
| Audio files | No |
| Files and docs | No — backups are written locally and shared only by user action |
| Calendar | No |
| Contacts | No |
| App activity | No |
| Web browsing | No |
| App info and performance | No — no crash logs or diagnostics are gathered |
| Device or other IDs | No |

**Note on "Financial info":** the honest answer is No. The form asks whether you
*collect* it, meaning transmit it off the device. Users type amounts in, and
those amounts stay on the phone.

---

## Play Console — other required declarations

- **Ads:** app contains no ads → declare **No ads**
- **Content rating questionnaire:** answer honestly; expect **Everyone**
- **Target audience:** not directed at children. The app is a general finance
  tool, so choose an adult age range to avoid Families Policy obligations.
- **Government app:** No
- **Financial features:** ScripBook is a personal record-keeping tool. It does
  not provide banking, lending, payments, investing, or crypto services, and
  connects to no financial institution. Declare no regulated financial features.

---

## Privacy policy URL

Same URL in both consoles, once GitHub Pages is live:

```
https://<your-github-username>.github.io/scripbook-privacy/
```

Must stay publicly reachable with no login for as long as the app is listed.

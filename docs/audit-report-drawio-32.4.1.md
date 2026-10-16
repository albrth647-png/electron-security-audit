# AUDIT REPORT — draw.io Desktop 32.4.1

> 🟢 **PUBLIC SAMPLE REPORT** — the exact deliverable shipped in the Entry package
> (150 USDT). Target is **open-source** (GPL-3.0), analyzed under the terms of its own license.
> No real client involved: this is the demonstration piece.
>
> **Linked documents:** [report template](report-template.md) · [engagement authorization](engagement-authorization.md) ·
> [payment proforma](payment-proforma.md) · [repo home](../README.md) · [versión en español](es/informe-muestra.md)

---

## ENGAGEMENT METADATA

| Field | Value |
|---|---|
| **Client** | — (public sample) |
| **Application audited** | **draw.io Desktop v32.4.1** (JGraph) |
| **Artifact** | `drawio-amd64-32.4.1.deb` (116.3 MB) · release `jgraph/drawio-desktop v32.4.1` |
| **SHA-256 of artifact** | `f4455b3bba3d3b539c3cd069218fc64f0462b1b01610fe8d11acc3ca8566f32b` |
| **Verified against official hash** | ✅ **Yes** — matches `Files-SHA256-Hashes.txt` published in the release itself |
| **Received** | 2026-10-16 (received and delivered same day — the artifact is public) |
| **Delivered** | 2026-10-16 (contracted SLA: 48 h) |
| **Analyst** | [albrth647-png](https://github.com/albrth647-png) · engine **REA 6.5.0 + Ghidra 12.1.4** |
| **Scope agreed** | **Entry** package — see [proforma](payment-proforma.md) |
| **Target license** | GPL-3.0-only (public source; analysis permitted) |

**Analysis executions** (both on GitHub Actions — the artifact was downloaded and analyzed *in the cloud*; the operator only retrieved kilobytes of evidence):

| Run | Scope | Result | Duration |
|---|---|---|---|
| [`38856900076`](https://github.com/albrth647-png/Ghidra/actions/runs/38856900076) | full `app.asar` (broad inventory) + Ghidra native | ⚠️ Partial (300 s limit) + ✅ native complete | 9 m 15 s |
| [`38858685634`](https://github.com/albrth647-png/Ghidra/actions/runs/38858685634) | **main process** (`src/main`) — Electron vectors | ✅ **Complete** | ~40 s |

---

## 1. EXECUTIVE SUMMARY

**Overall status:** 🟢 **No critical findings.** draw.io's security baseline is correct; the items
to watch are **coverage and maintenance** concerns, not an active flaw.

**Findings in one line:**

| Metric | Value |
|---|---|
| Dependencies with versions (SBOM) | **82 packages** (9 direct) |
| Active CVEs (5 candidates cross-checked against public DBs) | **0** — all versions sit in patched ranges |
| BrowserWindow instances | **5** → 4 verifiable, **1 dynamic → NOT verifiable** |
| Verified config where inspectable | ✅ `contextIsolation:true` + `nodeIntegration:false` + `webSecurity:true` + `webviewTag:false` in **4/4** |
| IPC surface | **35 operations** · 28 literal channels · 29 handlers in main |
| Sender validation observed | **2 candidates** across 29 handlers (**enforcement unknown**) |
| Embedded secrets (audited scope) | **0** detected |
| Dependency-tree duplication | **3 families** (debug, ms, semver) |

**Primary recommendation:** manually review the window built with **dynamic options**
(`electron.js:565`) and broaden sender validation across IPC channels; neither requires immediate action.

---

## 2. SBOM — Dependency tree

### 2.1 Inventory metrics (run 1 — full asar)

| Metric | Value | Evidence |
|---|---|---|
| Relevant files inventoried | **1,292** | `ev_a94efae8…` |
| Text bytes read | **34,027,540** (34 MB) | `ev_a94efae8…` |
| AST nodes visited | **3,267,398** | `ev_a94efae8…` |
| Findings emitted | **3,246** | `ev_a94efae8…` |
| Parse failures | **0** | `ev_a94efae8…` |
| Application graph | 4,804 nodes · 7,121 edges | `jag_25dd177b…` |
| Semantic graph | 33,455 nodes · 19,074 relations | `jsrg_7814efb4…` |
| **Unknowns declared** | **92,468** | see §6 |

### 2.2 Direct dependencies (9) — from the packaged manifest

| Package | Declared | Installed (lockfile) | Role |
|---|---|---|---|
| `electron-updater` | ^6.8.9 | **6.8.9** | auto-updates |
| `electron-store` | ^11.0.2 | **11.0.2** | local persistence (`.configuration`) |
| `electron-log` | ^5.4.4 | **5.4.4** | logging |
| `electron-context-menu` | ^5.1.0 | **5.1.0** | UI |
| `@cantoo/pdf-lib` | ^2.7.3 | **2.11.1** | PDF generation |
| `compression` | ^1.8.1 | **1.8.2** | HTTP |
| `crc` | ^4.3.2 | **4.3.2** | checksums |
| `buffer` | ^6.0.3 | **6.0.3** | polyfill |
| `tslib` | ^2.8.1 | **2.8.1** | TS runtime |

> **Electron runtime:** the asar manifest does **not** declare Electron (it is a build-time
> devDependency). External source verified today: `package-lock.json` of tag `v32.4.1` →
> **Electron 44.7.0**, `electron-builder` 26.17.0. **Not confirmable from the artifact itself** → §6.

### 2.3 Full SBOM: 82 packages with versions

> Complete list in [`evidence/sbom-drawio-32.4.1.txt`](../evidence/sbom-drawio-32.4.1.txt)
> (derived from every `node_modules` `package.json` **inside the asar**).

Excerpt:

```
electron-updater@6.8.9      electron-store@11.0.2     electron-log@5.4.4
@cantoo/pdf-lib@2.11.1      ajv@8.20.0                semver@7.7.4 / 7.8.5
builder-util-runtime@9.7.0  electron-dl@5.0.0         fs-extra@10.1.0
debug@2.6.9 / 4.4.3         ms@2.0.0 / 2.1.3          graceful-fs@4.2.11
… (82 total)
```

### 2.4 Tree findings

| # | Finding | Detail | Risk |
|---|---|---|---|
| 1 | **3 duplicated families** | `debug` (2.6.9 **and** 4.4.3) · `ms` (2.0.0 **and** 2.1.3) · `semver` (7.7.4 **and** 7.8.5) | 🟡 Inconsistency — two maintenance lines coexist |
| 2 | **Stale line shipped** | `debug@2.6.9` (2017-era branch) arrives transitively | 🟡 Aging-tree signal (no active CVE — see §3) |
| 3 | Dependencies you didn't expect | `ajv`+`ajv-formats` (JSON-Schema), `negotiator@0.6.4`, `on-headers@1.1.0` — the `compression`/HTTP chain | 🟡 Inherited transitive surface |

---

## 3. RISK — Vulnerability cross-check (CVE)

> **Method:** SBOM versions cross-checked against **public databases** (NVD / GitHub Advisories /
> GitLab GLAD / Snyk) — queried **2026-10-16**. Sample scope: **5 relevant candidates**, not the
> entire NVD catalog (§6.7).

| # | CVE / GHSA | Product | Affects | Installed | Status |
|---|---|---|---|---|---|
| 1 | **CVE-2024-39698** (GHSA-9jxc-qjr9-vjxq) | `electron-updater` — Windows signature check bypassable via cmd env expansion | `< 6.3.0-alpha.6` | **6.8.9** | ✅ **Not affected** |
| 2 | **CVE-2026-54673** (GHSA-p2f4-r6v6-j797) | `builder-util-runtime` — credential headers leaked on redirect | `< 9.7.0` | **9.7.0** | ✅ **Patched** — *sitting exactly on the fix floor* |
| 3 | **CVE-2026-54672** (GHSA-7g7r-gx96-252g) | `app-builder-lib`/`electron-builder` — `LD_LIBRARY_PATH` in AppImage (build) | `< 26.15.0` | **26.17.0** | ✅ **Patched** (build phase — see §6.6) |
| 4 | **CVE-2026-102672** (GHSA-vv43-5jgx-7qv8) | **Electron** — race in Squirrel.Mac (macOS only) | ranges `≤39.8.x / ≤41.10.4 / <42.0.0-beta.2` | **44.7.0** | ✅ **Not affected** |
| 5 | **CVE-2026-70604** (GHSA-v3j7-r9gq-3gjw) | **Electron** — CORS missing on custom schemes with `supportFetchAPI` | `≤39.8.9 / 40.≤9.3 / 41.≤4.0 / <42.0.0` | **44.7.0** | ✅ **Not affected** |

### 3.1 Risk context

- **None of the 5 CVEs consulted affect this build** — draw.io's dependency hygiene is **good**
  (active maintainer, recent Electron 44.7.0).
- **One caveat:** `builder-util-runtime` sits **at exactly 9.7.0**, the first patched release of
  CVE-2026-54673 — **zero margin**: any pin below it (stale lockfile resolution, outdated mirror)
  reintroduces the vulnerability. Warranties attention, not alarm.
- External corroboration: Snyk reports *"3 vulnerabilities, none affect the latest version (6.8.9)"*
  for `electron-updater`.

### 3.2 Dependency chain (example)

```
draw.io → electron-updater@6.8.9 → builder-util-runtime@9.7.0  ← fix floor for CVE-2026-54673
draw.io → compression@1.8.2 → negotiator@0.6.4 / on-headers@1.1.0  (inherited HTTP chain)
```

---

## 4. EXPOSURE — Electron security architecture

> Data from **run 2** (complete main-process analysis) — `ev_f0e4202c…`.

### 4.1 Global vectors

| Vector | State | Risk | Evidence |
|---|---|---|---|
| `contextIsolation` | ✅ `true` in **4/4** windows with literal options | 🟢 | `ev_f0e4202c…` |
| `nodeIntegration` | ✅ `false` in **4/4** | 🟢 | `ev_f0e4202c…` |
| `webSecurity` | ✅ `true` in **4/4** | 🟢 | `ev_f0e4202c…` |
| `webviewTag` | ✅ `false` in **4/4** | 🟢 | `ev_f0e4202c…` |
| `sandbox` | 🟠 `true` declared only in **1/5** (`progress-bar.js`) — the others **don't declare it**, and REA **does not assume defaults** (`absence_means_default:false`) | 🟡 | `ev_f0e4202c…` |
| CSP (Content Security Policy) | ⬜ **Not evidenced in this scope** (lives in renderer HTML, outside the main process) | ⬜ §6.5 | — |

### 4.2 The 5 windows (`BrowserWindow`)

| # | Location | `contextIsolation` | `nodeIntegration` | `sandbox` | Preload | Note |
|---|---|---|---|---|---|---|
| 1 | `electron.js:911-921` | ✅ true | ✅ false | ⬜ not declared | `electron-preload.js` (dynamic expression) | Main window |
| 2 | **`electron.js:565`** | ⚠️ **DYNAMIC** | ⚠️ **DYNAMIC** | ⚠️ DYNAMIC | — | **Options not literal → NOT statically verifiable** |
| 3 | `progress-bar.js:36-53` | ✅ true | ✅ false | ✅ **true** | — | **Strictest config** of the set |
| 4 | `electron.js:3094-3111` (offscreen) | ✅ true | ✅ false | ⬜ not declared | `electron-preload.js` (dynamic) | `offscreen` partially dynamic |
| 5 | `electron.js:1228-1238` | ✅ true | ✅ false | ⬜ not declared | `electron-preload.js` (dynamic) | — |

> **25 explicit** `webPreferences` counted in total · `preload_entrypoints: 0` — the preload **is
> referenced** via dynamic templates (`` `${__dirname}/…` ``) but **never resolves as an entrypoint** → §6.

### 4.3 Exposed IPC channels (35 operations)

**29 handlers in main · 28 literal channels · 3 dynamic operations · 0 unpaired (`unpaired_literal: 0`)**

| Group | Channels |
|---|---|
| **Files / editing** | `export` · `export-error` · `export-finalize` · `import-success` · `import-error` · `svg-data` · `xml-data` · `xml-data-error` · `newfile` · `fileChanged` · `draftRemoved` · `isModified-result` · `saveAndClose-result` |
| **Window / UI** | `zoomIn` · `zoomOut` · `resetZoom` · `toggleFullscreen` · `openDevTools` |
| **Updates** | `checkForUpdates` · `installUpdate` · `toggleAutoUpdate` |
| **Configuration** | `toggleSpellCheck` · `toggleGoogleFonts` · `toggleStoreBkp` |
| **Renderer↔main transport** | `rendererReq` · `mainResp` · `app-load-finished` · `render-finished` |
| **Dynamic (unresolvable)** | `action` (send/on/once from renderer) — **3 operations** with a runtime-computed channel |

### 4.4 Sender validation

| Metric | Value | Reading |
|---|---|---|
| Validation candidates observed | **2** (mechanism `comparison:!=`, `expected: null`, **`enforcement: unknown`**) | 🟠 Only 2 of 29 handlers carry a validation observation |
| Paired renderer transmissions | 1 (`paired_renderer_transmissions`) | 🟢 No unpaired literal channels |
| Ambiguities | 0 | 🟢 |

> ⚠️ **Honest reading (provider limitation #7):** the absence of observations on the other handlers
> **does NOT prove** they don't validate — only that REA found no static syntax. See §6.

### 4.5 Preload bridge (`contextBridge`) — 2 APIs, 6 members

| API | Exposed members | `unknown_members` | Resolution |
|---|---|---|---|
| `electron` | `listenOnce` · `registerMsgListener` · `request` · `sendMessage` | 0 | direct syntax |
| `process` | `type` · `versions` | 0 | direct syntax |

> **Minimal, purpose-scoped surface** — correct pattern (no `require`, no `ipcRenderer`, no `fs`
> exposed). 🟢

### 4.6 Endpoint candidates and storage

| Type | Finding | Interpretation after review |
|---|---|---|
| 7 × `endpoint` (candidates) | `lastWinSize` · `updateCheckIntervalHours` · `enableStoreBkp` · `dontCheckUpdates` · `lastUpdateCheck` · `enableSpellCheck` · `isGoogleFontsEnabled` — mechanism `call:store.get` | 🟡 **Declared candidate false positives**: these are `electron-store` keys, **not network URLs**. REA marks them `interpretation: candidate`; manual review discards them as network. *(Example of the value of declaring candidates instead of asserting.)* |
| 1 × `storage` | `.configuration` (`electron-store` file) | Local persistence — review encryption if sensitive data is ever stored (Standard package) |

---

## 5. EMBEDDED SECRETS

> ⚠️ This section reports **presence** of sensitive data. Nothing is tested, extracted, or accessed.

**Lexical scan over the evidence of both runs** (5 pattern families):

| Pattern | Matches |
|---|---|
| `Bearer …` tokens | **0** |
| Key formats (`sk-…` / `AKIA…` / `ghp_…` / `xox…`) | **0** |
| Credentials in URLs (`user:pass@host`) | **0** |
| Assignments `api_key/secret/token = "…"` | **0** |
| JWTs (`eyJ….…`) | **0** |

**Result: 0 secrets detected within the audited scope** (main process + 34 MB of the asar read in
run 1). Full-bundle coverage remains subject to §6.1 (run 1 interrupted).

---

## 6. LIMITS AND UNKNOWNS

> 🔴 **Mandatory section.** Most due-diligence vendors never publish this. **Transparency is the product.**

### 6.1 Limitations declared by REA

**Run 1 (full asar):**

1. Source analysis was **interrupted**: `timeout 300000 ms` + `heap 1,098,907,648 B` exhausted on
   `drawio/src/main/webapp/js/app.min.js` (giant minified bundle).
2. `extensions.min.js` — own timeout · `dropbox.html`, `github.html`, `gitlab.html` —
   **1 inline JS body each NOT analyzed** (named explicitly).
3. CommonJS/ESM bindings resolved **only within the inventoried artifact container**.
4. JavaScript was parsed as **inert text — nothing was executed**.
5. *"Unavailable facts remain explicit and must not be read as absence."*
6. Dynamic or obfuscated paths may remain unresolved.

**Run 2 (main process):**

7. Dynamic IPC channels (e.g. `action`) are **never paired by textual similarity**.
8. Electron API identity follows verified lexical aliases — arbitrary reassignments are not evaluated.
9. **Runtime defaults, reachability, and enforcement remain unproven** (static analysis).
10. Sender/origin checks are **observations only**: REA does not claim they enforce a complete
    authorization policy.

### 6.2 What could NOT be determined

| Question | Why | How it gets resolved |
|---|---|---|
| **Security config of `electron.js:565`** | Options built dynamically — not literals | Manual code review (Standard package) |
| **Actual renderer CSP** | Lives in HTML outside the analyzed main process | HTML/`app.min.js` analysis with a larger budget |
| **Exact Electron version inside the binary** | The asar manifest doesn't declare it; 44.7.0 comes from the tag's **lockfile** | Binary strings / `--version` (not executed) |
| **Runtime behavior** | **100% static** analysis: nothing ran | Dynamic audit (Pro package) |
| **AppImage / Windows / macOS artifacts** | Only the **`.deb`** was audited (CVE-2026-54672 affects AppImage builds) | Audit each artifact separately |
| **Do the other 27 handlers validate sender?** | No static patterns found (limitation #7 — **not absence**) | Manual review / channel fuzzing |
| **Secrets beyond the read scope** | Run 1 covered 34 MB before limits hit | Re-run with bundle partitioning |

### 6.3 Analysis assumptions

- The `.deb` downloaded from the official release **is** the deployed one (hash **verified** against
  the published one ✅).
- The tag's `package-lock.json` reflects the real build (not verified against the binary).
- The declared version (32.4.1) matches the artifact (consistent with filename and manifest).

### 6.4 Declared coverage (fact families)

- Run 1: **12 fact families, all `partial`** · active limits: `heap 1 GB`, `timeout 300 s`,
  `file ceiling 20,000`, `node ceiling 100,000`.
- **92,468 unknowns registered** with their own IDs (each re-queryable) — uncertainty is
  **accounted for**, not hidden.

### 6.5 CSP and HTML

No CSP facts were emitted — **this does not mean none exists**; it was outside both runs' scope (§6.2).

### 6.6 Artifact scope

Only `drawio-amd64-32.4.1.deb`. AppImage/Windows/macOS builds of the same release **may differ**
(e.g., CVE-2026-54672 is AppImage-exclusive).

### 6.7 CVE cross-check

**5 candidates** queried on **2026-10-16** across NVD/GHSA/GLAD/Snyk — **not an exhaustive sweep**
of all 82 versions. The Standard package includes a full sweep.

---

## 7. EVIDENCE

### 7.1 Fingerprint per operation

| # | Operation | Evidence ID | Confidence | Coverage |
|---|---|---|---|---|
| 1 | `analyze_javascript_application` (full asar) | `ev_a94efae81586d359238a5eb1cd34b9a9ed8da7748c3f9a86d4757fe855435ca8` | `derived` | `partial` (interrupted) |
| 2 | `analyze_javascript_application` (main process) | `ev_f0e4202c3b188da10f4be9b3693006b0ba64e3483e7ea100916e388dd413fc2e` | `derived` | `partial` (see §6.1) |
| 3 | `binary_overview` (Ghidra — native) | `ev_9ec17cfca1a869df4352fd6e5db03285c014f0efc2024a30ec924c337c7a22f0` | `derived` | 10 limitations |

### 7.2 Verified integrity

| Artifact | SHA-256 |
|---|---|
| `drawio-amd64-32.4.1.deb` | `f4455b3bba3d3b539c3cd069218fc64f0462b1b01610fe8d11acc3ca8566f32b` ✅ *(matches official hash)* |
| `app.asar` (run 1 root) | `e64b9650c0b8241ca9a7d33b56386a385bceee63270cec701d3a467347b697e6` |
| `src/main` directory (run 2 root) | `04b32cf796534f828ddb3b57568be1e7e1be27f9f8d43debc924af49b5d19596` |
| `chrome_crashpad_handler` (ELF x86_64) | `3e9742b8edaef6779c48e0966b9f433db39e59ee148854312b5a5c8612100a04` |

### 7.3 Graphs and inventories (chained IDs)

| Object | ID |
|---|---|
| Inventory run 1 | `agm_e0fe639090b97e0e12931fb0440e1c0901c2302d8aed2937c0cda396cf2a50d5` |
| Inventory run 2 | `agm_7fa81bc6b0c15cc6b72f6653aaded445a9ead21ec858a18227ea75be22b37a14` |
| Application graph run 1 | `jag_25dd177b5be54d19217508589793de164ce5e8ea2a0cba52ceeefd420fcd9799` |
| Semantic graph run 1 | `jsrg_7814efb457d1aa30a5655a1fc37090f9f7a5c2b7bb4cbfd688af02299634672a` |
| Application graph run 2 | `jag_960f4912770a9cafef5baf5d42c847e198ea0f52926680f237e73e05481d594e` |

### 7.4 Independent verification

Anyone can reproduce this report:

```bash
# 1. Download the official artifact and verify the hash
curl -LO https://github.com/jgraph/drawio-desktop/releases/download/v32.4.1/drawio-amd64-32.4.1.deb
sha256sum drawio-amd64-32.4.1.deb   # → f4455b3b…  ✅

# 2. Re-run the analysis (REA 6.5.0)
rea analyze-javascript-application <asar-or-src/main> --json

# …or launch the same workflow in the cloud:
#   albrth647-png/Ghidra → Actions → REA-Audit → fill asset_url + sha256_url
```

### 7.5 Evidence bundle for this report

| File | Contents |
|---|---|
| [`evidence/evidence-summary.json`](../evidence/evidence-summary.json) | Verifiable index of runs, evidence IDs and hashes |
| [`evidence/evidence-run1-asar.json`](../evidence/evidence-run1-asar.json) | Compact run 1 extract (IDs, stats, 12 limitations) |
| [`evidence/evidence-run2-main.json`](../evidence/evidence-run2-main.json) | Full run 2 with the **188 typed nodes** (IPC, windows, bridge) |
| [`evidence/evidence-native-ghidra.json`](../evidence/evidence-native-ghidra.json) | Ghidra native overview (36 segments · 5,802 procedures · 2,184 strings) |
| [`evidence/sbom-drawio-32.4.1.txt`](../evidence/sbom-drawio-32.4.1.txt) | 82 packages `name@version` |
| [`evidence/package-drawio-32.4.1.json`](../evidence/package-drawio-32.4.1.json) | Project manifest |
| [`evidence/sha256-drawio-amd64-32.4.1.deb.txt`](../evidence/sha256-drawio-amd64-32.4.1.deb.txt) | Artifact hash |

---

## 8. PRIORITIZED RECOMMENDATIONS

| Priority | Finding | Recommended action | Effort |
|---|---|---|---|
| 🔴 **P0** | — | **No critical findings** | — |
| 🟠 **P1** | Window `electron.js:565` with **unverifiable dynamic options** | Manually review its `webPreferences`; pin them as literals | Low |
| 🟠 **P1** | Only **2 sender-validation candidates** across 29 handlers | Audit the IPC channel validation policy (Standard package) | Medium |
| 🟠 **P1** | `builder-util-runtime` **at 9.7.0** (exact fix floor for CVE-2026-54673) | Pin `≥9.7.0` explicitly; watch releases | Low |
| 🟡 **P2** | `sandbox` declared in only 1/5 windows | Declare `sandbox:true` explicitly in every window | Low |
| 🟡 **P2** | Duplicated tree: `debug` ×2 · `ms` ×2 · `semver` ×2 | Deduplicate (`npm dedupe`); drop the `debug@2.6.9` line | Low |
| 🟡 **P2** | CSP not evidenced in this scope | Audit renderer HTML CSP (Standard package) | Medium |
| ⬜ **P3** | Only the `.deb` audited | Audit AppImage/Win/macOS of the same release | Medium |
| ⬜ **P3** | 5-candidate CVE cross-check | Exhaustive sweep of all 82 packages (Standard package) | Medium |

> **Rule:** this report delivers **recommendations, not changes**. Guided remediation is the
> Standard package (600 USDT) — see [proforma](payment-proforma.md).

---

## CLOSING

> This report was produced by **static analysis** of the verified artifact named in the metadata.
> Sections **§6** and **§7** explicitly document scope, limits, and verifiable evidence.
> **The artifact was analyzed on the analyst's GitHub Actions cloud** (where Ghidra lives): for real
> engagements the client's software is analyzed locally or on the client's own runner — never
> uploaded to third-party services.
>
> **Sample outcome:** 🟢 solid baseline · 0 active CVEs in the cross-check · 4/5 windows with
> verified secure config · 0 secrets · 7 points declared as undetermined.

**Suggested next step:** compare this report with the one for **your** Electron/JS app —
[proforma for 150 USDT](payment-proforma.md) · [what you sign first](engagement-authorization.md).

---

*Generated with REA 6.5.0 + Ghidra 12.1.4 · `rea-audit.yml` workflows · 2026-10-16*
*Template used: [report-template.md](report-template.md) — this document is its real instance.*

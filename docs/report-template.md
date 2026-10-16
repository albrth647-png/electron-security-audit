# AUDIT REPORT TEMPLATE — Dependency & risk audit

> **Version:** 1.0 · **Package:** Entry (150 USDT) · **SLA:** 48 h
> **Engine:** REA + Ghidra · **Payment:** USDT TRC-20
> **Linked documents:** [proforma](payment-proforma.md) · [engagement authorization](engagement-authorization.md) · [live sample report](audit-report-drawio-32.4.1.md)

---

## How to use this template

1. **Duplicate** this file as `audit-report-<app>-<date>.md`
2. **Fill** every section with **real** findings — never invent anything
3. **Every finding claim** must carry its `evidence_id` (§7)
4. **Section §6 (Limits) is mandatory** — it is your commercial differentiator
5. **Never include** client data or binaries in any public repository

---

## ENGAGEMENT METADATA

| Field | Value |
|---|---|
| **Client** | *(name / company)* |
| **Application audited** | *(name + version)* |
| **Artifact** | *(format: .deb / .zip / .asar / directory)* |
| **SHA-256 of artifact** | `________________` |
| **Verified against official hash** | ✅ Yes / ⬜ No / ⬜ Not available |
| **Received** | *(YYYY-MM-DD)* |
| **Delivered** | *(YYYY-MM-DD — max 48 h)* |
| **Analyst** | *(your brand / alias)* |
| **Scope agreed** | See [proforma](payment-proforma.md) |

---

## 1. EXECUTIVE SUMMARY

> *(Max 1 paragraph. Language for a **non-technical** reader. The client must understand the risk without knowing how to program.)*

**Overall status:** 🟢 No critical findings / 🟠 Medium risk / 🔴 High risk

**Findings in one line:**

- Total dependencies: **`____`**
- Dependencies with known CVE: **`____`**
- Stale dependencies (no maintainer): **`____`**
- Potential embedded secrets: **`____`**
- Exposed attack surfaces (IPC/config): **`____`**

**Primary recommendation:** *(1 actionable sentence)*

---

## 2. SBOM — Dependency tree

> *What your app **actually** ships inside.*

| Metric | Value | Evidence |
|---|---|---|
| Direct dependencies | `____` | `ev____` |
| Total dependencies (transitive) | `____` | `ev____` |
| Unique npm packages | `____` | `ev____` |
| Native addons (`.node`) | `____` | `ev____` |

### 2.1 Top dependencies by weight/presence

| Package | Version | Type | Notes |
|---|---|---|---|
| *(e.g. electron)* | *(xx)* | runtime | *(core)* |
| | | | |

### 2.2 Dependencies you didn't expect to find

> *(The part that surprises clients most: dragged-in dependencies they never used directly)*

| Package | Why it is there | Risk |
|---|---|---|
| | | |

---

## 3. RISK — Vulnerable or stale dependencies

> *Where the client's real fear lives (supply-chain: event-stream, polyfill).*

| # | Package | Version | Severity | CVE / Reason | Evidence |
|---|---|---|---|---|---|
| 1 | | | 🔴🟠🟡 | *(CVE-XXXX-XXXX / unmaintained / deprecated)* | `ev____` |

### 3.1 Risk context

> *(What it means in practice for THIS app. Don't list CVEs without explaining the impact.)*

### 3.2 Dependency chain (if applicable)

> *(If the risk arrives via a dependency of a dependency, show it.)*

```
app → dependency_a → dependency_b (vulnerable)
```

---

## 4. EXPOSURE — Electron security architecture

> *The 4 vectors that decide whether an Electron app is safe.*

| Vector | State | Risk | Evidence |
|---|---|---|---|
| `contextIsolation` | ✅ correct / 🔴 disabled | | `ev____` |
| `nodeIntegration` | ✅ disabled / 🔴 enabled | | `ev____` |
| `sandbox` | ✅ on / 🔴 off | | `ev____` |
| CSP (Content Security Policy) | ✅ strong / 🟠 weak / 🔴 absent | | `ev____` |

### 4.1 Exposed IPC channels

> *Every IPC channel is a door between the renderer (web) and the main process (system access).*

| IPC channel | Direction | Validation | Risk | Evidence |
|---|---|---|---|---|
| | | ✅ / 🔴 | | `ev____` |

### 4.2 Preload bridge

| Aspect | Value | Evidence |
|---|---|---|
| `contextBridge` exposed | *(which functions reach the renderer)* | `ev____` |

---

## 5. EMBEDDED SECRETS

> *API keys, tokens, or credentials left in the bundle.*

| # | Type | Location (path/symbol) | Real exposure | Evidence |
|---|---|---|---|---|
| 1 | *(API key / token / internal URL)* | *(file)* | *(public / internal / requires access)* | `ev____` |

> ⚠️ **Responsibility note:** this section reports **presence** of sensitive data,
> never its exploitation. Nothing is tested, extracted, or accessed.

---

## 6. LIMITS AND UNKNOWNS

> 🔴 **MANDATORY SECTION — your commercial differentiator.**
> *No due-diligence SaaS honestly declares what it could NOT learn.*

### 6.1 Limitations of the analysis

> *(Transcribe the `limitations` REA declares for this evidence. Example:)*

- *"The analysis is static: it does not run the app nor claim runtime behavior."*
- *"Only dependencies declared in the packaged manifest are observed."*
- *(add the real ones from your evidence)*

### 6.2 What could NOT be determined

| Question | Why it couldn't be answered | How it could be resolved |
|---|---|---|
| *(e.g. runtime behavior)* | *(requires execution)* | *(dynamic audit — higher package)* |

### 6.3 Assumptions of the analysis

- The delivered artifact **is** the deployed one
- The declared version matches the binary
- *(add the real ones)*

---

## 7. EVIDENCE

> *The cryptographic fingerprint behind every finding. This is what a third party can verify.*

| Operation | Evidence ID | Confidence | Coverage |
|---|---|---|---|
| *(JS analysis)* | `ev____` | *(derived/observed)* | *(complete-within-view / partial)* |
| *(native analysis)* | `ev____` | | |

### 7.1 Verified integrity

| Artifact | SHA-256 |
|---|---|
| *(main app)* | `____` |
| *(native binary)* | `____` |

### 7.2 Independent verification

> *How a third party can reproduce this analysis:*
> `rea analyze-javascript-application <artifact> --json`
> *(exact command + REA version)*

---

## 8. PRIORITIZED RECOMMENDATIONS

| Priority | Finding | Recommended action | Effort |
|---|---|---|---|
| 🔴 **P0** | *(critical)* | *(concrete action)* | Low/Medium/High |
| 🟠 P1 | *(medium)* | | |
| 🟡 P2 | *(low / improvement)* | | |

> **Rule:** we only give **recommendations**, we do not execute changes. Guided
> remediation is the Standard package (600 USDT).

---

## CLOSING

> *This report was produced by static analysis of the artifact provided.*
> *Sections §6 and §7 explicitly document scope and limits.*
> *All analysis runs on controlled infrastructure; the client's artifact is never uploaded to third-party services.*

**Suggested next step:** *(contract a Standard audit / guided remediation — see [proforma](payment-proforma.md))*

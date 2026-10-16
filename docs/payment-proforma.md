# PAYMENT PROFORMA — Dependency & risk audit

> **Version:** 1.0 · **Currency:** USDT **TRC-20** network · **Linked to:** [authorization](engagement-authorization.md) · [report template](report-template.md)

---

## Transaction details

| Field | Value |
|---|---|
| **Proforma No.** | `____-001` |
| **Issue date** | *(YYYY-MM-DD)* |
| **Valid for** | 7 days |
| **Client** | *(name / company)* |
| **Contact** | *(email / telegram)* |
| **Artifact to analyze** | *(app + version)* |

---

## Service scope

**Service:** *"Dependency & risk report for your Electron/JS app"*

| Deliverable | Detail |
|---|---|
| **1. SBOM** | Complete dependency tree (direct + transitive) |
| **2. Risk** | Vulnerable (CVE) or stale dependencies |
| **3. Exposure** | Electron vectors: `contextIsolation`, `nodeIntegration`, `sandbox`, CSP, IPC channels |
| **4. Secrets** | Presence of potentially sensitive embedded data |
| **5. Limits** | Mandatory section on what was **not** determined |
| **6. Evidence** | `evidence_id` verifiable by a third party |

---

## Included / Not included

### ✅ Included

- **Static** analysis of the delivered Artifact
- **48 hours** from receipt of the Artifact + acceptance of the [authorization](engagement-authorization.md) and of payment
- **1 round** of clarifications about the report (48 h after delivery)
- Report in Markdown / PDF format
- **100 % controlled analysis** — the Artifact is never uploaded to third-party services

### ❌ Not included

| Excluded | Package where it IS included |
|---|---|
| **Remediation** (applying the changes) | Standard (600 USDT) |
| Full **source-code review** | Standard / Pro |
| **Dynamic analysis** (running the app) | Pro (2,500 USDT) |
| **Native binary analysis** (Ghidra) | Pro / Enterprise (5,000–15,000) |
| **Infrastructure/server audit** | Enterprise |
| **Ongoing support / SLA** | Enterprise |

---

## Amount & payment

| Concept | Amount |
|---|---|
| Dependency & risk audit (**Entry** package) | **150 USDT** |
| **TOTAL** | **150 USDT** |

### Payment details (USDT — TRC-20 network)

| Field | Value |
|---|---|
| **Network** | ⚠️ **TRC-20 (Tron)** — verify before sending |
| **Address** | `T________________________` |
| **Token** | USDT |
| **Required confirmations** | *(e.g. 19 — Tron standard)* |

> ⚠️ **NOTICE:** payment must be made **exclusively on the TRC-20 network**.
> Sending via another network (ERC-20, BEP-20) may be **lost irreversibly**.
> The Client is responsible for verifying the network before sending.

### Conditions

| Concept | Condition |
|---|---|
| **When payment is due** | 100 % upfront, before analysis begins |
| **SLA starts** | Payment **AND** Artifact **AND** the accepted [authorization](engagement-authorization.md) are all received |
| **Delivery** | 48 h from start |
| **Currency** | Exclusively **USDT TRC-20**. No cards, bank transfers, or other cryptocurrencies |

---

## Workflow (what to expect)

```
① You accept this proforma + the authorization
        ↓
② You send 150 USDT (TRC-20) + the Artifact
        ↓
③ I confirm receipt with the verified transaction
        ↓
④ I run the static analysis (controlled, with evidence)
        ↓
⑤ You receive the report (≤48 h) + the evidence_ids
        ↓
⑥ 48 h of clarifications included
```

---

## Acceptance

| | Client | Analyst |
|---|---|---|
| **Accepts the proforma** | ⬜ | ⬜ |
| **Accepts the [authorization](engagement-authorization.md)** | ⬜ | ✅ |
| **Date** | *(…)* | *(…)* |

> **Valid electronic acceptance:** an email/message with
> *"I ACCEPT proforma 001 — <app> — 150 USDT"* constitutes acceptance.

---

*Per the published pricing ladder for this service (150 → 15,000 USDT).*

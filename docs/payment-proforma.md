# PAYMENT PROFORMA — Dependency & risk audit

> **Version:** 1.0 · **Currency:** USDT or USDC · **Networks:** TRC-20 / BEP-20 · **Linked to:** [authorization](engagement-authorization.md) · [report template](report-template.md)
>
> **Issued by:** Audit with Proof · florito64.1@gmail.com · https://albrth647-png.github.io/electron-security-audit/

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
| **Networks accepted** | **TRC-20 (Tron)** · **BEP-20 (BSC)** · **USDC** — same price, use whichever you already hold |
| **Address** | `T________________________` |
| **Token** | USDT (TRC-20 / BEP-20) or USDC |
| **Required confirmations** | *(e.g. 19 — Tron standard)* |

**No USDT yet?** Three steps, about 10 minutes: (1) open an account at any major exchange
and complete the identity check; (2) buy **150 USDT** with your card — minimums are usually
10 USDT and the fee is around 1 %; (3) send it to the address above **on the network you
picked**. We confirm it on-chain and the 48-hour clock starts. Ask us if you need a
network that is not listed.

> ⚠️ **NOTICE:** payment must be made **exclusively on the TRC-20 network**.
> Sending via another network (ERC-20, BEP-20) may be **lost irreversibly**.
> The Client is responsible for verifying the network before sending.

### Conditions

| Concept | Condition |
|---|---|
| **When payment is due** | 100 % upfront, before analysis begins |
| **SLA starts** | Payment **AND** Artifact **AND** the accepted [authorization](engagement-authorization.md) are all received |
| **Delivery** | 48 h from start |
| **Currency** | **USDT or USDC only** (TRC-20 or BEP-20). No cards, bank transfers, or other cryptocurrencies |

### Our three guarantees

| # | Guarantee | What it means |
|---|---|---|
| 1 | **Deadline** | If the report is not delivered within **48 h** of the start, you get **100 % back** — no questions asked. |
| 2 | **Accuracy** | If a finding is **contradicted by the source**, we re-render it at no charge or credit you **100 %** of the fee. Our evidence IDs make that checkable: recompute them, and anything that does not reproduce is on us. |
| 3 | **Privacy** | The artifact is analysed **statically and read-only**, on a private runner (ours or yours) — never executed, never uploaded to a third-party service. It is deleted after delivery unless you ask us to keep it. |

> Guarantee 2 is the one we can give because of how we work: every finding carries a
> cryptographic `evidence_id`. You do not have to trust the report — you can recompute it.

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

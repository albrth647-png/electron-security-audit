# ANALYSIS & CONFIDENTIALITY AUTHORIZATION

> **Version:** 1.0 · **Legal frame:** [REA DISCLAIMER](https://github.com/rea-agent/rea/blob/main/DISCLAIMER.md) · **Linked to:** [proforma](payment-proforma.md) · [report template](report-template.md)

---

## 1. Parties

| | Client | Analyst |
|---|---|---|
| **Name** | *(…)* | *(your brand / alias)* |
| **Contact** | *(…)* | *(…)* |
| **Payment wallet (USDT or USDC, TRC-20 / BEP-20)** | *(the network and token used to pay)* | *(your receiving wallet)* |

---

## 2. Purpose

The **Client** authorizes the **Analyst** to perform a **static** analysis of the software artifact specified in the [proforma](payment-proforma.md) (hereinafter, **the Artifact**), for the purposes of:

- Inventorying dependencies (SBOM)
- Identifying known risks and exposure surfaces
- Detecting the presence of potentially sensitive embedded data
- Producing a verifiable report

---

## 3. Permitted scope

### ✅ The Analyst WILL

- **Static** analysis (reading code/binary **without executing it**)
- Integrity hash computation (SHA-256)
- Extraction of metadata, dependencies, and configuration
- Documentation of limits and unknowns
- Generation of verifiable evidence (`evidence_id`)

### ❌ The Analyst will NOT

| Prohibited | Reason |
|---|---|
| **Execute** the Artifact | The analysis is static |
| **Circumvent DRM, anti-cheat, or license protection** | Explicit red line of the REA DISCLAIMER |
| **Test exploitation** of vulnerabilities | Out of scope |
| **Extract credentials** or user data | Out of scope |
| **Modify** the Artifact | Read-only |
| **Redistribute** the Artifact or its contents | Client property |

> ⚠️ If, during the analysis, the Artifact is found to incorporate **DRM, copy
> protection, or license protection**, the Analyst will **stop** that portion of
> the analysis and declare it in the report (§6).

---

## 4. Confidentiality

| Commitment | Detail |
|---|---|
| **100 % controlled analysis** | The Artifact is processed on the Analyst's device or on a Client-owned, Client-controlled runner. **Never uploaded to third-party services, clouds, or APIs.** |
| **No persistent storage** | After report delivery, the Artifact is deleted unless the Client consents in writing to retention |
| **Report is Client property** | The generated report belongs to the Client. It is not published or shown without written authorization |
| **No marketing use** | Findings and the Client's name are never used as a case study without prior written permission |
| **Evidence** | The `evidence_id` values are delivered to the Client; they reveal no content — only verifiable fingerprints |

---

## 5. Client declarations

The Client declares that:

1. They **own** the Artifact **or** hold written authorization from its owner for its analysis
2. The Artifact **does not include** DRM, anti-cheat, or third-party license-protection measures
3. They are **not requesting** the circumvention of any technical protection
4. The purpose of the analysis is **security/dependency audit**, not software reproduction

---

## 6. Intellectual property

| Element | Ownership |
|---|---|
| The Artifact | **Client** (or its licensee) |
| The delivered report | **Client** |
| The Analyst's methodology and tools | **Analyst** |
| Claims derived from the evidence | Shared per §4 |

> This analysis does **not** create a derivative work of the Artifact. The report
> is a **description of findings**, not a reproduction of the software.

---

## 7. Limitation of liability

- The analysis is **static and bounded** — see §6 of the report (Limits and Unknowns)
- It **does not guarantee** the absence of vulnerabilities nor absolute security
- It **does not constitute** legal advice nor regulatory compliance
- The Analyst is **not responsible** for decisions the Client takes based on the report

---

## 8. Signature / Acceptance

| | Client | Analyst |
|---|---|---|
| **Accepts the terms** | ⬜ | ⬜ |
| **Date** | *(…)* | *(…)* |
| **Medium** | *(email / signed message)* | *(…)* |

> **Valid electronic acceptance:** an email or message with the subject
> *"I ACCEPT the analysis authorization <app> <date>"* naming the Artifact
> constitutes acceptance of this document.

---

*Living document. Derived from the REA DISCLAIMER.*

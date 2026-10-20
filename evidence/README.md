# Evidence — what is here and how to check it

> This folder holds the **verifiable core** of the audit: the evidence documents
> behind the numbers, and the script that recomputes their identifiers.
> Nothing here needs our tooling: **plain Node, no dependencies.**

---

## 1. What an `evidence_id` is

Every observation carries an identifier like `ev_9ec17cfc…`. It is **not** an
invented label: it is a cryptographic digest of the evidence itself.

```
evidence_id = "ev_" + sha256( canonicalJson( semanticProjection(evidence) ) )
```

| Parte | Qué es |
|---|---|
| `semanticProjection` | The identity-bearing subset of the document: `subject` (digest, format, architecture) · `provider` · `analysis_profile` · `predicate_type` · `operation` · `parameters` · `raw_result` · `normalized_result` · `confidence` · `authority` · `environment` · `limitations` · `relationship_coverage` · `locations` · `evidence_links` |
| `canonicalJson` | Deterministic JSON: keys sorted, `undefined`/symbols dropped, same escaping as `JSON.stringify` |
| `sha256` | Standard SHA-256 over those bytes |

The same document always produces the same id, and a different document never
collides with it.

---

## 2. How to recompute it (3 commands)

```bash
# 1. get the raw evidence documents
git clone https://github.com/albrth647-png/electron-security-audit.git
cd electron-security-audit

# 2. check the bytes of the raw documents (SHA-256 of the .gz)
cd evidence/raw && sha256sum -c MANIFEST.raw.sha256 && cd ../..

# 3. recompute the ids (no dependencies, no install)
node evidence/verify-evidence.mjs evidence/raw/*.gz   # gunzip first if needed
```

Expected output (verified on 2026-10-20):

```
COINCIDE  evidencia-nativa.json
   declarado: ev_9ec17cfca1a869df4352fd6e5db03285c014f0efc2024a30ec924c337c7a22f0
   calculado: ev_9ec17cfca1a869df4352fd6e5db03285c014f0efc2024a30ec924c337c7a22f0
```

---

## 3. Files in this folder

| Fichero | Qué es |
|---|---|
| `verify-evidence.mjs` | The recomputation script (plain Node, no dependencies). |
| `evidence-summary.json` | Index of the three analysis executions (runs, scope, result, `evidence_id`). |
| `evidence-run1-asar.json` | Compact extract of the **asar** analysis (run 1). Compact = node/edge arrays omitted for size. |
| `evidence-run2-main.json` | Compact extract of the **main process** analysis (run 2). |
| `evidence-native-ghidra.json` | The **native** analysis evidence (Ghidra, run 3) — published in full. |
| `raw/` | The **raw** evidence documents (gzipped) for the runs whose document survived, plus `MANIFEST.raw.sha256`. |
| `package-drawio-32.4.1.json`, `run2-job-summary.json` | The analysed package manifest and the job summary of run 2. |

---

## 4. What is verifiable, and how (honest status)

| `evidence_id` | Run | ¿Se puede recomputar? | Cómo |
|---|---|---|---|
| `ev_9ec17cfc…` | 3 — native (Ghidra) | ✅ **sí**, desde el documento crudo | `node evidence/verify-evidence.mjs evidence/raw/…nativa.json.gz` |
| `ev_f0e4202c…` | 2 — main process | ✅ **sí**, desde el documento crudo | ídem |
| `ev_a94efae8…` | 1 — asar completo | ⚠️ **el documento crudo no se conserva**: aquel run terminó en error (límite de 300 s) y lo que hay en el artifact es el documento de error (137 MB) | **re-ejecutando el pipeline público** (`rea-audit.yml`, artefactos de los runs enlazados arriba) |

The compact extracts in this folder (`evidence-run*.json`) are **summaries**:
the node/edge arrays were omitted for size, so their `evidence_id` cannot be
recomputed from the extract itself — that is what `raw/` and the public runs are
for. We would rather say that plainly than publish an identifier that nobody
can check.

---

## 5. Reproducing the whole audit

The pipeline is public and free: [`rea-audit.yml`](https://github.com/albrth647-png/Ghidra/actions)
in `albrth647-png/Ghidra`. Given the same artifact and the same tool version, it
produces the same `evidence_id`s. The artifact itself is pinned by its SHA-256,
checked against the **publisher's own** hash file
(`Files-SHA256-Hashes.txt` of the upstream release) — not against ours.

---

*Verified 2026-10-20 with `evidence/verify-evidence.mjs`.*

#!/usr/bin/env node
/**
 * verify-evidence.mjs — recomputa el `evidence_id` de un documento de evidencia.
 *
 * 🛡️ POR QUÉ EXISTE: cada observación de esta auditoría lleva un `evidence_id`
 * (p. ej. `ev_9ec17cfc…`). Ese identificador NO es un invento: es el SHA-256 de
 * la **proyección semántica canónica** del documento de evidencia, tal y como la
 * calcula el motor REA. Este script reimplementa ese cálculo **sin dependencias**
 * para que cualquier tercero pueda comprobarlo contra los documentos crudos
 * publicados en `evidence/raw/`.
 *
 *   evidence_id = "ev_" + sha256( canonicalJson( semanticProjection(evidence) ) )
 *
 *   semanticProjection  → subject(digest,format,architecture) · provider ·
 *                          analysis_profile · predicate_type · operation ·
 *                          parameters · raw_result · normalized_result ·
 *                          confidence · authority · environment · limitations ·
 *                          relationship_coverage · locations · evidence_links
 *
 *   canonicalJson       → claves ordenadas, sin undefined/symbol, mismos escapes
 *                          que JSON.stringify (implementación del motor REA)
 *
 * Uso:
 *   node evidence/verify-evidence.mjs evidence/raw/evidencia-nativa.json
 *   node evidence/verify-evidence.mjs evidence/raw/*.json
 *   node evidence/verify-evidence.mjs --manifest evidence/raw/MANIFEST.raw.sha256
 *
 * Salida: una línea por documento con VEREDICTO: COINCIDE / NO COINCIDE.
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { basename } from 'node:path'

/** JSON canónico (mismas reglas que el motor REA: claves ordenadas, sin undefined). */
function canonicalJson(value) {
  const out = []
  const emit = (s) => out.push(s)
  const ancestors = new Set()

  const walk = (v) => {
    if (typeof v === 'number' && !Number.isFinite(v)) {
      throw new Error(Number.isNaN(v) ? 'NaN is not allowed' : 'Infinity is not allowed')
    }
    if (v === null || typeof v !== 'object') {
      const encoded = JSON.stringify(v)
      if (encoded === undefined) return false
      emit(encoded)
      return true
    }
    if (ancestors.has(v)) throw new Error('Circular reference detected')
    ancestors.add(v)
    try {
      if (typeof v.toJSON === 'function') return walk(v.toJSON())
      if (Array.isArray(v)) {
        emit('[')
        for (let i = 0; i < v.length; i++) {
          if (i > 0) emit(',')
          if (!(i in v)) continue
          const item = v[i]
          walk(item === undefined || typeof item === 'symbol' ? null : item)
        }
        emit(']')
      } else {
        emit('{')
        let first = true
        for (const key of Object.keys(v).sort()) {
          const item = v[key]
          if (item === undefined || typeof item === 'symbol') continue
          if (!first) emit(',')
          first = false
          emit(JSON.stringify(key))
          emit(':')
          if (!walk(item)) emit('undefined')
        }
        emit('}')
      }
      return true
    } finally {
      ancestors.delete(v)
    }
  }

  walk(value)
  return out.join('')
}

/** Proyección semántica del documento de evidencia (la que entra en el digest). */
export function semanticProjection(e) {
  return {
    subject:
      e.subject === null
        ? null
        : { digest: e.subject.digest, format: e.subject.format, architecture: e.subject.architecture },
    provider: e.provider,
    analysis_profile: e.analysis_profile,
    predicate_type: e.predicate_type,
    operation: e.operation,
    parameters: e.parameters,
    raw_result: e.raw_result,
    normalized_result: e.normalized_result,
    confidence: e.confidence,
    authority: e.authority,
    environment: e.environment,
    limitations: e.limitations,
    ...e.relationship_coverage === null ? {} : { relationship_coverage: e.relationship_coverage },
    locations: e.locations,
    evidence_links: e.evidence_links,
  }
}

/** evidence_id de un documento de evidencia. */
export function evidenceId(evidence) {
  const canonical = canonicalJson(semanticProjection(evidence))
  return 'ev_' + createHash('sha256').update(canonical).digest('hex')
}

function main() {
  const args = process.argv.slice(2)
  if (!args.length) {
    console.log('uso: node evidence/verify-evidence.mjs <documento.json> [...]')
    process.exit(2)
  }
  let fallos = 0
  for (const file of args) {
    if (file === '--manifest') continue
    let evidence
    try {
      evidence = JSON.parse(readFileSync(file, 'utf8'))
    } catch (e) {
      console.log(`ERROR      ${basename(file)} — no se pudo leer: ${e.message}`)
      fallos++
      continue
    }
    if (!evidence.evidence_id || evidence.subject === undefined) {
      console.log(`NO ES EVIDENCIA  ${basename(file)}  (sin evidence_id/subject: documento de error o resumen)`)
      continue
    }
    const declarado = evidence.evidence_id
    const calculado = evidenceId(evidence)
    const ok = declarado === calculado
    if (!ok) fallos++
    console.log(`${ok ? 'COINCIDE' : 'NO COINCIDE'}  ${basename(file)}`)
    console.log(`   declarado: ${declarado}`)
    console.log(`   calculado: ${calculado}`)
  }
  console.log()
  console.log(fallos === 0 ? '✅ Todos los evidence_id recomputan.' : `❌ ${fallos} no coinciden.`)
  process.exit(fallos === 0 ? 0 : 1)
}

if (import.meta.url === `file://${process.argv[1]}`) main()

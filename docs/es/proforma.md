# PROFORMA DE PAGO — Auditoría de dependencias y riesgo

> **Versión:** 1.0 · **Moneda:** USDT red **TRC-20** · **Vinculado a:** [autorización](autorizacion.md) · [plantilla de informe](plantilla-informe.md)

---

## Datos de la operación

| Campo | Valor |
|---|---|
| **Proforma N.º** | `____-001` |
| **Fecha de emisión** | *(AAAA-MM-DD)* |
| **Válida por** | 7 días |
| **Cliente** | *(nombre / empresa)* |
| **Contacto** | *(email / telegram)* |
| **Artefacto a analizar** | *(app + versión)* |

---

## Alcance del servicio

**Servicio:** *"Informe de dependencias y riesgo de tu app Electron/JS"*

| Entregable | Detalle |
|---|---|
| **1. SBOM** | Árbol de dependencias completo (directas + transitivas) |
| **2. Riesgo** | Dependencias vulnerables (CVEs) u obsoletas |
| **3. Exposición** | Vectores Electron: `contextIsolation`, `nodeIntegration`, `sandbox`, CSP, canales IPC |
| **4. Secretos** | Presencia de datos potencialmente sensibles embebidos |
| **5. Límites** | Sección obligatoria de lo **no** determinado |
| **6. Evidencia** | `evidence_id` verificable por un tercero |

---

## Incluido / No incluido

### ✅ Incluido

- Análisis **estático** del Artefacto entregado
- **48 horas** desde la recepción del Artefacto + aceptación de [autorización](autorizacion.md) y del pago
- **1 ronda** de aclaraciones sobre el informe (48 h posteriores a la entrega)
- Informe en formato Markdown / PDF
- Análisis **100 % local** — el Artefacto no se sube a ningún servicio externo

### ❌ No incluido

| Excluido | Paquete donde sí está |
|---|---|
| **Remediación** (aplicar los cambios) | Estándar (600 USDT) |
| **Revisión de código fuente** completo | Estándar / Pro |
| **Análisis dinámico** (ejecutar la app) | Pro (2.500 USDT) |
| **Análisis de binarios nativos** (Ghidra) | Pro / Empresa (5.000-15.000) |
| **Auditoría de infraestructura/servidor** | Empresa |
| **Soporte continuo / SLA** | Empresa |

---

## Importe y pago

| Concepto | Importe |
|---|---|
| Auditoría de dependencias y riesgo (paquete **Entrada**) | **150 USDT** |
| **TOTAL** | **150 USDT** |

### Datos de pago (USDT — red TRC-20)

| Campo | Valor |
|---|---|
| **Red** | ⚠️ **TRC-20 (Tron)** — verificar antes de enviar |
| **Dirección** | `T________________________` |
| **Token** | USDT |
| **Confirmaciones requeridas** | *(ej. 19 — estándar Tron)* |

> ⚠️ **AVISO:** el pago debe realizarse **exclusivamente en la red TRC-20**.
> Un envío por otra red (ERC-20, BEP-20) puede **perderse de forma irreversible**.
> El Cliente es responsable de verificar la red antes de enviar.

### Condiciones

| Concepto | Condición |
|---|---|
| **Momento del pago** | 100 % por adelantado, antes de iniciar el análisis |
| **Inicio del plazo** | Recibido el pago **Y** el Artefacto **Y** la [autorización](autorizacion.md) aceptada |
| **Plazo de entrega** | 48 h desde el inicio |
| **Divisa** | Exclusivamente **USDT TRC-20**. No se aceptan tarjetas, transferencias bancarias ni otras criptomonedas |

---

## Flujo de trabajo (qué esperar)

```
① Aceptas esta proforma + la autorización
        ↓
② Envías 150 USDT (TRC-20) + el Artefacto
        ↓
③ Te confirmo la recepción con la transacción verificada
        ↓
④ Ejecuto el análisis estático (local, con evidencia)
        ↓
⑤ Recibes el informe (≤48 h) + los evidence_id
        ↓
⑥ 48 h de aclaraciones incluidas
```

---

## Aceptación

| | Cliente | Analista |
|---|---|---|
| **Acepta la proforma** | ⬜ | ⬜ |
| **Acepta la [autorización](autorizacion.md)** | ⬜ | ✅ |
| **Fecha** | *(…)* | *(…)* |

> **Aceptación válida por medios electrónicos:** un email/mensaje con
> *"ACEPTO la proforma 001 — <app> — 150 USDT"* constituye aceptación.

---

*Según la escalera de precios publicada para este servicio (150 → 15.000 USDT).*

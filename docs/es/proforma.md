# PROFORMA DE PAGO — Auditoría de dependencias y riesgo

> **Versión:** 1.0 · **Moneda:** USDT o USDC · **Redes:** TRC-20 / BEP-20 · **Vinculado a:** [autorización](autorizacion.md) · [plantilla de informe](plantilla-informe.md)
>
> **Emitida por:** Audit with Proof · florito64.1@gmail.com · https://albrth647-png.github.io/electron-security-audit/

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
- Análisis **100 % controlado** — el Artefacto no se sube a ningún SaaS de terceros

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

### Datos de pago (USDT o USDC — TRC-20 / BEP-20)

| Campo | Valor |
|---|---|
| **Redes aceptadas** | **TRC-20 (Tron)** · **BEP-20 (BSC)** · **USDC** — el mismo precio, usa la que ya tengas |
| **Dirección** | `T________________________` |
| **Token** | USDT (TRC-20 / BEP-20) o USDC |
| **Confirmaciones requeridas** | *(ej. 19 — estándar Tron)* |

**¿Aún no tienes USDT?** Tres pasos, unos 10 minutos: (1) abre una cuenta en cualquier
exchange grande y completa la verificación de identidad; (2) compra **150 USDT** con tu
tarjeta — el mínimo suele ser 10 USDT y la comisión ronda el 1 %; (3) envíalos a la
dirección de arriba **en la red que elijas**. Confirmamos la recepción on-chain y empieza
el reloj de 48 horas. Pregúntanos si necesitas una red que no esté en la lista.

> ⚠️ **AVISO:** paga en **una de las redes aceptadas** (TRC-20 o BEP-20) con el token
> acordado (USDT o USDC). Un envío por una red que no aceptamos (p. ej. ERC-20) puede
> **perderse de forma irreversible**.
> El Cliente es responsable de verificar la red antes de enviar.

### Condiciones

| Concepto | Condición |
|---|---|
| **Momento del pago** | 100 % por adelantado, antes de iniciar el análisis |
| **Inicio del plazo** | Recibido el pago **Y** el Artefacto **Y** la [autorización](autorizacion.md) aceptada |
| **Plazo de entrega** | 48 h desde el inicio |
| **Divisa** | Solo **USDT o USDC** (TRC-20 o BEP-20). No se aceptan tarjetas, transferencias bancarias ni otras criptomonedas |

### Nuestras tres garantías

| # | Garantía | Qué significa |
|---|---|---|
| 1 | **De plazo** | Si el informe no se entrega en **48 h** desde el inicio, te devolvemos **el 100 %**, sin preguntas. |
| 2 | **De exactitud** | Si un hallazgo se **contradice con el código**, lo rehacemos sin coste o te acreditamos el **100 %** del honorario. Nuestros evidence_id lo hacen comprobable: recomputa y lo que no se reproduce es responsabilidad nuestra. |
| 3 | **De privacidad** | El artefacto se analiza **de forma estática y solo lectura**, en un runner privado (el nuestro o el tuyo) — nunca se ejecuta, nunca se sube a un servicio de terceros. Se borra tras la entrega salvo que nos pidas conservarlo. |

> La garantía 2 solo podemos darla nosotros por cómo trabajamos: cada hallazgo lleva un
> `evidence_id` criptográfico. No tienes que creerte el informe: puedes recomputarlo.

---

## Flujo de trabajo (qué esperar)

```
① Aceptas esta proforma + la autorización
        ↓
② Envías 150 USDT o USDC (TRC-20 o BEP-20) + el Artefacto
        ↓
③ Te confirmo la recepción con la transacción verificada
        ↓
④ Ejecuto el análisis estático (controlado, con evidencia)
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

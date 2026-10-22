# PLANTILLA DE INFORME — Auditoría de dependencias y riesgo

> **Versión:** 1.0 · **Paquete:** Entrada (150 USDT) · **Plazo:** 48 h
> **Motor:** REA + Ghidra · **Cobro:** USDT o USDC (TRC-20 / BEP-20)
> **Documentos enlazados:** [proforma](proforma.md) · [autorización](autorizacion.md) · [informe muestra](informe-muestra.md)

---

## Cómo usar esta plantilla

1. **Duplica** este fichero como `informe-<app>-<fecha>.md`
2. **Rellena** cada sección con hallazgos **reales** — nunca inventes
3. **Cada afirmación** de hallazgo debe llevar su `evidence_id` (§7)
4. **La sección §6 (Límites) es obligatoria** — es tu diferenciador de venta
5. **No incluyas** datos del cliente ni binarios en ningún repositorio público

---

## METADATOS DEL ENCARGO

| Campo | Valor |
|---|---|
| **Cliente** | *(nombre / empresa)* |
| **App auditada** | *(nombre + versión)* |
| **Artefacto** | *(formato: .deb / .zip / .asar / directorio)* |
| **SHA-256 del artefacto** | `________________` |
| **Verificado contra hash oficial** | ✅ Sí / ⬜ No / ⬜ No disponible |
| **Fecha de recepción** | *(AAAA-MM-DD)* |
| **Fecha de entrega** | *(AAAA-MM-DD — máx 48 h)* |
| **Analista** | *(tu marca / alias)* |
| **Alcance acordado** | Ver [proforma](proforma.md) |

---

## 1. RESUMEN EJECUTIVO

> *(Máx 1 párrafo. Lenguaje para un **no técnico**. El cliente debe entender el riesgo sin saber programar.)*

**Estado global:** 🟢 Sin hallazgos críticos / 🟠 Riesgo medio / 🔴 Riesgo alto

**Hallazgos en una línea:**

- Dependencias totales: **`____`**
- Dependencias con CVE conocido: **`____`**
- Dependencias obsoletas (sin mainten): **`____`**
- Secretos potenciales embebidos: **`____`**
- Superficies de ataque expuestas (IPC/config): **`____`**

**Recomendación principal:** *(1 frase accionable)*

---

## 2. SBOM — Árbol de dependencias

> *Lo que tu app **realmente** lleva dentro.*

| Métrica | Valor | Evidence |
|---|---|---|
| Dependencias directas | `____` | `ev____` |
| Dependencias totales (transitivas) | `____` | `ev____` |
| Paquetes npm únicos | `____` | `ev____` |
| Addons nativos (`.node`) | `____` | `ev____` |

### 2.1 Top de dependencias por peso/presencia

| Paquete | Versión | Tipo | Notas |
|---|---|---|---|
| *(ej. electron)* | *(xx)* | runtime | *(núcleo)* |
| | | | |

### 2.2 Dependencias que no esperabas encontrar

> *(La parte que más sorprende al cliente: dependencias arrastradas que no usó directamente)*

| Paquete | Por qué está ahí | Riesgo |
|---|---|---|
| | | |

---

## 3. RIESGO — Dependencias vulnerables u obsoletas

> *Aquí está el miedo real del cliente (supply-chain: event-stream, polyfill).*

| # | Paquete | Versión | Severidad | CVE / Motivo | Evidence |
|---|---|---|---|---|---|
| 1 | | | 🔴🟠🟡 | *(CVE-XXXX-XXXX / sin mainten / deprecado)* | `ev____` |

### 3.1 Contexto del riesgo

> *(Qué significa en la práctica para ESTA app. No listes CVEs sin explicar el impacto.)*

### 3.2 Cadena de dependencia (si aplica)

> *(Si el riesgo llega vía una dependencia de otra dependencia, muéstrala.)*

```
app → dependencia_a → dependencia_b (vulnerable)
```

---

## 4. EXPOSICIÓN — Arquitectura de seguridad (Electron)

> *Los 4 vectores que definen si una app Electron es segura o no.*

| Vector | Estado | Riesgo | Evidence |
|---|---|---|---|
| `contextIsolation` | ✅ correcto / 🔴 desactivado | | `ev____` |
| `nodeIntegration` | ✅ desactivado / 🔴 activado | | `ev____` |
| `sandbox` | ✅ activo / 🔴 inactivo | | `ev____` |
| CSP (Content Security Policy) | ✅ fuerte / 🟠 débil / 🔴 ausente | | `ev____` |

### 4.1 Canales IPC expuestos

> *Cada canal IPC es una puerta entre el renderer (web) y el proceso main (con acceso al sistema).*

| Canal IPC | Dirección | Validación | Riesgo | Evidence |
|---|---|---|---|---|
| | | ✅ / 🔴 | | `ev____` |

### 4.2 Puente preload

| Aspecto | Valor | Evidence |
|---|---|---|
| `contextBridge` expuesto | *(qué funciones llegan al renderer)* | `ev____` |

---

## 5. SECRETOS EMBEBIDOS

> *API keys, tokens o credenciales olvidadas en el bundle.*

| # | Tipo | Ubicación (ruta/símbolo) | Exposición real | Evidence |
|---|---|---|---|---|
| 1 | *(API key / token / URL interna)* | *(archivo)* | *(pública / interna / requiere acceso)* | `ev____` |

> ⚠️ **Nota de responsabilidad:** este apartado reporta **presencia** de datos sensibles,
> no su explotación. No se prueba, no se extrae, no se ejecuta ningún acceso.

---

## 6. LÍMITES Y DESCONOCIDOS

> 🔴 **SECCIÓN OBLIGATORIA — tu diferenciador de venta.**
> *Ninguna SaaS de due diligence declara honestamente lo que NO pudo saber.*

### 6.1 Limitaciones del análisis

> *(Transcribir las `limitations` que REA declara para esta evidencia. Ejemplo:)*

- *"El análisis es estático: no ejecuta la app ni afirma su comportamiento en runtime."*
- *"Solo se observan las dependencias declaradas en el manifiesto empaquetado."*
- *(añadir las reales de tu evidencia)*

### 6.2 Lo que NO se pudo determinar

| Pregunta | Por qué no se pudo responder | Cómo se podría resolver |
|---|---|---|
| *(ej. comportamiento en runtime)* | *(requiere ejecución)* | *(auditoría dinámica — paquete mayor)* |

### 6.3 Supuestos del análisis

- Se asume que el artefacto entregado es **el que se despliega**
- Se asume la versión declarada corresponde al binario
- *(añadir los reales)*

---

## 7. EVIDENCIA

> *La huella criptográfica detrás de cada hallazgo. Esto es lo que un tercero puede verificar.*

| Operación | Evidence ID | Confianza | Cobertura |
|---|---|---|---|
| *(análisis JS)* | `ev____` | *(derived/observed)* | *(complete-within-view / parcial)* |
| *(análisis nativo)* | `ev____` | | |

### 7.1 Integridad verificada

| Artefacto | SHA-256 |
|---|---|
| *(app principal)* | `____` |
| *(binario nativo)* | `____` |

### 7.2 Verificación independiente

> *Cómo un tercero puede reproducir este análisis:*
> `rea analyze-javascript-application <artefacto> --json`
> *(comando exacto + versión de REA)*

---

## 8. RECOMENDACIONES PRIORIZADAS

| Prioridad | Hallazgo | Acción recomendada | Esfuerzo |
|---|---|---|---|
| 🔴 **P0** | *(crítico)* | *(acción concreta)* | Bajo/Medio/Alto |
| 🟠 P1 | *(medio)* | | |
| 🟡 P2 | *(bajo / mejora)* | | |

> **Regla:** solo damos **recomendaciones**, no ejecutamos cambios. La remediación guiada
> es el paquete Estándar (600 USDT).

---

## CIERRE

> *Este informe fue generado con análisis estático sobre el artefacto proporcionado.*
> *Las secciones §6 y §7 documentan explícitamente el alcance y sus límites.*
> *Todo el análisis se realizó de forma estática y solo lectura, en un runner privado (el nuestro o el tuyo); el artefacto del cliente no fue subido a ningún SaaS de terceros.*

**Siguiente paso sugerido:** *(contratar auditoría Estándar / remediación guiada — ver [proforma](proforma.md))*

# AUTORIZACIÓN DE ANÁLISIS Y CONFIDENCIALIDAD

> **Versión:** 1.0 · **Marco legal:** [DISCLAIMER de REA](https://github.com/rea-agent/rea/blob/main/DISCLAIMER.md) · **Vinculado a:** [proforma](proforma.md) · [plantilla de informe](plantilla-informe.md)

---

## 1. Partes

| | Cliente | Analista |
|---|---|---|
| **Nombre** | *(…)* | *(tu marca / alias)* |
| **Contacto** | *(…)* | *(…)* |
| **Wallet de pago (USDT o USDC, TRC-20 / BEP-20)** | *(la red y el token que use para pagar)* | *(tu wallet de recepción)* |

---

## 2. Objeto

El **Cliente** autoriza al **Analista** a realizar un análisis **estático** del artefacto de software indicado en la [proforma](proforma.md) (en adelante, **el Artefacto**), con fines de:

- Inventariar dependencias (SBOM)
- Identificar riesgos conocidos y superficies de exposición
- Detectar la presencia de datos potencialmente sensibles embebidos
- Generar un informe verificable

---

## 3. Alcance permitido

### ✅ El Analista SÍ hará

- Análisis **estático** (lectura del código/binario **sin ejecutarlo**)
- Cálculo de hashes (SHA-256) de integridad
- Extracción de metadatos, dependencias y configuración
- Documentación de límites y desconocidos
- Generación de evidencia verificable (`evidence_id`)

### ❌ El Analista NO hará

| Prohibido | Motivo |
|---|---|
| **Ejecutar** el Artefacto | El análisis es estático |
| **Circumvenir DRM, anti-cheat o protección de licencia** | Línea roja explícita del DISCLAIMER de REA |
| **Probar explotación** de vulnerabilidades | Fuera de alcance |
| **Extraer credenciales** o datos de usuarios | Fuera de alcance |
| **Modificar** el Artefacto | Solo lectura |
| **Redistribuir** el Artefacto ni su contenido | Propiedad del Cliente |

> ⚠️ Si en el curso del análisis se detectara que el Artefacto incorpora **DRM, medidas
> anti-copia o protección de licencia**, el Analista **detendrá** el análisis de esa parte
> y lo declarará en el informe (§6).

---

## 4. Confidencialidad

| Compromiso | Detalle |
|---|---|
| **Análisis 100 % controlado** | El Artefacto se procesa en el dispositivo del Analista o en un runner propio y controlado por el Cliente. **Nunca se sube a servicios externos, nubes ni APIs de terceros.** |
| **No almacenamiento persistente** | Tras la entrega del informe, el Artefacto se elimina, salvo consentimiento escrito del Cliente para conservarlo |
| **Informe de propiedad del Cliente** | El informe generado es del Cliente. No se publica ni se muestra sin autorización escrita |
| **Sin uso en marketing** | No se usan los hallazgos ni el nombre del Cliente como caso de éxito sin permiso previo por escrito |
| **Evidencia** | Los `evidence_id` se entregan al Cliente; no revelan contenido, solo huellas verificables |

---

## 5. Declaraciones del Cliente

El Cliente declara que:

1. **Es titular** del Artefacto **o** tiene autorización escrita de su titular para su análisis
2. El Artefacto **no incluye** DRM, anti-cheat ni medidas de protección de licencia de terceros
3. **No solicita** circunninguir ninguna protección técnica
4. La finalidad del análisis es la **auditoría de seguridad/dependencias**, no la reproducción del software

---

## 6. Propiedad intelectual

| Elemento | Titularidad |
|---|---|
| El Artefacto | **Cliente** (o su licenciatario) |
| El informe entregado | **Cliente** |
| La metodología y herramientas del Analista | **Analista** |
| Las afirmaciones derivadas de la evidencia | Compartidas según §4 |

> Este análisis **no** implica creación de un trabajo derivado del Artefacto. El informe
> es una **descripción de hallazgos**, no una reproducción del software.

---

## 7. Limitación de responsabilidad

- El análisis es **estático y acotado** — ver §6 del informe (Límites y Desconocidos)
- **No garantiza** la ausencia de vulnerabilidades ni seguridad absoluta
- **No constituye** asesoramiento legal ni cumplimiento normativo
- El Analista **no es responsable** de decisiones tomadas por el Cliente basadas en el informe

---

## 8. Firma / Aceptación

| | Cliente | Analista |
|---|---|---|
| **Acepta los términos** | ⬜ | ⬜ |
| **Fecha** | *(…)* | *(…)* |
| **Medio** | *(email / mensaje firmado)* | *(…)* |

> **Aceptación válida por medios electrónicos:** un email o mensaje con el asunto
> *"ACEPTO la autorización de análisis <app> <fecha>"* y el nombre del Artefacto
> constituye aceptación de este documento.

---

*Documento vivo. Derivado del DISCLAIMER de REA.*

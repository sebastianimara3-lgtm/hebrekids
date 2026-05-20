# HébreKids — Sistema de Banner Remoto
## Guía completa de instalación y uso

---

## PARTE 1: CONFIGURAR FIREBASE (una sola vez, 10 minutos)

### Paso 1 — Crear proyecto Firebase
1. Entrá a https://console.firebase.google.com
2. Clic en **"Crear un proyecto"**
3. Nombre: `hebrekids` → Siguiente → Crear proyecto

### Paso 2 — Activar Firestore
1. En el menú izquierdo: **Build → Firestore Database**
2. Clic en **"Create database"**
3. Elegí **"Start in test mode"** → Next → Enable

### Paso 3 — Crear el documento del banner
1. En Firestore, clic en **"+ Start collection"**
2. Collection ID: `config` → Next
3. Document ID: `banner`
4. Agregá estos campos (todos obligatorios):

| Campo | Tipo | Valor inicial |
|---|---|---|
| activo | boolean | false |
| tipo | string | "texto" |
| titulo | string | "" |
| mensaje | string | "" |
| emoji | string | "" |
| imagenUrl | string | "" |
| colorFondo | string | "#1a1060" |
| colorTexto | string | "#FFE566" |
| colorBoton | string | "#FFE566" |
| botonTexto | string | "" |
| botonUrl | string | "" |
| duracionSegundos | number | 0 |

5. Clic en **Save**

### Paso 4 — Obtener las credenciales
1. En Firebase: ⚙️ → **Project settings** → **General**
2. Bajás hasta "Your apps" → clic en **"</> Web"**
3. App nickname: `hebrekids-app` → Register app
4. Copiás el objeto `firebaseConfig` que aparece

### Paso 5 — Pegar las credenciales en la app
Abrís `src/services/banner.js` y reemplazás:
```js
const FIREBASE_CONFIG = {
  apiKey:            "TU_API_KEY",          // ← pegar
  authDomain:        "TU_PROYECTO...",       // ← pegar
  projectId:         "TU_PROYECTO_ID",      // ← pegar
  storageBucket:     "TU_PROYECTO...",       // ← pegar
  messagingSenderId: "TU_SENDER_ID",        // ← pegar
  appId:             "TU_APP_ID",           // ← pegar
};
```

### Paso 6 — Instalar Firebase en el proyecto
```bash
npm install firebase
```

---

## PARTE 2: USAR EL PANEL DE CONTROL

### Cómo mostrar un banner de texto con emoji

1. Entrá a https://console.firebase.google.com
2. Tu proyecto → **Firestore Database** → colección `config` → documento `banner`
3. Editá los campos:

```
activo          → true          (esto activa el banner)
tipo            → "texto"
titulo          → "🎉 ¡Novedad!"
mensaje         → "Nueva versión disponible con más niveles"
emoji           → "🚀"
colorFondo      → "#1a1060"
colorTexto      → "#FFE566"
botonTexto      → ""            (vacío = sin botón)
duracionSegundos → 0            (0 = el usuario lo cierra)
```

4. Guardás → en menos de 1 minuto aparece en TODOS los celulares

### Cómo mostrar un banner con imagen

```
activo          → true
tipo            → "imagen"
titulo          → "¡Nueva función!"
mensaje         → "Ahora con fonética para aprender mejor"
emoji           → ""            (vacío = sin emoji)
imagenUrl       → "https://tuservidor.com/imagen.png"
colorFondo      → "#2d1b8c"
colorTexto      → "#ffffff"
botonTexto      → "Ver más"
botonUrl        → "https://tusitio.com"
duracionSegundos → 8            (se cierra solo a los 8 segundos)
```

### Cómo apagar el banner

Solo cambiás:
```
activo → false
```

Listo. Desaparece de todos los celulares instantáneamente.

---

## PARTE 3: EJEMPLOS DE USO

### Avisar de una actualización
```
titulo   → "¡Actualización disponible! 🆕"
mensaje  → "Descargá la nueva versión con más letras y juegos"
emoji    → "📲"
botonTexto → "Actualizar"
botonUrl   → "https://play.google.com/store/apps/details?id=com.doctorimara.hebrekids"
```

### Feriado / día especial
```
titulo   → "¡Feliz Rosh Hashaná! 🍎🍯"
mensaje  → "Shanah Tovah — שָׁנָה טוֹבָה"
emoji    → "🎊"
colorFondo → "#8B0000"
colorTexto → "#FFD700"
botonTexto → ""
duracionSegundos → 5
```

### Anunciar nuevo nivel
```
titulo   → "¡Nivel 5 disponible! 🏆"
mensaje  → "Ya podés aprender vocabulario avanzado"
emoji    → "⭐"
colorFondo → "#3d0066"
colorTexto → "#FFE566"
```

### Mensaje de vacaciones
```
titulo   → "¡La app descansa! 😴"
mensaje  → "Volvemos el 1 de marzo con novedades"
emoji    → "🌴"
activo   → true
```

---

## COSTOS

| Servicio | Plan gratuito |
|---|---|
| Firebase Firestore | 50.000 lecturas/día gratis |
| Con 1.000 usuarios activos/día | ~1.000 lecturas/día → 100% gratis |
| Con 50.000 usuarios activos/día | al límite del plan gratis |
| Con más de 50.000 | ~$0.06 por cada 100.000 lecturas extra |

En la práctica, para una app educativa infantil, **siempre va a ser gratis**.

---

## NOTAS TÉCNICAS

- Si el celular no tiene internet al abrir la app → el banner simplemente no aparece, la app funciona normal.
- El banner se muestra UNA VEZ por apertura de la app.
- Si `activo = false`, la app no hace ninguna consulta adicional.
- Los cambios en Firestore tardan entre 1 y 60 segundos en propagarse a todos los dispositivos.

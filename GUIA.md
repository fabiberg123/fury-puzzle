# Fury Puzzle — Guía rápida

## Qué hay en esta carpeta
- `game.html` — el juego (este es el archivo que se edita).
- `www/` — el juego preparado para la app (se genera solo con `build-www.sh`).
- `android/` — el proyecto de la app de Android.
- `.github/workflows/construir-apk.yml` — arma la APK automáticamente en GitHub.
- `art/` — ícono de 512 px y banner de 1024x500 para la ficha de Google Play.
- `politica-privacidad.html` — política de privacidad (pon tu correo donde dice [TU CORREO DE CONTACTO]).

## Conseguir la APK con GitHub (gratis)
1. Crea una cuenta en https://github.com
2. Crea un repositorio nuevo llamado `fury-puzzle` (puede ser privado).
3. Sube todo el contenido de esta carpeta (o pídele a Claude que lo haga).
4. Ve a la pestaña **Actions**: se ejecuta "Construir APK" (tarda unos 5 minutos).
5. Al terminar, abre la ejecución y descarga **FuryPuzzle-APK**. Dentro está `app-debug.apk`.
6. Pásala al celular e instálala (Android pedirá permitir "instalar apps desconocidas").

## Antes de publicar en Google Play
1. Crea tu cuenta en AdMob (https://admob.google.com), agrega la app "Fury Puzzle" y crea 3 bloques de anuncios: Banner, Intersticial y Bonificado.
2. Reemplaza los IDs de prueba:
   - En `game.html`: `AD_IDS` (los 3 bloques) y pon `AD_TESTING=false`.
   - En `android/app/src/main/AndroidManifest.xml`: el valor `APPLICATION_ID` (el ID de la app, con `~`).
3. Crea la llave de firma (Claude te ayuda) y guárdala en GitHub → Settings → Secrets: `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`. Con eso GitHub también arma el archivo **AAB** que pide Google Play.
4. Cuenta de Google Play Console (25 USD, una sola vez) → crea la app → prueba cerrada con 12 personas durante 14 días → solicita acceso a producción.

IMPORTANTE: nunca toques tus propios anuncios ni pidas a otros que lo hagan; Google puede cerrar la cuenta de AdMob.

## Ajustar premios y dificultad
En `game.html`, al principio del código, la sección **CONFIG: ECONOMÍA** controla:
monedas iniciales, precios de herramientas y temas, cuántas monedas da cada partida,
duración del Modo Furia y del x2, probabilidad de superpoderes y los premios del regalo diario.

## Música y sonidos
- 2 músicas propias del juego (generadas por el juego, sin derechos de autor).
- Cada jugador puede cargar sus MP3: 1 lugar gratis, los demás se compran (200, 300 ... 1000 monedas), hasta 10.
  Las canciones se guardan dentro del juego en ese celular (si se desinstala, se borran).
- 11 packs de sonido (Clásico + 10). Cada uno tiene botón "Escuchar". Se abren con su logro o con monedas (250 a 1150).
- Para cambiar logros o precios: busca PACK_ACH, PACK_PRICE y SLOT_PRICE en game.html.

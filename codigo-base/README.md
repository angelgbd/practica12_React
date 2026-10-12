# Código base · Práctica 12A — Hola React

Las piezas que **no** vale la pena teclear en clase. Cópialas cuando el maestro lo indique, en
este orden. La lógica de los componentes, `main.tsx` y `App.tsx` los escribimos juntos.

---

## 1 · Prueba de SWC · `prueba-swc/saludo.jsx`

```jsx
function Saludo({ nombre }) {
  return (
    <div className="tarjeta">
      <h1>Hola, {nombre}</h1>
      <p>Esto es JSX.</p>
    </div>
  );
}
```

## 2 · Prueba de SWC · `prueba-swc/.swcrc`

Le dice a SWC que el archivo trae JSX. Después cambiarás `"classic"` por `"automatic"`.

```json
{
  "jsc": {
    "target": "es2022",
    "parser": { "syntax": "ecmascript", "jsx": true },
    "transform": { "react": { "runtime": "classic" } }
  }
}
```

---

## 3 · Página · `index.html`

Reemplaza el `index.html` que trae Vite.

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hola React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## 4 · Estilos · `src/index.css`

Reemplaza el `src/index.css` que trae Vite.

```css
/* ==========================================================================
   index.css — los estilos de la Práctica 12A. Ya vienen hechos:
   reemplazan el index.css que genera Vite. CSS plano, una clase por pieza.
   ========================================================================== */

:root {
  --color-cian:   #00aeef;
  --color-azul:   #0066cc;
  --color-morado: #8c52ff;
  --color-verde:  #2e9e5b;
  --color-tinta:  #111827;
  --color-texto:  #374151;
  --color-tenue:  #6b7280;
  --color-linea:  #e5e7eb;
  --color-fondo:  #f7f8fc;
  font-family: "Barlow", "Segoe UI", system-ui, sans-serif;
  color: var(--color-texto);
  background: var(--color-fondo);
}

*, *::before, *::after { box-sizing: border-box; }

body { margin: 0; }

.pagina {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
}

/* <Saludo> */
.saludo h1 { margin: 0; font-size: 36px; color: var(--color-tinta); }
.saludo p  { margin: 6px 0 0; color: var(--color-tenue); }

/* La rejilla donde caen las tarjetas */
.equipo {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 32px;
}

/* <TarjetaPerfil> */
.tarjeta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px;
  background: #fff;
  border: 1px solid var(--color-linea);
  border-radius: 14px;
  text-align: center;
}

.tarjeta__avatar {
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--color-cian);
  color: #fff;
  font-size: 26px;
  font-weight: 700;
}

.tarjeta__nombre  { margin: 0; font-size: 20px; color: var(--color-tinta); }
.tarjeta__carrera { margin: 0; color: var(--color-tenue); }

/* <Insignia>: una etiqueta chica, con color según el tipo */
.insignia {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}

.insignia--info  { background: var(--color-azul); }
.insignia--exito { background: var(--color-verde); }
.insignia--extra { background: var(--color-morado); }
```

---

## 5 · `<Saludo>` · props y JSX

Van en `src/Saludo.tsx`. La interfaz arriba; el JSX dentro del `return ( ... )`.
Cambia `Ingeniería de Software` por `{nombre}`.

```tsx
interface SaludoProps {
  nombre: string;
}
```

```tsx
<header className="saludo">
  <h1>Hola, Ingeniería de Software</h1>
  <p>Mi primera aplicación en React.</p>
</header>
```

## 6 · `<Insignia>` · props y JSX

Van en `src/Insignia.tsx`.

```tsx
interface InsigniaProps {
  texto: string;
  tipo?: 'info' | 'exito' | 'extra';
}
```

Los textos son de ejemplo; cámbialos por las variables:

| Texto de ejemplo | Variable |
|---|---|
| `"insignia insignia--info"` | `` {`insignia insignia--${tipo}`} `` |
| `5.º semestre` | `{texto}` |

```tsx
<span className="insignia insignia--info">5.º semestre</span>
```

## 7 · `<TarjetaPerfil>` · props y JSX

Van en `src/TarjetaPerfil.tsx`.

```tsx
interface TarjetaPerfilProps {
  nombre: string;
  carrera: string;
  semestre: number;
}
```

Los textos son de ejemplo (Omar Valdez, 7.º semestre); cámbialos por las variables:

| Texto de ejemplo | Variable |
|---|---|
| `OV` | `{iniciales}` |
| `Omar Valdez` | `{nombre}` |
| `Ingeniería de Software` | `{carrera}` |
| `texto="7.º semestre"` | `` texto={`${semestre}.º semestre`} `` |
| La segunda `<Insignia>` | `{avanzado && <Insignia ... />}` (solo de 7.º en adelante) |

```tsx
<article className="tarjeta">
  <div className="tarjeta__avatar">OV</div>
  <h2 className="tarjeta__nombre">Omar Valdez</h2>
  <p className="tarjeta__carrera">Ingeniería de Software</p>
  <Insignia texto="7.º semestre" />
  <Insignia texto="Por egresar" tipo="extra" />
</article>
```

---

## 8 · Las tres tarjetas · van en `src/App.tsx`

Dentro de `<section className="equipo">`.

```tsx
<TarjetaPerfil nombre="Karla Duarte" carrera="Ingeniería de Software" semestre={5} />
<TarjetaPerfil nombre="Omar Valdez" carrera="Ingeniería de Software" semestre={7} />
<TarjetaPerfil nombre="Sofía Ibarra" carrera="Ingeniería en Sistemas" semestre={8} />
```

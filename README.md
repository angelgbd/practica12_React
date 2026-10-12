# Práctica 12A · JSX y primeros componentes React

Este repositorio contiene dos proyectos independientes y el material original del profesor en [`codigo-base/README.md`](codigo-base/README.md):

- `prueba-swc/`: compila el mismo componente con SWC sin configuración, con runtime clásico y con runtime automático.
- `hola-react/`: aplicación final con Vite, React y TypeScript.

## 1. Qué hace el compilador con JSX

En una terminal, entra a `prueba-swc/`, instala las dependencias y ejecuta cada variante:

```sh
cd prueba-swc
npm install
npm run compilar:sin-configuracion
npm run compilar:clasico
npm run compilar:automatico
```

La primera compilación falla porque la configuración por defecto de SWC interpreta JavaScript sin JSX. El error comienza con `Expression expected` en la línea de `<div>` y termina en `Syntax Error`.

Con el runtime clásico, SWC convierte las etiquetas HTML en llamadas a `React.createElement`:

```js
React.createElement("div", { className: "tarjeta" },
  React.createElement("h1", null, "Hola, ", nombre),
  React.createElement("p", null, "Esto es JSX.")
)
```

Con el automático, importa helpers de `react/jsx-runtime`; usa `jsxs` para elementos con varios hijos y `jsx` para un elemento con un hijo:

```js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
_jsxs("div", { className: "tarjeta", children: [
  _jsxs("h1", { children: ["Hola, ", nombre] }),
  _jsx("p", { children: "Esto es JSX." })
] });
```

Las etiquetas nativas como `div`, `h1` y `p` se pasan como nombres de etiqueta de texto. Un componente React con mayúscula se pasa como referencia a una función o variable del componente.

**¿Quién traduce JSX si React es una biblioteca?** El compilador o transformador de la herramienta de desarrollo lo convierte antes de que el navegador ejecute el código. Aquí lo hace SWC; en esta plantilla actual de Vite, Oxc transforma JSX y el plugin de React configura el runtime automático. React aporta las funciones y el runtime que usa el código transformado. [Documentación de SWC](https://swc.rs/docs/configuration/compilation) · [JSX en Vite](https://vite.dev/guide/features.html#jsx).

## 2. Crear y arrancar el proyecto Vite

Desde la raíz del repositorio, en otra terminal, instala las dependencias y arranca el servidor:

```sh
cd hola-react
npm install
npm run dev
```

Abre la URL que imprime Vite, normalmente `http://localhost:5173`. El contenedor vacío está en `hola-react/index.html` como `<div id="root"></div>`. `src/main.tsx` encuentra ese elemento y monta en él el componente `App`. El CSS del profesor está en `src/index.css`; se retiraron las imágenes y los estilos de demostración de Vite.

## 3. Hola mundo sin JSX

También se puede crear el elemento sin escribir etiquetas JSX:

```tsx
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root')!)
root.render(createElement('h1', null, 'Hola mundo'))
```

Una tarjeta con tres elementos hijos también se puede construir anidando llamadas:

```tsx
root.render(
  createElement(
    'article',
    { className: 'tarjeta' },
    createElement('h2', { className: 'tarjeta__nombre' }, 'Karla Duarte'),
    createElement('p', { className: 'tarjeta__carrera' }, 'Ingeniería de Software'),
    createElement('p', null, '5.º semestre'),
  ),
)
```

`createRoot(contenedor)` crea la raíz de React asociada al elemento del DOM y devuelve el objeto que la administra. `root.render(elemento)` le indica a React qué árbol mostrar en esa raíz; React se encarga de actualizar el DOM.

## 4. El primer componente

`src/Saludo.tsx` define `SaludoProps`, que exige `nombre: string`. `src/App.tsx` lo usa como `<Saludo nombre="estudiantes" />`.

Para observar el error, prueba temporalmente `<Saludo />` en `App.tsx`. El editor marca que falta la prop requerida; el diagnóstico de TypeScript es:

```text
Property 'nombre' is missing in type '{}' but required in type 'SaludoProps'. ts(2741)
```

Los nombres de componentes comienzan con mayúscula para que React distinga funciones de componentes (por ejemplo, `Saludo`) de etiquetas HTML nativas (por ejemplo, `div`).

## 5. Componentes dentro de componentes

`src/Insignia.tsx` recibe `texto` y un `tipo` opcional limitado a `info`, `exito` o `extra`; cuando se omite, usa `info`. `src/TarjetaPerfil.tsx` recibe nombre, carrera y semestre, calcula las iniciales y muestra “Por egresar” desde el séptimo semestre. `App.tsx` presenta a Karla Duarte, Omar Valdez y Sofía Ibarra.

En JSX, `semestre="8"` entrega el texto `"8"`, mientras `semestre={8}` evalúa la expresión y entrega el número `8`. Como la interfaz declara `semestre: number`, TypeScript rechaza la forma con comillas: `Type 'string' is not assignable to type 'number'. ts(2322)`.

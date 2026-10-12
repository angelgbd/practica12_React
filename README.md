- ¿En qué se convirtió cada etiqueta JSX?
Con SWC en modo clásico, cada etiqueta se convierte en una llamada a React.createElement.

- Si React es una biblioteca, ¿quién traduce JSX?
 El compilador o transformador del proyecto: en el ejercicio, SWC; en la app de Vite, su herramienta de transformación JSX. React aporta el runtime que usan las llamadas generadas.

- ¿Qué hacen createRoot y render?
 createRoot(contenedor) conecta React con un elemento del DOM, como <div id="root">, y crea una raíz. root.render(elemento) indica qué árbol de componentes mostrar ahí; React actualiza el DOM según ese árbol.

- ¿Por qué el nombre de un componente empieza con mayúscula?
 Para que React distinga un componente, como <Saludo />, de una etiqueta HTML nativa, como <div />.

- ¿Cuál es la diferencia entre semestre="8" y semestre={8}?
  El primero pasa el texto "8", el segundo evalúa la expresión y pasa el número 8. Como la prop está tipada como number, TypeScript rechaza semestre="8".

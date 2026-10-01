# Curso Fincas Productivas · La Huerta LAB

Presentaciones de las dos modalidades del curso, hechas con el motor `deck-stage`.

## Estructura

    index.html              portada: se elige modalidad y luego la clase.
                            El avance se guarda por modalidad en localStorage.
    assets/                 motor y estilos compartidos por todas las clases
      deck.css  deck.js  portada.css  fonts/  img/
    presencial/<clase>/     una carpeta por clase, solo con index.html
    virtual/<clase>/

## Cómo agregar una clase

1. Crear la carpeta en `presencial/` o `virtual/` con su `index.html`.
   Las imagenes van en `assets/img/` y se referencian como `../../assets/img/<archivo>`.
2. En el `<head>`: `<link rel="stylesheet" href="../../assets/deck.css">`.
   Antes de `</body>`: `<script src="../../assets/deck.js"></script>`.
3. Agregar la fila en el listado de `index.html`.

## Navegación de las clases

Flechas, PgUp/PgDn, barra espaciadora, teclas 1 a 9, `R` reinicia, `F` pantalla completa.
`Ctrl+P` exporta un PDF de una diapositiva por pagina.
Cada diapositiva tiene direccion propia por hash (`#12`), valida al cargar la pagina.

## Marca

El logo se carga desde el CDN de La Huerta (https://assets.cdn.filesafe.space/IdRKxMkw62mZx47SMDaS/media/6aa46253f4e2fd8aa0ffbddd.png).
Si no carga, el `onerror` lo quita y queda solo el texto "La Huerta LAB".
Para que funcione sin internet: guardar el PNG en `assets/img/logo-lahuertalab.png`
y cambiar el `src` en `index.html` y en las clases.

## Pendiente

- Tipografias: hoy se cargan desde Google Fonts. Poner los woff2 en `assets/fonts/`
  y cambiar el `<link>` por `@font-face` en `deck.css` para que funcione sin internet.
- Las dos clases de "El bosque como modelo" (Semana 1 virtual y Dia 1 presencial)
  siguen en el repositorio fincas-productivas-semana-1 y se enlazan desde aqui.
  Funcionan bien; migrarlas es opcional.

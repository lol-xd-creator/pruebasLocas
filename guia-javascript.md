# Guía de JavaScript

Referencia de sintaxis y estructuras para programar en JavaScript.
Materia: Desarrollo de Software (DDS) — UTN FRC

> **Convención:** los ejemplos usan `console.log()` para mostrar resultados.
> Los comentarios con `//` indican qué imprime cada línea.

---

## 1. Fundamentos

### Comentarios

```javascript
// Comentario de una línea

/* Comentario
   de varias líneas */

/**
 * Comentario de documentación (JSDoc)
 * @param {number} a - primer número
 * @returns {number} la suma
 */
```

### Punto y coma

JavaScript los inserta automáticamente, pero conviene escribirlos: hay casos borde
donde la inserción automática rompe el código.

```javascript
let x = 5;
console.log(x);
```

### Salida por consola

```javascript
console.log("mensaje");           // salida normal
console.error("error");           // salida de error (en rojo)
console.warn("advertencia");      // advertencia
console.table([{a: 1}, {a: 2}]);  // muestra arrays de objetos como tabla
console.log("a:", a, "b:", b);    // múltiples valores separados por coma
```

---

## 2. Variables

```javascript
let edad = 25;              // puede reasignarse
const PI = 3.14159;         // no puede reasignarse
var viejo = "evitar";       // sintaxis antigua, no usar
```

| Palabra | Reasignable | Alcance (scope) | Uso |
|---|---|---|---|
| `const` | ❌ | bloque | **por defecto** |
| `let` | ✅ | bloque | cuando el valor cambia |
| `var` | ✅ | función | legacy, evitar |

> **Regla práctica:** empezá siempre con `const`. Si el compilador te obliga a
> reasignar, recién ahí cambiá a `let`.

`const` con objetos y arrays: la **referencia** es constante, el contenido no.

```javascript
const lista = [1, 2, 3];
lista.push(4);              // ✅ válido: modifica el contenido
lista = [5, 6];             // ❌ TypeError: reasigna la referencia
```

---

## 3. Tipos de datos

### Primitivos

```javascript
const numero    = 42;              // number (enteros y decimales, todo junto)
const decimal   = 3.14;            // number
const texto     = "hola";          // string
const booleano  = true;            // boolean
const nada      = null;            // null (ausencia intencional de valor)
let indefinido;                    // undefined (declarado pero sin asignar)
const simbolo   = Symbol("id");    // symbol (identificador único)
const grande    = 9007199254740993n; // bigint (enteros muy grandes)
```

### Verificar el tipo

```javascript
typeof 42            // "number"
typeof "hola"        // "string"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object"  ← bug histórico del lenguaje
typeof {}            // "object"
typeof []            // "object"  ← los arrays son objetos
typeof function(){}  // "function"

Array.isArray([])    // true  ← forma correcta de detectar arrays
```

### Conversión de tipos

```javascript
Number("42")         // 42
Number("abc")        // NaN (Not a Number)
parseInt("42px")     // 42   (lee hasta el primer no-dígito)
parseFloat("3.14em") // 3.14

String(42)           // "42"
(42).toString()      // "42"
(255).toString(2)    // "11111111"  (binario)

Boolean(0)           // false
Boolean("")          // false
```

### Valores falsy

Solo estos ocho evalúan como falso. **Todo lo demás es verdadero.**

```javascript
false, 0, -0, 0n, "", null, undefined, NaN
```

```javascript
if ([])  console.log("sí");   // se ejecuta: array vacío es truthy
if ({})  console.log("sí");   // se ejecuta: objeto vacío es truthy
if ("0") console.log("sí");   // se ejecuta: string "0" es truthy
```

---

## 4. Strings

```javascript
const nombre = "Benja";
const otro   = 'comillas simples, equivalentes';
```

### Template literals (backticks)

Permiten interpolar variables y escribir varias líneas:

```javascript
const edad = 20;
console.log(`Hola ${nombre}, tenés ${edad} años`);
console.log(`El año que viene: ${edad + 1}`);   // se pueden poner expresiones

const multilinea = `Primera línea
Segunda línea`;
```

### Métodos frecuentes

```javascript
const s = "  Hola Mundo  ";

s.length                      // 15
s.trim()                      // "Hola Mundo"
s.toUpperCase()               // "  HOLA MUNDO  "
s.toLowerCase()               // "  hola mundo  "
s.includes("Mundo")           // true
s.startsWith("  Hola")        // true
s.endsWith("  ")              // true
s.indexOf("Mundo")            // 7  (-1 si no lo encuentra)
s.slice(2, 6)                 // "Hola"
s.replace("Hola", "Chau")     // "  Chau Mundo  "
s.replaceAll("o", "0")        // reemplaza todas las ocurrencias
s.split(" ")                  // ["", "", "Hola", "Mundo", "", ""]
s.repeat(2)                   // duplica el string
s.at(-1)                      // " "  (índice negativo = desde el final)
s[0]                          // " "  (acceso por índice)
s.padStart(20, "*")           // rellena hasta 20 caracteres
```

> Los strings son **inmutables**: todos estos métodos devuelven uno nuevo,
> no modifican el original.

---

## 5. Operadores

### Aritméticos

```javascript
5 + 3      // 8
5 - 3      // 2
5 * 3      // 15
5 / 3      // 1.6666666666666667  (siempre división real)
5 % 3      // 2   (resto)
5 ** 3     // 125 (potencia)

let x = 5;
x++;       // post-incremento: devuelve 5, después x vale 6
++x;       // pre-incremento: incrementa y después devuelve
x += 3;    // equivale a x = x + 3
x -= 3;    x *= 2;    x /= 2;    x %= 3;    x **= 2;
```

### Comparación

```javascript
5 == "5"      // true   ← compara con conversión de tipo
5 === "5"     // false  ← compara valor Y tipo
5 != "5"      // false
5 !== "5"     // true

5 > 3         // true
5 >= 5        // true
```

> **Usá siempre `===` y `!==`.** El `==` hace conversiones implícitas que producen
> resultados absurdos: `0 == ""` es `true`, `null == undefined` es `true`.

### Lógicos

```javascript
true && false      // false  (AND: ambos deben ser verdaderos)
true || false      // true   (OR: al menos uno)
!true              // false  (NOT: niega)

// Cortocircuito: devuelven un valor, no solo true/false
const nombre = entrada || "Anónimo";        // si entrada es falsy, usa "Anónimo"
const nombre2 = entrada ?? "Anónimo";       // solo si es null o undefined
usuario && console.log(usuario.nombre);     // ejecuta solo si usuario existe
```

Diferencia clave entre `||` y `??`:

```javascript
const cantidad = 0;
cantidad || 10     // 10  ← 0 es falsy, lo descarta (probablemente no querías esto)
cantidad ?? 10     // 0   ← 0 no es null ni undefined, lo conserva ✅
```

### Ternario

Un `if/else` en una expresión:

```javascript
const mensaje = edad >= 18 ? "Mayor" : "Menor";

// anidado (usar con moderación)
const nota = puntaje >= 8 ? "A" : puntaje >= 6 ? "B" : "C";
```

### Encadenamiento opcional

```javascript
usuario?.direccion?.calle       // undefined si algo del camino no existe
usuario?.saludar?.()            // llama al método solo si existe
lista?.[0]                      // acceso a índice seguro
```

Sin esto tendrías que escribir `usuario && usuario.direccion && usuario.direccion.calle`.

---

## 6. Condicionales

### if / else if / else

```javascript
if (edad >= 18) {
    console.log("Mayor de edad");
} else if (edad >= 13) {
    console.log("Adolescente");
} else {
    console.log("Menor");
}
```

Las llaves son opcionales para una sola instrucción, pero **ponelas siempre**:
sin ellas, agregar una segunda línea después rompe la lógica silenciosamente.

### switch

```javascript
const dia = 3;

switch (dia) {
    case 1:
        console.log("Lunes");
        break;                    // sin break sigue ejecutando los casos siguientes
    case 2:
        console.log("Martes");
        break;
    case 6:
    case 7:                       // casos agrupados
        console.log("Fin de semana");
        break;
    default:
        console.log("Día inválido");
}
```

> `switch` compara con `===` (valor y tipo). `"3"` no coincide con `case 3`.

---

## 7. Ciclos

### for clásico

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);               // 0, 1, 2, 3, 4
}
```

Tres partes separadas por `;`:
1. **Inicialización** — se ejecuta una vez al empezar
2. **Condición** — se evalúa antes de cada vuelta; si es falsa, corta
3. **Actualización** — se ejecuta al final de cada vuelta

Variantes:

```javascript
for (let i = 10; i > 0; i--) { }           // descendente
for (let i = 0; i < 20; i += 2) { }        // de dos en dos
for (let i = 0, j = 10; i < j; i++, j--) { }  // dos contadores
```

### for...of — recorrer valores

La forma preferida para arrays y strings:

```javascript
const frutas = ["manzana", "pera", "uva"];

for (const fruta of frutas) {
    console.log(fruta);           // manzana, pera, uva
}

for (const letra of "abc") {
    console.log(letra);           // a, b, c
}

// con índice
for (const [i, fruta] of frutas.entries()) {
    console.log(i, fruta);        // 0 manzana, 1 pera, 2 uva
}
```

### for...in — recorrer claves

Para objetos. **No usar con arrays** (recorre índices como strings y puede incluir
propiedades heredadas).

```javascript
const persona = { nombre: "Ana", edad: 30 };

for (const clave in persona) {
    console.log(clave, persona[clave]);   // nombre Ana, edad 30
}
```

### while

Cuando no sabés de antemano cuántas vueltas hacen falta:

```javascript
let contador = 0;
while (contador < 5) {
    console.log(contador);
    contador++;                   // ⚠️ sin esto, ciclo infinito
}
```

### do...while

Ejecuta el cuerpo **al menos una vez**, después evalúa:

```javascript
let opcion;
do {
    opcion = pedirOpcion();
} while (opcion !== "salir");
```

### Control del flujo

```javascript
for (let i = 0; i < 10; i++) {
    if (i === 3) continue;        // salta a la siguiente vuelta
    if (i === 7) break;           // sale del ciclo
    console.log(i);               // 0,1,2,4,5,6
}

// etiquetas para ciclos anidados
externo:
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (j === 1) continue externo;
        console.log(i, j);
    }
}
```

---

## 8. Funciones

### Declaración

```javascript
function saludar(nombre) {
    return `Hola ${nombre}`;
}
```

Se puede llamar **antes** de su definición en el código (*hoisting*).

### Expresión

```javascript
const saludar = function(nombre) {
    return `Hola ${nombre}`;
};
```

Solo disponible después de la línea donde se define.

### Arrow function

Sintaxis moderna y compacta:

```javascript
const saludar = (nombre) => {
    return `Hola ${nombre}`;
};

const saludar2 = nombre => `Hola ${nombre}`;      // retorno implícito
const sumar = (a, b) => a + b;                    // varios parámetros
const nada = () => console.log("hola");           // sin parámetros
const obj = () => ({ a: 1 });                     // devolver objeto: paréntesis
```

> Las arrow functions **no tienen su propio `this`**: heredan el del contexto donde
> se definieron. Por eso son ideales como callbacks, pero no sirven como métodos
> de objeto cuando necesitás acceder al objeto con `this`.

### Parámetros

```javascript
// Valores por defecto
function saludar(nombre = "invitado", saludo = "Hola") {
    return `${saludo} ${nombre}`;
}
saludar();                    // "Hola invitado"

// Rest: agrupa el resto en un array
function sumarTodos(...numeros) {
    return numeros.reduce((acc, n) => acc + n, 0);
}
sumarTodos(1, 2, 3, 4);       // 10

// Objeto como parámetro (útil con muchos argumentos)
function crear({ nombre, edad = 0 }) {
    return `${nombre}, ${edad}`;
}
crear({ nombre: "Ana", edad: 30 });
```

### Funciones como valores

En JavaScript las funciones son datos: se pasan, se devuelven, se guardan.

```javascript
const operaciones = {
    sumar: (a, b) => a + b,
    restar: (a, b) => a - b
};
operaciones.sumar(2, 3);      // 5

// Función que devuelve otra función (closure)
function multiplicador(factor) {
    return (n) => n * factor;
}
const duplicar = multiplicador(2);
duplicar(5);                  // 10
```

---

## 9. Arrays

### Crear y acceder

```javascript
const nums = [1, 2, 3, 4, 5];
const mixto = [1, "dos", true, null, { a: 1 }, [1, 2]];

nums[0]         // 1  (primer elemento)
nums.at(-1)     // 5  (último, con índice negativo)
nums.length     // 5
```

### Agregar y quitar

```javascript
const a = [1, 2, 3];

a.push(4);        // agrega al final    → [1,2,3,4]
a.pop();          // quita del final    → devuelve 4
a.unshift(0);     // agrega al inicio   → [0,1,2,3]
a.shift();        // quita del inicio   → devuelve 0

a.splice(1, 2);              // quita 2 elementos desde el índice 1
a.splice(1, 0, "nuevo");     // inserta sin quitar nada
```

### Métodos que NO modifican el original

```javascript
const nums = [1, 2, 3, 4, 5];

nums.slice(1, 3)         // [2, 3]  (corta un pedazo)
nums.concat([6, 7])      // [1,2,3,4,5,6,7]
nums.join(" - ")         // "1 - 2 - 3 - 4 - 5"
nums.includes(3)         // true
nums.indexOf(3)          // 2
nums.toString()          // "1,2,3,4,5"
```

### Métodos de orden superior

Los más importantes del lenguaje. Todos reciben una función como argumento.

```javascript
const nums = [1, 2, 3, 4, 5];

// map: transforma cada elemento → array nuevo del mismo tamaño
nums.map(n => n * 2);                    // [2, 4, 6, 8, 10]

// filter: conserva los que cumplen → array nuevo más chico o igual
nums.filter(n => n % 2 === 0);           // [2, 4]

// reduce: acumula todo en un solo valor
nums.reduce((acc, n) => acc + n, 0);     // 15
// acc = acumulador, 0 = valor inicial

// find: primer elemento que cumple (o undefined)
nums.find(n => n > 3);                   // 4
nums.findIndex(n => n > 3);              // 3

// some / every: devuelven booleano
nums.some(n => n > 4);                   // true  (¿alguno?)
nums.every(n => n > 0);                  // true  (¿todos?)

// forEach: ejecuta algo por cada uno (no devuelve nada)
nums.forEach(n => console.log(n));

// sort: ordena (⚠️ MODIFICA el original)
[3, 1, 2].sort();                        // [1, 2, 3]
[10, 9, 1].sort();                       // [1, 10, 9] ← ordena como texto
[10, 9, 1].sort((a, b) => a - b);        // [1, 9, 10] ← numérico ascendente
[10, 9, 1].sort((a, b) => b - a);        // [10, 9, 1] ← descendente

// reverse: invierte (⚠️ MODIFICA el original)
[1, 2, 3].reverse();                     // [3, 2, 1]

// flat: aplana arrays anidados
[1, [2, [3, [4]]]].flat(2);              // [1, 2, 3, [4]]
```

### Encadenamiento

Se combinan para expresar transformaciones complejas de forma legible:

```javascript
const productos = [
    { nombre: "A", precio: 100, stock: 5 },
    { nombre: "B", precio: 200, stock: 0 },
    { nombre: "C", precio: 150, stock: 3 }
];

const total = productos
    .filter(p => p.stock > 0)
    .map(p => p.precio * p.stock)
    .reduce((acc, subtotal) => acc + subtotal, 0);
// 950
```

---

## 10. Objetos

### Crear y acceder

```javascript
const persona = {
    nombre: "Ana",
    edad: 30,
    "clave con espacios": true,
    saludar() {                          // método (sintaxis corta)
        return `Hola, soy ${this.nombre}`;
    }
};

persona.nombre                    // "Ana"       notación punto
persona["nombre"]                 // "Ana"       notación corchetes
persona["clave con espacios"]     // corchetes obligatorios acá

const prop = "edad";
persona[prop]                     // 30          clave dinámica
```

### Modificar

```javascript
persona.email = "a@b.com";        // agregar
persona.edad = 31;                // modificar
delete persona.email;             // eliminar

"nombre" in persona               // true
Object.hasOwn(persona, "nombre")  // true (forma moderna)
```

### Recorrer

```javascript
Object.keys(persona)      // ["nombre", "edad", ...]
Object.values(persona)    // ["Ana", 30, ...]
Object.entries(persona)   // [["nombre","Ana"], ["edad",30], ...]

for (const [clave, valor] of Object.entries(persona)) {
    console.log(`${clave}: ${valor}`);
}
```

### Copiar y combinar

```javascript
const copia = { ...persona };                    // copia superficial (spread)
const copia2 = Object.assign({}, persona);       // equivalente

const combinado = { ...persona, ...otro };       // el segundo pisa al primero
const conExtra = { ...persona, activo: true };   // agrega propiedad

// Copia profunda (para objetos anidados)
const profunda = structuredClone(persona);
```

> `{...obj}` es una copia **superficial**: los objetos anidados siguen compartiendo
> referencia. Modificar `copia.direccion.calle` también cambia el original.

### Propiedades abreviadas

```javascript
const nombre = "Ana";
const edad = 30;

const persona = { nombre, edad };        // equivale a { nombre: nombre, edad: edad }

// Clave computada
const clave = "color";
const obj = { [clave]: "rojo" };         // { color: "rojo" }
```

---

## 11. Destructuring

Extraer valores de arrays y objetos en variables:

```javascript
// Arrays: por posición
const [a, b, c] = [1, 2, 3];
const [primero, , tercero] = [1, 2, 3];      // saltear elementos
const [x, ...resto] = [1, 2, 3, 4];          // x=1, resto=[2,3,4]
const [p = 10] = [];                         // valor por defecto

// Intercambiar variables
let m = 1, n = 2;
[m, n] = [n, m];

// Objetos: por nombre de propiedad
const { nombre, edad } = persona;
const { nombre: n2 } = persona;              // renombrar
const { pais = "AR" } = persona;             // valor por defecto
const { direccion: { calle } } = persona;    // anidado

// En parámetros de función
function mostrar({ nombre, edad = 0 }) {
    console.log(nombre, edad);
}
```

---

## 12. Clases

```javascript
class Persona {
    #secreto = "privado";              // campo privado (con #)
    static contador = 0;               // propiedad de clase, no de instancia

    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        Persona.contador++;
    }

    saludar() {
        return `Hola, soy ${this.nombre}`;
    }

    get descripcion() {                // getter: se usa sin paréntesis
        return `${this.nombre}, ${this.edad}`;
    }

    set nuevaEdad(valor) {             // setter
        if (valor < 0) throw new Error("Edad inválida");
        this.edad = valor;
    }

    static crearAnonimo() {            // método estático: se llama en la clase
        return new Persona("Anónimo", 0);
    }
}

const p = new Persona("Ana", 30);
p.saludar();                  // "Hola, soy Ana"
p.descripcion;                // "Ana, 30"     ← getter, sin paréntesis
p.nuevaEdad = 31;             // ← setter
Persona.crearAnonimo();       // ← estático, sobre la clase
Persona.contador;             // 2
```

### Herencia

```javascript
class Empleado extends Persona {
    constructor(nombre, edad, puesto) {
        super(nombre, edad);           // ⚠️ obligatorio y primero
        this.puesto = puesto;
    }

    saludar() {                        // sobrescribe el método del padre
        return `${super.saludar()}, trabajo de ${this.puesto}`;
    }
}

const e = new Empleado("Luis", 40, "dev");
e instanceof Empleado         // true
e instanceof Persona          // true
```

---

## 13. Manejo de errores

```javascript
try {
    const datos = JSON.parse(textoInvalido);
} catch (error) {
    console.error("Falló:", error.message);
} finally {
    console.log("Esto se ejecuta siempre");
}
```

### Lanzar errores

```javascript
function dividir(a, b) {
    if (b === 0) {
        throw new Error("División por cero");
    }
    return a / b;
}

// Error personalizado
class ErrorValidacion extends Error {
    constructor(campo) {
        super(`Campo inválido: ${campo}`);
        this.name = "ErrorValidacion";
        this.campo = campo;
    }
}
```

### Tipos de error nativos

| Error | Cuándo aparece |
|---|---|
| `TypeError` | operación sobre un tipo incorrecto (`null.propiedad`) |
| `ReferenceError` | variable no definida |
| `SyntaxError` | código mal escrito |
| `RangeError` | valor fuera de rango válido |

---

## 14. Asincronía

JavaScript ejecuta en un solo hilo. Las operaciones que tardan (red, archivos,
temporizadores) no bloquean: se registran y siguen después.

### Promesas

Una promesa representa un valor que va a estar disponible **en el futuro**.
Tiene tres estados: *pending*, *fulfilled*, *rejected*.

```javascript
const promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        const exito = true;
        if (exito) resolve("Listo");
        else reject(new Error("Falló"));
    }, 1000);
});

promesa
    .then(resultado => console.log(resultado))
    .catch(error => console.error(error))
    .finally(() => console.log("Terminó"));
```

### async / await

Sintaxis que hace que el código asíncrono se lea como si fuera secuencial.
**Es la forma recomendada.**

```javascript
async function obtenerDatos() {
    try {
        const respuesta = await fetch("https://api.ejemplo.com/datos");
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}

// Llamarla
const datos = await obtenerDatos();          // dentro de otra async
obtenerDatos().then(d => console.log(d));    // o con .then
```

> Toda función `async` devuelve una promesa, aunque retornes un valor común.
> `await` solo puede usarse dentro de una función `async` (o en el nivel superior
> de un módulo ES).

### Ejecutar en paralelo

```javascript
// ❌ Secuencial: espera una, después la otra (lento)
const a = await tarea1();
const b = await tarea2();

// ✅ Paralelo: lanza las dos y espera a ambas
const [a, b] = await Promise.all([tarea1(), tarea2()]);

Promise.allSettled([t1(), t2()]);   // espera todas, aunque alguna falle
Promise.race([t1(), t2()]);         // la primera que termine (éxito o error)
Promise.any([t1(), t2()]);          // la primera que tenga éxito
```

### Temporizadores

```javascript
setTimeout(() => console.log("después"), 1000);      // una vez
const id = setInterval(() => console.log("cada 1s"), 1000);
clearInterval(id);                                   // detener
```

---

## 15. Fetch y JSON

Lo que vas a usar junto con Postman para probar APIs.

### JSON

```javascript
const obj = { nombre: "Ana", edad: 30 };

const texto = JSON.stringify(obj);          // objeto → string
JSON.stringify(obj, null, 2);               // con indentación (legible)

const recuperado = JSON.parse(texto);       // string → objeto
```

### GET

```javascript
async function listar() {
    const res = await fetch("https://api.ejemplo.com/usuarios");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
}
```

### POST

```javascript
async function crear(usuario) {
    const res = await fetch("https://api.ejemplo.com/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(usuario)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
}
```

Otros métodos: `PUT` (reemplazar), `PATCH` (modificar parcialmente), `DELETE`.

### Propiedades de la respuesta

```javascript
res.ok           // true si el status está entre 200 y 299
res.status       // 200, 404, 500...
res.statusText   // "OK", "Not Found"
res.headers.get("content-type")

await res.json()   // parsea el body como JSON
await res.text()   // devuelve el body como texto plano
```

> `fetch` **no lanza error** con status 404 o 500. Solo falla si hay un problema
> de red. Por eso siempre hay que verificar `res.ok` a mano.

---

## 16. Módulos (ES Modules)

```javascript
// archivo: matematica.js
export const PI = 3.14159;
export function sumar(a, b) { return a + b; }
export default class Calculadora { }        // una exportación por defecto por archivo

// archivo: main.js
import Calculadora from "./matematica.js";           // el default
import { PI, sumar } from "./matematica.js";         // los nombrados
import { sumar as add } from "./matematica.js";      // renombrando
import * as mate from "./matematica.js";             // todo en un objeto
```

En Node.js hace falta usar la extensión `.js` en la ruta y declarar
`"type": "module"` en el `package.json`.

Sintaxis antigua de Node (CommonJS), que todavía vas a ver:

```javascript
module.exports = { sumar };
const { sumar } = require("./matematica");
```

---

## 17. Métodos numéricos y Math

```javascript
const n = 3.14159;

n.toFixed(2)             // "3.14"  ← devuelve string
Number(n.toFixed(2))     // 3.14
Number.isInteger(5)      // true
Number.isNaN(NaN)        // true
Number.parseFloat("3.5") // 3.5

Math.round(4.5)          // 5
Math.floor(4.9)          // 4   (hacia abajo)
Math.ceil(4.1)           // 5   (hacia arriba)
Math.trunc(4.9)          // 4   (corta los decimales)
Math.abs(-5)             // 5
Math.max(1, 5, 3)        // 5
Math.min(...[1, 5, 3])   // 1   (spread para pasar un array)
Math.sqrt(16)            // 4
Math.pow(2, 3)           // 8
Math.random()            // decimal entre 0 y 1 (1 excluido)

// Entero aleatorio entre min y max (inclusive)
const aleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
```

> Cuidado con la aritmética de punto flotante: `0.1 + 0.2 === 0.3` es **false**.
> Para dinero, trabajá en centavos con enteros.

---

## 18. Fechas

```javascript
const ahora = new Date();
const fecha = new Date("2026-03-15");
const especifica = new Date(2026, 2, 15);   // ⚠️ el mes va de 0 a 11

ahora.getFullYear()      // 2026
ahora.getMonth()         // 0 = enero
ahora.getDate()          // día del mes
ahora.getDay()           // 0 = domingo
ahora.getHours()

ahora.toISOString()      // "2026-03-15T10:30:00.000Z"
ahora.toLocaleDateString("es-AR")     // "15/3/2026"
Date.now()               // milisegundos desde 1970
```

---

## 19. Estructuras de datos

### Map — diccionario con claves de cualquier tipo

```javascript
const mapa = new Map();
mapa.set("clave", "valor");
mapa.set(objeto, "también sirve como clave");

mapa.get("clave");       // "valor"
mapa.has("clave");       // true
mapa.delete("clave");
mapa.size;

for (const [k, v] of mapa) { }
```

### Set — colección sin duplicados

```javascript
const conjunto = new Set([1, 2, 2, 3]);
conjunto.size;                    // 3
conjunto.add(4);
conjunto.has(2);                  // true

// Truco: eliminar duplicados de un array
const unicos = [...new Set([1, 1, 2, 3, 3])];    // [1, 2, 3]
```

---

## 20. Buenas prácticas

- **`const` por defecto**, `let` solo cuando el valor cambia, nunca `var`.
- **`===` siempre**, nunca `==`.
- **Nombres descriptivos:** `cantidadUsuarios` en vez de `c`. `camelCase` para
  variables y funciones, `PascalCase` para clases, `MAYUSCULAS` para constantes globales.
- **Funciones cortas** que hagan una sola cosa.
- **Preferí métodos de array** (`map`, `filter`, `reduce`) sobre ciclos manuales
  cuando estés transformando datos: el código expresa la intención.
- **Manejá los errores** en las llamadas asíncronas; un `catch` vacío es peor que
  ningún `try`.
- **`"use strict";`** al inicio del archivo activa el modo estricto y convierte
  errores silenciosos en excepciones. Los módulos ES ya lo aplican por defecto.

---

## Depuración

```javascript
console.log(variable);
console.table(arrayDeObjetos);
console.dir(objeto, { depth: null });
debugger;                          // pausa la ejecución si DevTools está abierto
```

En el navegador: `F12` → pestaña **Console** para ver la salida y **Sources**
para poner puntos de interrupción.

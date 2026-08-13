
console.log("Hola aeeii");

const nombre = 'benja'

 // nombre = 'juan' DA ERROR POR QUE nombre es constante

console.log('Hola ${nombre}');
console.log(`Hola ${nombre}`);

let edad = 50
console.log(`Tengo ${edad} años`)
edad = 20 // aca no hay problema por que let no es constante
console.log(`Tengo ${edad} años`)

// las llaves indican que es un objeto

const persona1 = {
    nombre: 'benja',
    edad: 2500
};

console.log(persona1.nombre)

persona1.nombre = 156 // los tipos son dinamicos
persona1.nombre = 'benyi'

console.log(persona1.nombre)

// da error por que persona ya fue declarado y es constante
// persona = {nombre = "juan"}; 


const persona2 = {
    nombre: 'pepito',
    edad: 777
};

function quienEsMayor(pA, pB) {
    if (pA.edad >= pB.edad) {
        return pA
    } else {
        return pB
    }
};

const r = quienEsMayor(persona1, persona2)
console.log(`resultado`, r) // asi printeamos todo el objeto


//asi printeamos solo ciertos atributos del objeto
// console.log(quienEsMayor(persona1,persona2).nombre + " es mayor")


console.log("ayeeeieieieiieiei")

console.log("opaa")

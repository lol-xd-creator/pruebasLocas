const lista = [];
lista.push(4);
lista.push("ashee");
lista.push(777);


for (const item of lista) {
    console.log(item);
}

console.table(lista);

const persona = {
    nombre: "pepe",
    edad: 777,
    saludar() {
        return `hola soy ${this.nombre}`;
    },
    mostrarTablaDeInformacion() {
        liste = []
        for (const [clave, valor] in Object.values(persona)) {
            liste.push(`${clave} = ${valor}`);
        }
        console.table(liste);
    }
}

persona.mostrarTablaDeInformacion();

//lol

persona.mostrarTablaDeInformacion();

console.log("update lolcreator!");

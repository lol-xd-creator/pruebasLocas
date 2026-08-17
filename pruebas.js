const lista = [];
lista.push(4);
lista.push("ashee");
lista.push(777);


for (const item of lista) {
    console.log(item);
}

console.table(lista);

const persona = {
    nombre: "juanchi",
    edad: 666,
    saludar() {
        return `hola no soy ${this.nombre}`;
    },
    mostrarTablaDeInformacion() {
        liste = []
        for (const [clave, valor] in Object.values(persona)) {
            liste.push(`${clave} = ${valor} jojo`);
        }
        console.table(liste);
    }
}

persona.mostrarTablaDeInformacion();

//lol

persona.mostrarTablaDeInformacion();

console.log("update lolcreator!");

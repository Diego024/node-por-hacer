const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err)
            return ('No se pudo grabar', err);
        else
            return ('La tarea se registró correctamente');
    })

}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = () => {

    cargarDB();

    for (let tarea of listadoPorHacer) {

        console.log('======Por Hacer======'.green);
        console.log(tarea.descripcion);
        console.log('Estado: ', tarea.completado);
        console.log('====================='.green);
    }
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => { return tarea.descripcion === descripcion });

    if (index >= 0) {
        listadoPorHacer.splice(index);
        guardarDB();
        return true;
    } else {
        return false;
    }


}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
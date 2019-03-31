const fs = require('fs')

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer)
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar', err)
        }
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json')
    } catch (error) {
        listadoPorHacer = []
    }
}

let listadoPorHacer = []

const crear = (descripcion) => {
    cargarDB()
    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer)
    guardarDB()
    return listadoPorHacer
}

const listar = (filtro = 'todas') => {
    cargarDB()
    if (filtro !== 'todas') {
        let tareasFiltradas
        switch (filtro) {
            case 'terminadas':
                tareasFiltradas = listadoPorHacer.filter(tarea => tarea.completado == true)
                return tareasFiltradas
            case 'pendientes':
                tareasFiltradas = listadoPorHacer.filter(tarea => tarea.completado == false)
                return tareasFiltradas
        }
    }
    return listadoPorHacer
}

const actulizar = (descripcion, completado = true) => {
    cargarDB()
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
    if (index >= 0) {
        listadoPorHacer[index].completado = completado
        guardarDB()
        return true
    } else {
        return false
    }
}

const borrar = descripcion => {
    cargarDB()
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)
    if (listadoPorHacer.length === nuevoListado.length) {
        return false
    } else {
        listadoPorHacer = nuevoListado
        guardarDB()
        return true
    }
}

module.exports = {
    crear,
    listar,
    actulizar,
    borrar
}
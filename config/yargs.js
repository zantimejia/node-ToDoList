const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'

}

const completado = {
    default: true,
    alias: 'c',
    type: 'boolean',
    desc: 'Marca como completado o pendiente la tarea'

}

const filtro = {
    default: 'todas',
    alias: 'f',
    desc: 'Listas las tareas por el filtro ingresado'
}
const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', { descripcion })
    .command('actualizar', 'Actualiza el estado completado de una tarea', { descripcion, completado })
    .command('listar', 'Lista las tareas', { filtro })
    .command('borrar', 'Elimina una tarea', { descripcion })
    .help()
    .argv

module.exports = {
    argv
}
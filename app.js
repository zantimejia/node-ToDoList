const argv = require('./config/yargs').argv
const colors = require('colors')
const { crear, listar, actulizar, borrar } = require('./por-hacer/por-hacer')

let comando = argv._[0]

switch (comando) {
    case 'crear':
        let tarea = crear(argv.descripcion)
        break
    case 'listar':
        let listado = listar(argv.filtro)
        if (argv.filtro === 'todas') {
            if (argv.filtro == 'todas') {
                console.log('==========ToDoList=========='.green);
                for (let tarea of listado) {
                    if (tarea.completado) {
                        console.log(colors.green('️️️✔️ ', tarea.descripcion))
                    } else {
                        console.log(colors.red('️️️❌ ', tarea.descripcion))
                    }
                }
                console.log('============================='.green);
            }
        } else if (argv.filtro === 'terminadas' || argv.filtro === 'pendientes') {
            console.log('==========ToDoList=========='.green);
            for (let tarea of listado) {
                console.log(tarea.descripcion);
            }
            console.log('============================='.green);
        } else {
            console.log('Filtro no reconocido');
        }
        break;
    case 'actualizar':
        let actualizado = actulizar(argv.descripcion, argv.completado)
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = borrar(argv.descripcion)
        console.log(borrado);
        break
    default:
        console.log('Comando no reconocido');
}
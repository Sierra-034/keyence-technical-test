const uuid = require('uuid')

class Empleado {
    constructor(nombre) {
        this.id = uuid.v4();
        this.nombre = nombre
    }
}

class Asistencia {
    constructor(idEmpleado, asistencia) {
        this.idEmpleado = idEmpleado;
        this.asistencia = asistencia;
        this.fecha = Date.now();
    }
}

module.exports = {
    Empleado,
    Asistencia,
};

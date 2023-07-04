const uuid = require('uuid')

class Empleado {
    constructor(nombre) {
        this.id = uuid.v4();
        this.nombre = nombre
    }
}

class Asistencia {
    constructor(asistencia) {
        this.asistencia = asistencia;
        this.fecha = Date.now();
    }
}

module.exports = {
    Empleado,
    Asistencia,
};

const database = require('../database/models');

test('Empleado', () => {
    const empleado = new database.Empleado('Samuel');
    expect(empleado.nombre).toBe('Samuel');
})
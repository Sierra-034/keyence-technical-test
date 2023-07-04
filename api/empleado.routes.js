const express = require('express');
const { Empleado } = require('../database/models');
const { empleados } = require('../database/collections');
const empleadoRouter = express.Router();

empleadoRouter.get('/', (req, res) => {
    const { idEmpleado } = req.query;
    if (!idEmpleado) {
        const empleadosJson = Object.fromEntries(empleados)
        res.status(200).json(empleadosJson);
    }
    
    const empleado = empleados.get(idEmpleado);
    if (!empleado) {
        res.status(404).send('Empleado no encontrado')
        return
    }

    res.status(200).json(empleado);
});

empleadoRouter.post('/', (req, res) => {
    const { nombre } = req.body;
    if (!empleados.get(nombre)) {
        const empleadoModel = new Empleado(nombre);
        empleados.set(empleadoModel.id, empleadoModel);
        res.status(201).json(empleadoModel);
        return
    }

    res.status(400).send('Empleado ya existe');
});

empleadoRouter.put('/', (req, res) => {
    const { id } = req.body;
    const updatedEmpleado = empleados.get(id);
    if (!updatedEmpleado) {
        res.status(400).send('Empleado no encontrado')
        return
    }

    const { nombre: newNombre } = req.body;
    updatedEmpleado.nombre = newNombre;
    res.status(200).json(updatedEmpleado);
});

empleadoRouter.delete('/', (req, res) => {
    const { id } = req.query;
    const eliminado = 
        empleados.delete(id)
        ? 'Eliminado' : 'No eliminado';
    res.status(200).send(`Empleado ${eliminado}`);
});

module.exports = empleadoRouter;

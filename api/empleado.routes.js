const express = require('express');
const { Empleado } = require('../database/models');
const empleadoRouter = express.Router();

empleadoRouter.get('/', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        const empleados = await Empleado.findAll(
            {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                }
            });
        res.status(200).json(empleados);
        return;
    }

    const empleado = await Empleado.findByPk(id);
    res.status(200).json(empleado.toJSON());
});

empleadoRouter.post('/', async (req, res) => {
    const { nombre: name } = req.body;
    const isAlreadyCreated = await Empleado.findOne({where: {name}})
    if (!isAlreadyCreated) {
        const empleado = await Empleado.create({ name });
        res.status(201).json(empleado.toJSON());
        return;
    }

    res.status(400).send('Empleado ya existe');
});

empleadoRouter.put('/', async (req, res) => {
    const { id, nombre: newNombre } = req.body;
    const updatedModels = await Empleado.update({name: newNombre}, {
        where: { id }
    });

    res.status(200).send(`${updatedModels[0]} Empleados actualizados`);
});

empleadoRouter.delete('/', async (req, res) => {
    const { id } = req.query;
    const deletedEmpleados = await Empleado.destroy({
        where: {id},
    });
    res.status(200).send(`${deletedEmpleados} Empleados eliminados`);
});

module.exports = empleadoRouter;

const express = require('express');
const { Asistencia, Empleado } = require('../database/models');
const asistenciaRouter = express.Router();

asistenciaRouter.get('/', async (req, res) => {
    const { id: empleadoId } = req.query;
    const empleadoExists = await Empleado.findByPk(empleadoId);
    if (!empleadoExists) {
        res.status(400).send('Empleado no existe');
        return;
    }

    const asistenciasList = await Asistencia.findAll({where: {
        empleadoId}});
    res.status(200).json(asistenciasList);
});

asistenciaRouter.post('/', async (req, res) => {
    const { asistencia, id } = req.body;
    const fecha = new Date().toLocaleDateString();
    const isAlreadyCreated = await Asistencia.findOne({
        where: {fecha, id}});

    if (!isAlreadyCreated) {
        const newAttendance = await Asistencia.create({
            asistencia, empleadoId: id, fecha });
        res.status(201).json(newAttendance.toJSON());
        return;
    }

    res.status(400).send('Asistencia ya fué creada');
});

asistenciaRouter.put('/', async (req, res) => {
    const { id: empleadoId, fecha, asistencia } = req.body;
    const updatedAttendance = await Asistencia.update(
        {asistencia}, {where: {empleadoId, fecha}});
    
    res.status(200).send(`${updatedAttendance} Asistencias modificadas`);
});

asistenciaRouter.delete('/', async (req, res) => {
    const { id: empleadoId, fecha } = req.body;
    const deletedAttendances = await Asistencia.destroy({
        where: {empleadoId, fecha}});
    
    res.status(200).send(`${deletedAttendances} Asistencias eliminadas`);    
});

module.exports = asistenciaRouter;

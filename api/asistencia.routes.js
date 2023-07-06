const express = require('express');
const { Asistencia } = require('../database/models');
const { asistencias } = require('../database/collections');
const asistenciaRouter = express.Router();

asistenciaRouter.get('/', (req, res) => {
    const { id } = req.query;
    if (!asistencias.get(id)) {
        res.status(400).send('Empleado no existe');
        return
    }
    
    const asistenciasList = asistencias.get(id);
    res.status(200).json(asistenciasList);
});

asistenciaRouter.post('/', (req, res) => {
    const { asistencia, id } = req.body;
    if (!asistencias.get(id)) {
        asistencias.set(id, new Array());
    }

    const asistenciaModel = new Asistencia(asistencia);
    let listaAsistencias = asistencias.get(id);
    listaAsistencias.push(asistenciaModel);
    res.status(201).send('Asistencia creada');
});

asistenciaRouter.put('/', (req, res) => {
    const { id, fecha, asistencia } = req.body;
    let empleadoAsistencias = asistencias.get(id);
    const callbackFn = (item) => item.fecha = fecha;
    const index = empleadoAsistencias.findIndex(callbackFn);
    empleadoAsistencias[index].asistencia = asistencia;
    res.status(200).end();
});

asistenciaRouter.delete('/', (req, res) => {
    const { id, fecha } = req.body;
    let empleadoAsistencias = asistencias.get(id);
    const callbackFn = (item) => item.fecha = fecha;
    const index = empleadoAsistencias.findIndex(callbackFn);
    empleadoAsistencias.splice(index, 1);
    res.status(200).end();
});

module.exports = asistenciaRouter;

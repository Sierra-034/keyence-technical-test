const express = require('express');
const asistenciaRouter = require('./api/asistencia.routes');
const empleadoRouter = require('./api/empleado.routes');

const app = express();
app.use(express.json());
app.use('/asistencia', asistenciaRouter);
app.use('/empleado', empleadoRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listen on port ${port}`)
});
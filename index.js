const express = require('express');
const empleadoRouter = require('./api/empleado.routes');

const app = express();
app.use(express.json());
app.use('/empleado', empleadoRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listen on port ${port}`)
});
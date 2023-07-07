const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const Empleado = sequelize.define('Employee', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: DataTypes.STRING,
}, {
    timestamps: false,
});

const Asistencia = sequelize.define('Attendance', {
    asistencia: DataTypes.BOOLEAN,
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
});

Empleado.hasMany(Asistencia, {
    foreignKey: {
        name: 'empleadoId',
        type: DataTypes.UUIDV4,
    }
});

(async () => {
    await sequelize.sync();
})();

module.exports = {
    Empleado,
    Asistencia,
};

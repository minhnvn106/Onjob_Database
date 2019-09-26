module.exports = (sequelize, type) => {
    return sequelize.define('certype', {
        id: {
            field: 'CerType_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CerType_name: {
            type: type.STRING(30),
            allowNull: false
        },

        CerType_describe: {
            type: type.STRING,
            allowNull: false
        }
    }, { timestamps: false })
}
// Phong Ban
module.exports = (sequelize, type) => {
    return sequelize.define('Department', {
        id: {
            field: 'Dep_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Dep_name: {
            type: type.STRING,
            allowNull: false
        },
        Dep_describe: {
            type: type.STRING,
            allowNull: false
        }
    }, { timestamps: false })
}